/** @class Level
 * @summary Represents a level.
 * @classdesc	Holds all the information representing a level in the game with
 * functions to track progress through the level.
 * @author DTT
 * @param {Number} _id The level's unique id.
 * @param {string} _title The level's title.
 * @param {string} _topic The level's educational topic
 * @param {any} _widget An instance of the widget the level uses.
 * @param {Array} _answers An array of answers the level uses for progression.
 * @param {Array} _dialogue An array of strings the level uses for dialogue.
 */
function Level(_id, _title, _topic, _widget, _answers, _dialogue) {
	let _currentStage = 0;
	let _locked = false;
	let _completed = false;

	/* ------------------------ */
	/*                          */
	/*     PUBLIC FUNCTIONS     */
	/*                          */
	/* ------------------------ */

	/** @function getId
	 * @summary Gets the Level's id.
	 * @acess public
	 */
	function getId() {
		return _id;
	}

	/** @function isLocked
	 * @summary Checks if the Level is locked or not.
	 * @access public
	 */
	function isLocked() {
		return _locked;
	}

	/** @function isCompleted
	 * @summary Checks if the Level is completed or not.
	 * @access public
	 */
	function isCompleted() {
		return _completed;
	}

	/** @function generateHtml
	 * @summary Generates html representing this Level as a level select block.
	 * @access public
	 */
	function generateHtml() {
		let root = document.createElement('div');
		root.classList.add('level-select-item');
		root.id = `level-select-item-${_id}`;

		let title = document.createElement('div');
		title.classList.add('level-select-item-title');
		title.innerText = _title;

		let topic = document.createElement('div');
		topic.classList.add('level-select-item-topic');
		topic.innerText = _topic;

		root.appendChild(title);
		root.appendChild(topic);

		if (_completed) {
			root.classList.add('level-select-item-completed');
		} else if (!_locked) {
			root.onclick = () => {
				gameplayManager.beginLevel(_id);
			};
		} else {
			root.classList.add('level-select-item-locked');
		}

		return root;
	}

	/** @function submit
	 * @summary Handles answer checking and progression.
	 * @description Checks the submission to the current stage's answer, and if
	 * it's correct it will progress to the next stage of the level.
	 * @access public
	 * @param {any} submission The submission to be checked.
	 */
	function submit(submission) {
		if (_completed) {
			console.log('This level is already complete.');
		} else if (submission == _answers[_currentStage]) {
			_currentStage++;
			if (_currentStage > _answers.length - 1) {
				finish();
			} else {
				gameplayManager.setDialogue(_dialogue[_currentStage]);
			}
			gameplayManager.setDialogue('Correct answer!', { duration: 2000 });
		} else {
			gameplayManager.setDialogue('Wrong answer!', { duration: 2000 });
		}
	}

	/** @function begin
	 * @summary Begins the level.
	 * @description Begins the level, setting up communication with the widget and
	 * drawing it, as well as setting the dialogue
	 * @access public
	 */
	function begin() {
		document.getElementById('gameplay-container').innerHTML = '';
		_widget.setLevel(this);
		document
			.getElementById('gameplay-container')
			.appendChild(_widget.generateHtml());
		gameplayManager.setDialogue(_dialogue[_currentStage]);
	}

	/* ------------------------- */
	/*                           */
	/*     PRIVATE FUNCTIONS     */
	/*                           */
	/* ------------------------- */

	/** @function finish
	 * @summary Finishes the level.
	 * @description Sets the level as completed and returns to level select.
	 * @access private
	 */
	function finish() {
		console.log('Level finished.');
		_completed = true;
		gameplayManager.setDialogue(`Level ${_id} complete, good job!`);
		gameplayManager.finishLevel();
	}

	/* ---------------- */
	/*                  */
	/*     FINALIZE     */
	/*                  */
	/* ---------------- */

	return {
		getId,
		generateHtml,
		begin,
		submit,
	};
}

export { Level };
