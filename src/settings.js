import { DialogueManager } from './DialogueManager.js';
import { PortraitManager } from './portrait.js';

/** @constant SettingsManager
 * @summary Manages the game's settings.
 * @author DTT
 */
const SettingsManager = (() => {
	const animId = 'animation-settings-options';
	const fontId = 'font-settings-options';
	const dialId = 'dialogue-settings-options';
	const spchId = 'speech-settings-options';

	/* ------------------------- */
	/*                           */
	/*     PRIVATE FUNCTIONS     */
	/*                           */
	/* ------------------------- */

	/** @function init
	 * @summary Initializes the settings manager.
	 * @access private
	 */
	function init() {
		setOnclicks();
	}

	/** @function setOnclicks
	 * @summary Sets all required onclicks.
	 * @access private
	 */
	function setOnclicks() {
		const $ = (id) => document.getElementById(id);

		$('open-settings-button').onclick = () => {
			openSettings();
		};

		$('close-settings-button').onclick = () => {
			closeSettings();
		};

		for (let i = 0; i < 4; i++) {
			$(animId).children[i].onclick = () => {
				setAnimationUpdateRate(i);
			};
		}

		for (let i = 0; i < 3; i++) {
			$(fontId).children[i].onclick = () => {
				setFontChoice(i);
			};
		}

		for (let i = 0; i < 4; i++) {
			$(dialId).children[i].onclick = () => {
				setDialogueSpeed(i);
			};
		}

		for (let i = 0; i < 4; i++) {
			$(spchId).children[i].onclick = () => {
				setSpeechRate(i);
			};
		}
	}

	/** @function openSettings
	 * @summary Opens the settings window.
	 * @access private
	 */
	function openSettings() {
		document.getElementById('settings-container').style.display = '';
	}

	/** @function closeSettings
	 * @summary Closes the settings window.
	 * @access private
	 */
	function closeSettings() {
		document.getElementById('settings-container').style.display = 'none';
	}

	/** @function setAnimationUpdateRate
	 * @summary Sets the animation update rate.
	 * @description The animation update rate controls how often some animated
	 * features have their visual features updated. More frequent updates means
	 * more stress on the user's computer.
	 * @access private
	 * @param {number} setting 0/1/2/3 as Off/10fps/30fps/Unlimited respectively.
	 */
	function setAnimationUpdateRate(setting) {
		switch (setting) {
			case 0:
				PortraitManager.disableAnimations();
				PortraitManager.initBoneTracking(Number.MAX_SAFE_INTEGER);
				break;
			case 1:
				PortraitManager.enableAnimations();
				PortraitManager.initBoneTracking(1000 / 10);
				break;
			case 2:
				PortraitManager.enableAnimations();
				PortraitManager.initBoneTracking(1000 / 30);
				break;
			case 3:
				PortraitManager.enableAnimations();
				PortraitManager.initBoneTracking(1);
				break;
		}

		Array.from(document.getElementById(animId).children).forEach((child) => {
			child.classList.remove('selected');
		});
		document.getElementById(animId).children[setting].classList.add('selected');
	}

	/** @function setFontChoice
	 * @summary Sets the font choice.
	 * @description Sets the font for most text in the game.
	 * @access private
	 * @param {number} setting 0/1/2 as Pixel/Standard/Dyslexic respectively.
	 */
	function setFontChoice(setting) {
		switch (setting) {
			case 0: // Pixel
				document.body.classList.remove('font-standard');
				document.body.classList.remove('font-dyslexic');
				document.body.classList.add('font-pixel');
				break;
			case 1: // Standard
				document.body.classList.remove('font-pixel');
				document.body.classList.remove('font-dyslexic');
				document.body.classList.add('font-standard');
				break;
			case 2: // Dyslexic
				document.body.classList.remove('font-pixel');
				document.body.classList.remove('font-standard');
				document.body.classList.add('font-dyslexic');
				break;
		}

		Array.from(document.getElementById(fontId).children).forEach((child) => {
			child.classList.remove('selected');
		});
		document.getElementById(fontId).children[setting].classList.add('selected');
	}

	/** @function setDialogueSpeed
	 * @summary Sets the dialogue speed.
	 * @description Sets the speed at which dialogue is "typed" out in the
	 * dialogue box.
	 * @access private
	 * @param {number} setting 0/1/2/3 as Off/Slow/Mid/Fast respectively.
	 */
	function setDialogueSpeed(setting) {
		switch (setting) {
			case 0: // Off
				DialogueManager.disableTextCrawl();
				break;
			case 1: // Slow
				DialogueManager.enableTextCrawl();
				DialogueManager.setTextCrawlSpeed(80);
				break;
			case 2: // Mid
				DialogueManager.enableTextCrawl();
				DialogueManager.setTextCrawlSpeed(40);
				break;
			case 3: // Fast
				DialogueManager.enableTextCrawl();
				DialogueManager.setTextCrawlSpeed(30);
				break;
		}

		Array.from(document.getElementById(dialId).children).forEach((child) => {
			child.classList.remove('selected');
		});
		document.getElementById(dialId).children[setting].classList.add('selected');
	}

	/** @function setSpeechRate
	 * @summary Set the voice speech rate.
	 * @access private
	 * @param {number} setting 0/1/2/3 as Off/Slow/Mid/Fast respectively.
	 */
	function setSpeechRate(setting) {
		switch (setting) {
			case 0: // Off
				DialogueManager.disableSpeech();
				break;
			case 1: // Slow
				DialogueManager.enableSpeech();
				DialogueManager.setSpeechRate(0.5);
				break;
			case 2: // Mid
				DialogueManager.enableSpeech();
				DialogueManager.setSpeechRate(1);
				break;
			case 3: // Fast
				DialogueManager.enableSpeech();
				DialogueManager.setSpeechRate(1.5);
				break;
		}

		Array.from(document.getElementById(spchId).children).forEach((child) => {
			child.classList.remove('selected');
		});
		document.getElementById(spchId).children[setting].classList.add('selected');
	}

	/* ---------------- */
	/*                  */
	/*     FINALIZE     */
	/*                  */
	/* ---------------- */

	init();
})();

export { SettingsManager };
