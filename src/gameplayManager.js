import { portrait } from './portrait.js';
import { settings } from './settings.js';
import { scene, actor } from './scene.js';
import { level } from './level.js';
import { levelAtlas } from './levelAtlas.js';

/**
 * Manages the broad aspects of the gameplay section of the game.
 */
const gameplayManager = (() => {
	const _gameplayContainer = document.getElementById('gameplay-container');
	const _levelSelectContainer = document.getElementById(
		'level-select-container'
	);
	const _levelSelectItemsContainer =
		document.getElementById('level-select-items');

	let _levels = [];

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
			_levelSelectItemsContainer.appendChild(lvl.generateLevelSelectItemHtml());
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
	};
})();

export { gameplayManager };
