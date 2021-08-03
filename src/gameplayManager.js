import { portrait } from './portrait.js';
import { settings } from './settings.js';
import { Actor, Scene } from './scene.js';
import { Level } from './level.js';
import { levelAtlas } from './levelAtlas.js';

/**
 * Manages the broad aspects of the gameplay section of the game.
 */
const gameplayManager = (() => {
	const $ = (id) => document.getElementById(id);
	const _gameplayContainer = $('gameplay-container');
	const _levelSelectContainer = $('level-select-container');
	const _levelSelectItemsContainer = $('level-select-items');
	const _dialogueContainer = $('dialogue');

	let _levels = [];

	let _dialogueMainText = '';

	/* ------------------------ */
	/*                          */
	/*     PUBLIC FUNCTIONS     */
	/*                          */
	/* ------------------------ */

	/**
	 * Exits level select and begins a level.
	 * @param {number} id The id of the level to play.
	 */
	function beginLevel(id) {
		_levels[id].begin(_levels[id]);
		exitLevelSelect();
	}

	/**
	 * Generates new level select html and goes to level select.
	 */
	function finishLevel() {
		generateLevelSelectHtml();
		enterLevelSelect();
	}

	/** @function setDialogue
	 * @summary Sets the content of the dialogue box.
	 * @description Sets the content of the dialogue box. Options include {
	 * duration }
	 * @param {string} msg The text to set.
	 * @param {object} opts Extra options.
	 */
	function setDialogue(msg, opts) {
		if (!msg) {
			msg = '< Dialogue message was not set >';
		}
		if (!opts) {
			opts = {};
		}

		if (opts.duration) {
			setTimeout(() => {
				setDialogue(_dialogueMainText);
			}, opts.duration);
		} else {
			_dialogueMainText = msg;
		}

		_dialogueContainer.innerText = msg;
		console.log(`Set dialogue to "${msg}"`);
	}

	/* ------------------------- */
	/*                           */
	/*     PRIVATE FUNCTIONS     */
	/*                           */
	/* ------------------------- */

	/**
	 * Initializes the gameplay manager.
	 */
	function init() {
		_levels = levelAtlas();
		generateLevelSelectHtml();

		document.getElementById('level-select-open-button').onclick = function () {
			enterLevelSelect();
		};

		enterLevelSelect();
		_levelSelectContainer.classList.remove('level-select-open-animation');
	}

	/**
	 * Generates new level selection HTML. Useful when exiting levels to update
	 * completion status or unlocks.
	 */
	function generateLevelSelectHtml() {
		_levelSelectItemsContainer.innerHTML = '';
		_levels.forEach((lvl) => {
			_levelSelectItemsContainer.appendChild(lvl.generateHtml());
		});
	}

	/**
	 * Opens the level select dock.
	 */
	function enterLevelSelect() {
		_levelSelectContainer.classList.remove('level-select-close-animation');
		_levelSelectContainer.classList.add('level-select-open-animation');
	}

	/**
	 * Closes the level select dock.
	 */
	function exitLevelSelect() {
		_levelSelectContainer.classList.remove('level-select-open-animation');
		_levelSelectContainer.classList.add('level-select-close-animation');
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
		setDialogue,
	};
})();

export { gameplayManager };
