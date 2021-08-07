const GameInfoManager = (() => {
	/* ------------------------- */
	/*                           */
	/*     PRIVATE FUNCTIONS     */
	/*                           */
	/* ------------------------- */

	/** @function init
	 * @summary Initializes the game info manager.
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

		$('open-game-info-button').onclick = () => {
			openGameInfo();
		};

		$('close-game-info-button').onclick = () => {
			closeGameInfo();
		};
	}

	/** @function openGameInfo
	 * @summary Opens the game info window.
	 * @access private
	 */
	function openGameInfo() {
		document.getElementById('game-info-container').style.display = '';
	}

	/** @function closeGameInfo
	 * @summary Closes the game info window.
	 * @access private
	 */
	function closeGameInfo() {
		document.getElementById('game-info-container').style.display = 'none';
	}

	/* ---------------- */
	/*                  */
	/*     FINALIZE     */
	/*                  */
	/* ---------------- */

	init();
})();

export { GameInfoManager };
