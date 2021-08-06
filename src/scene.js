/** @class Actor
 * @summary Represents an actor for the scene.
 * @classdesc Controls an element that acts as an actor in the scene.
 * @author DTT
 * @param _element The element the actor controls.
 */
function Actor(_element) {
	const MAXPOS_LEFT = 0 + 16;
	const MAXPOS_RIGHT = 672 - 48;

	let _posx = 0;
	let _posy = 0;
	let _facing = 1;

	let _action = null;

	/* ------------------------ */
	/*                          */
	/*     PUBLIC FUNCTIONS     */
	/*                          */
	/* ------------------------ */

	/** @function commence
	 * @summary Starts an actor's acting loop.
	 * @access public
	 * @param {number} interval The actor's update interval in milliseconds.
	 */
	function commence(interval) {
		_posx = Math.round(MAXPOS_LEFT + Math.random() * MAXPOS_RIGHT);
		updateLoop(interval);
		actionLoop();
	}

	/* ------------------------- */
	/*                           */
	/*     PRIVATE FUNCTIONS     */
	/*                           */
	/* ------------------------- */

	/** @function updateLoop
	 * @summary The actor's visual update loop.
	 * @description The update loop handles updating the actor's visual element to
	 * it's internally computed transforms.
	 * @access private
	 * @param {any} interval The interval in milliseconds to update at.
	 */
	function updateLoop(interval) {
		_element.style.transform = `translate(${_posx}px, ${_posy}px) scaleX(${_facing})`;
		setTimeout(() => {
			updateLoop();
		}, interval);
	}

	/** @function actionLoop
	 * @summary The actor's action loop.
	 * @description A loop that randomly assigns actions to the actor at random
	 * intervals.
	 * @access private
	 */
	function actionLoop() {
		clearInterval(_action);

		switch (Math.round(Math.random() * 2)) {
			case 0: // Do nothing.
				break;
			case 1: // Move action.
				_facing = Math.random() < 0.5 ? 1 : -1;
				moveAction();
				break;
			case 2: // Jump action.
				jumpAction();
				break;
		}

		setTimeout(function () {
			actionLoop();
		}, 500 + Math.random() * 1500);
	}

	/** @function moveAction
	 * @summary Moves the actor left or right at a random speed.
	 * @access private
	 */
	function moveAction() {
		_action = setInterval(function () {
			if (_posx < MAXPOS_LEFT) {
				_posx = MAXPOS_LEFT;
				clearInterval(_action);
				return;
			} else if (_posx > MAXPOS_RIGHT) {
				_posx = MAXPOS_RIGHT;
				clearInterval(_action);
				return;
			}
			_posx += _facing;
		}, 15 + Math.random() * 10);
	}

	/** @function jumpAction
	 * @summary Makes the actor jump.
	 * @access private
	 */
	function jumpAction() {
		_action = setInterval(function () {
			if (_posy > -16) {
				_posy -= 0.5;
			} else {
				clearInterval(_action);
				_action = setInterval(() => {
					if (_posy < 0) {
						_posy += 0.5;
					} else {
						clearInterval(_action);
					}
				}, 1);
			}
		}, 1);
	}

	/* ---------------- */
	/*                  */
	/*     FINALIZE     */
	/*                  */
	/* ---------------- */

	return {
		commence,
	};
}

/** @constant Scene
 * @summary Represents the scene.
 * @description Represents the scene used in the top portion of the screen.
 * @author DTT
 */
const Scene = (() => {
	let actors = [];

	/** @function init
	 * @summary Initializes the scene.
	 * @description Creates and commences all actors.
	 * @access private
	 */
	function init() {
		actors.push(new Actor(document.getElementById('robokid')));
		actors.push(new Actor(document.getElementById('kid1')));
		actors.push(new Actor(document.getElementById('kid2')));
		actors.push(new Actor(document.getElementById('kid3')));
		actors.forEach((actor) => {
			actor.commence(1000 / 60);
		});
	}

	init();
})();

export { Actor, Scene };
