const actor = function () {
	const MAXPOS_LEFT = 0 + 16;
	const MAXPOS_RIGHT = 672 - 48;

	let _element = null;
	let _posx = 0;
	let _posy = 0;
	let _facing = 1;

	let _action = null;

	/* ---------------- */
	/* PUBLIC FUNCTIONS */
	/* ---------------- */

	/**
	 * Set the element that this actor controls.
	 * @param {HTMLElement} element The element this actor controls.
	 */
	function setElement(element) {
		_element = element;
		return this;
	}

	/**
	 * Starts the actor's behaviour.
	 * @param {number} interval The interval in milliseconds at which the element
	 * is updated (ie. 1000/60 is 60fps). see updateLoop function.
	 */
	function commence(interval) {
		_posx = Math.round(MAXPOS_LEFT + Math.random() * MAXPOS_RIGHT);
		updateLoop(interval);
		actionLoop();
		return this;
	}

	/* ----------------- */
	/* PRIVATE FUNCTIONS */
	/* ----------------- */

	/**
	 * The actor's update loop.
	 * Each iteration of the update loop updates the actor's element's transforms
	 * to match the actor's transforms.
	 * @param {number} interval The interval in milliseconds at which the element
	 * is updated (ie. 1000/60 is 60fps).
	 */
	function updateLoop(interval) {
		_element.style.transform = `translate(${_posx}px, ${_posy}px) scaleX(${_facing})`;
		setTimeout(() => {
			updateLoop();
		}, interval);
	}

	/**
	 * The actor's action loop.
	 * The action loop provides the actor with a variety of randomly chosen
	 * actions, creating transformations for it to use.
	 * TODO: Would like to have a non-random action queue in the future.
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

	/**
	 * Moves the actor left or right at a random speed.
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

	/**
	 * Makes the actor jump.
	 */
	function jumpAction() {
		_action = setInterval(function () {
			if (_posy > -16) {
				_posy -= 2;
			} else {
				clearInterval(_action);
				_action = setInterval(() => {
					if (_posy < 0) {
						_posy += 2;
					} else {
						clearInterval(_action);
					}
				}, 1);
			}
		}, 1);
	}

	/* -------- */
	/* FINALIZE */
	/* -------- */

	return {
		setElement,
		commence,
	};
};

const scene = (() => {
	let updateRate = 1000 / 60;

	let actors = [];

	/* ----------------- */
	/* PRIVATE FUNCTIONS */
	/* ----------------- */

	/**
	 * Initializes the scene.
	 * Currently hard-coded.
	 */
	const init = () => {
		actors.push(
			new actor()
				.setElement(document.getElementById('robokid'))
				.commence(updateRate)
		);
		actors.push(
			new actor()
				.setElement(document.getElementById('kid1'))
				.commence(updateRate)
		);
		actors.push(
			new actor()
				.setElement(document.getElementById('kid2'))
				.commence(updateRate)
		);
		actors.push(
			new actor()
				.setElement(document.getElementById('kid3'))
				.commence(updateRate)
		);
	};

	/* -------- */
	/* FINALIZE */
	/* -------- */

	init();

	return this;
})();

export default {
	scene,
	actor,
};
