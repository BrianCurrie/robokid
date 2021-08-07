/** @constant DialogueManager
 * @summary Manages the dialogue box.
 * @author DTT
 */
const DialogueManager = (() => {
	const _container = document.getElementById('dialogue');
	let _messageQueue = [];
	let _displayMessageTimerId = null;
	let _flashingMessageTimerId = null;
	let _textCrawlEnabled = true;
	let _textCrawlInterval = 40;
	let _speechEnabled = false; //Default off for dev
	let _speechRate = 1;
	let _voices = null;
	let _voiceId = null;

	/* ------------------------ */
	/*                          */
	/*     PUBLIC FUNCTIONS     */
	/*                          */
	/* ------------------------ */

	/** @function enqueue
	 * @summary Enqueue some message(s) to the dialogue queue.
	 * @access public
	 * @param {string|Array} msg The message or messages to queue, as a single
	 * string or an array of strings.
	 */
	function enqueue(msg) {
		const displayImmediately = _messageQueue.length == 0;

		if (typeof msg == 'string') {
			_messageQueue.push(msg);
		}

		if (Array.isArray(msg)) {
			msg.forEach((msg) => {
				_messageQueue.push(msg);
			});
		}

		if (displayImmediately) {
			displayFrontmostQueuedMessage();
		}
	}

	/** @function flashMessage
	 * @summary Flashes a message temporarily.
	 * @access public
	 * @param {string} message The message to flash
	 * @param {number} duration The duration in milliseconds to show it.
	 */
	function flashMessage(message, duration) {
		if (_flashingMessageTimerId != null) {
			clearTimeout(_flashingMessageTimerId);
			_flashingMessageTimerId = null;
		}

		if (typeof message == 'string') {
			displayMessage(message);
			_flashingMessageTimerId = setTimeout(() => {
				_flashingMessageTimerId = null;
				displayFrontmostQueuedMessage();
			}, duration);
		}
	}

	/** @function enableTextCrawl
	 * @summary Enables text crawl.
	 * @access public
	 */
	function enableTextCrawl() {
		_textCrawlEnabled = true;
	}

	/** @function disableTextCrawl
	 * @summary Disables text crawl.
	 * @access public
	 */
	function disableTextCrawl() {
		_textCrawlEnabled = false;
	}

	/** @function setTextSpeed
	 * @summary Set the text reveal interval.
	 * @access public
	 * @param {number} interval
	 */
	function setTextCrawlSpeed(interval) {
		_textCrawlInterval = interval;
	}

	/** @function enableSpeech
	 * @summary Enables text-to-speech.
	 * @access public
	 */
	function enableSpeech() {
		_speechEnabled = true;
	}

	/** @function disableSpeech
	 * @summary Disables text-to-speech.
	 * @access public
	 */
	function disableSpeech() {
		_speechEnabled = false;
	}

	/** @function setVoiceRate
	 * @summary Set the voice speech rate.
	 * @access public
	 * @param {number} interval
	 */
	function setSpeechRate(rate) {
		_speechRate = rate;
	}

	/* ------------------------- */
	/*                           */
	/*     PRIVATE FUNCTIONS     */
	/*                           */
	/* ------------------------- */

	/** @function init
	 * @summary Initializes the dialogue manager.
	 * @access private
	 */
	function init() {
		_container.onclick = () => progressDialogue();

		speechSynthesis.addEventListener('voiceschanged', () => {
			_voices = speechSynthesis.getVoices();
			if (_voices.length >= 5) {
				_voiceId = 4;
			}
		});
	}

	/** @function progressDialogue
	 * @summary Progresses dialogue queue to the next message.
	 * @access private
	 */
	function progressDialogue() {
		if (_messageQueue.length > 1 && _flashingMessageTimerId == null) {
			_messageQueue = _messageQueue.splice(1, _messageQueue.length);
			displayFrontmostQueuedMessage();
		}
	}

	/** @function displayFrontmostQueuedMessage
	 * @summary Displays the frontmost message in the queue.
	 * @description Does not remove the message from the queue unlike {@link
	 * DialogueManager#progressDialogue}.
	 * @access private
	 */
	function displayFrontmostQueuedMessage() {
		if (_flashingMessageTimerId == null) {
			displayMessage(_messageQueue[0], _textCrawlInterval);
		}
	}

	/** @function displayMessage
	 * @summary Displays a message.
	 * @description Reveals a message letter by letter into the dialogue box.
	 * @access private
	 * @param {string} message The message to display
	 * @param {number} interval The interval in milliseconds between each letter
	 * being written.
	 * @param {number} index Don't set. Used internally, default is 0;
	 */
	function displayMessage(message, interval, index = 0) {
		if (_textCrawlEnabled) {
			if (index == 0) {
				_container.innerText = '';
				clearTimeout(_displayMessageTimerId);
				_displayMessageTimerId = null;
				speak(message);
			}
			if (index < message.length) {
				_container.append(message[index++]);
				_displayMessageTimerId = setTimeout(() => {
					displayMessage(message, interval, index);
				}, interval);
			}
		} else {
			_container.innerText = message;
			speak(message);
		}
	}

	/** @function speak
	 * @summary Makes the text-to-speak engine say something.
	 * @access private
	 * @param {string} message
	 */
	function speak(message) {
		if (_speechEnabled) {
			if (speechSynthesis.speaking) {
				speechSynthesis.cancel();
			}
			//console.log('should speak');
			const ssu = new SpeechSynthesisUtterance();
			if (_voiceId != null) {
				ssu.voice = _voices[_voiceId];
			}
			ssu.text = message;
			ssu.rate = _speechRate;
			ssu.pitch = 2;
			ssu.volume = 0.3;
			speechSynthesis.speak(ssu);
		}
	}

	/** @function flushMessageQueue
	 * @summary Removes all messages from the queue and empties the dialogue box.
	 * @access private
	 */
	function flushMessageQueue() {
		_messageQueue = [];
		if (_flashingMessageTimerId == null) {
			displayMessage('', 0, 0);
		}
	}

	/* ---------------- */
	/*                  */
	/*     FINALIZE     */
	/*                  */
	/* ---------------- */

	init();

	return {
		enqueue,
		flashMessage,
		flushMessageQueue,
		enableTextCrawl,
		disableTextCrawl,
		enableSpeech,
		disableSpeech,
		setTextCrawlSpeed,
		setSpeechRate,
	};
})();

export { DialogueManager };
