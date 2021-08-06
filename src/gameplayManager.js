import { levelAtlas } from './levelAtlas.js';
import { DialogueManager } from './DialogueManager.js';

/** @constant GameplayManager
 * @summary Manages most communication between gameplay and other systems.
 * @author DTT
 */
const GameplayManager = (() => {
	const $ = (id) => document.getElementById(id);
	const _gameplayContainer = $('gameplay-container');
	const _levelSelectContainer = $('level-select-container');
	const _levelSelectItemsContainer = $('level-select-items');
	const _levelInfoContainer = $('level-info-container');

	let _levels = [];

	let _dialogueMainText = '';

	/* ------------------------ */
	/*                          */
	/*     PUBLIC FUNCTIONS     */
	/*                          */
	/* ------------------------ */

	/** @function beginLevel
	 * @summary Exits level select and beginds a level.
	 * @access public
	 * @param {number} id The id of the level to begin.
	 */
	function beginLevel(id) {
		exitLevelSelect();
		if (_levels[id].isFirstEntry()) {
			setTimeout(() => {
				enterLevelInfo();
			}, 1000);
		}
		_levels[id].begin(_levels[id]);
	}

	/** @function finishLevel
	 * @summary Returns to level select.
	 * @description Generates new level select html and goes to level select.
	 * @access public
	 */
	function finishLevel() {
		generateLevelSelectHtml();
		enterLevelSelect();
	}

	/** @function resetLevel
	 * @summary Resets the level to it's initial state as per levelAtlas.
	 * @param {number} id The level's id to reset.
	 */
	function resetLevel(id) {
		_levels[id] = levelAtlas()[id];
	}

	/** @function setDialogue
	 * @summary Sets the content of the dialogue box.
	 * @description Sets the content of the dialogue box. Options include {
	 * duration }
	 * @access public
	 * @param {string} msg The text to set.
	 * @param {object} opts Extra options.
	 */
	function setDialogue(msg, opts) {
		DialogueManager.setDialogue(msg, opts);
	}

	/* ------------------------- */
	/*                           */
	/*     PRIVATE FUNCTIONS     */
	/*                           */
	/* ------------------------- */

	/** @function init
	 * @summary Initializes the gameplay manager.
	 * @description Grabs the level atlas and readies level select.
	 * @access private
	 */
	function init() {
		_levels = levelAtlas();
		generateLevelSelectHtml();

		document.getElementById('level-select-open-button').onclick = function () {
			enterLevelSelect();
		};
		document.getElementById('level-info-open-button').onclick = function () {
			enterLevelInfo();
		};
		document.getElementById('level-info-return-button').onclick = function () {
			exitLevelInfo();
		};

		enterLevelSelect();
		_levelSelectContainer.classList.remove('level-select-open-animation');
	}

	/** @function generateLevelSelectHtml
	 * @summary Generates new level select HTML.
	 * @access private
	 */
	function generateLevelSelectHtml() {
		_levelSelectItemsContainer.innerHTML = '';
		_levels.forEach((lvl) => {
			_levelSelectItemsContainer.appendChild(lvl.generateHtml());
		});
	}

	/** @function enterLevelSelect
	 * @summary Opens the level select dock.
	 * @access private
	 */
	function enterLevelSelect() {
		_levelSelectContainer.className = '';
		_levelSelectContainer.classList.add('level-select-open-animation');
		_levelInfoContainer.className = '';
		_levelInfoContainer.classList.add('level-info-hide-animation');
		DialogueManager.flushMessageQueue();
		DialogueManager.enqueue('Select a level to play.');
	}

	/** @function exitLevelSelect
	 * @summary Closes the level select dock.
	 * @access private
	 */
	function exitLevelSelect() {
		_levelSelectContainer.className = '';
		_levelSelectContainer.classList.add('level-select-close-animation');
		_levelInfoContainer.className = '';
		_levelInfoContainer.classList.add('level-info-reveal-animation');
	}

	/** @function enterLevelInfo
	 * @summary Opens the level info dock.
	 * @access private
	 */
	function enterLevelInfo() {
		_levelInfoContainer.className = '';
		_levelInfoContainer.classList.add('level-info-open-animation');
		_levelSelectContainer.className = '';
		_levelSelectContainer.classList.add('level-select-hide-animation');
	}

	/** @function exitLevelInfo
	 * @summary Closes the level info dock.
	 * @access private
	 */
	function exitLevelInfo() {
		_levelInfoContainer.className = '';
		_levelInfoContainer.classList.add('level-info-close-animation');
		_levelSelectContainer.className = '';
		_levelSelectContainer.classList.add('level-select-reveal-animation');
	}

	/* ---------------- */
	/*                  */
	/*     FINALIZE     */
	/*                  */
	/* ---------------- */

	init();

	return {
		beginLevel,
		finishLevel,
		resetLevel,
		setDialogue,
	};
})();

export { GameplayManager };
