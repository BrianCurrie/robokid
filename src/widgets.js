/*
 * All widgets must have the following:
 *
 * 1. A setLevel() function - When a level object is created, a widget is
 * assigned to it, and in the process it must tell the widget what it is so that
 * the widget may call it's submit() function for progression through the level.
 *
 * 2. A generateHtml() function - When a level object is selected by the
 * gameplayManager and the player is moved to the gameplay state, this function
 * is called by the level to generate the html it requires to run.
 *
 * 3. A call to their level's submit() function - This is how the
 * widget communicates information to the level. It can be of any type and is
 * expected to match the individual values set to the level's progression
 * requirements when it's made to progress through the stages of the level, and
 * ultimately to complete it.
 */

const exampleWidget = function () {
	let _level = null;

	/**
	 * Sets the widget's owner level.
	 * @param {any} level The owner level.
	 */
	function setLevel(level) {
		_level = level;
	}

	/**
	 * Generates the html of the widget. Used by it's owner level.
	 */
	function generateHtml() {
		const container = document.createElement('div');
		container.id = 'example-widget-container';

		const inputField = document.createElement('input');
		inputField.id = 'example-widget-input-field';

		const submitButton = document.createElement('div');
		submitButton.id = 'example-widget-submit-button';
		submitButton.innerText = 'Submit';
		submitButton.onclick = () => {
			submit();
		};

		container.appendChild(inputField);
		container.appendChild(submitButton);

		return container;
	}

	/**
	 * Submits the input field's data to the level to attempt progression.
	 */
	function submit() {
		const submission = document.getElementById(
			'example-widget-input-field'
		).value;
		_level.submit(submission);
	}

	return {
		generateHtml,
		setLevel,
	};
};

export { exampleWidget };
