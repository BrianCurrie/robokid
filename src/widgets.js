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

const binaryWidget = function () {
	let _level = null;
	const totalDigits = 8;

	function setLevel(level) {
		_level = level;
	}

	function generateHtml() {
		const container = document.createElement('div');
		container.id = 'binary-widget-container';

		const valueDisplay = document.createElement('div');
		valueDisplay.id = 'binary-widget-value-display';
		valueDisplay.innerText = parseInt(binaryArr.join(''), 2);

		const toggleDigits = document.createElement('div');
		toggleDigits.id = 'binary-widget-toggle-digits';

		const submitButton = document.createElement('div');
		submitButton.id = 'binary-widget-submit-button';
		submitButton.innerText = 'Submit';
		submitButton.onclick = () => {
			submit();
		};

		container.appendChild(valueDisplay);
		container.appendChild(toggleDigits);
		container.appendChild(submitButton);

		for (let i = 0; i < totalDigits; i++) {
			let digitContainer = document.createElement('div');
			let plus = document.createElement('button');
			let digit = document.createElement('div');
			let minus = document.createElement('button');

			digitContainer.classList.add('digit-container');
			digit.classList.add('digit');

			plus.innerText = '+';
			digit.innerText = binaryArr[i];
			minus.innerText = '-';

			digitContainer.appendChild(plus);
			digitContainer.appendChild(digit);
			digitContainer.appendChild(minus);
			toggleDigits.appendChild(digitContainer);

			plus.addEventListener('click', () => {
				if (digit.innerText === '0') {
					binaryArr[i] = 1;
					digit.innerText = '1';
					displayDec();
				}
			});

			minus.addEventListener('click', () => {
				if (digit.innerText === '1') {
					binaryArr[i] = 0;
					digit.innerText = '0';
					displayDec();
				}
			});
		}

		return container;
	}

	let binaryArr = (() => {
		let nums = [];
		for (let i = 0; i < totalDigits; i++) {
			nums.push(0);
		}
		return nums;
	})();

	function displayDec() {
		const val = document.getElementById('binary-widget-value-display');
		val.innerText = parseInt(binaryArr.join(''), 2);
	}

	function submit() {
		const submission = parseInt(binaryArr.join(''), 2);
		_level.submit(submission);
	}

	return {
		generateHtml,
		setLevel,
	};
};

const binaryConvertWidget = function () {
	let _level = null;

	function setLevel(level) {
		_level = level;
	}

	function generateHtml() {
		const container = document.createElement('div');
		container.id = 'convert-widget-container';

		const input = document.createElement('input');
		input.id = 'convert-widget-input';
		input.placeholder = 'Text to binary';

		const output = document.createElement('div');
		output.id = 'convert-widget-output';

		const submitButton = document.createElement('div');
		submitButton.id = 'binary-widget-submit-button';
		submitButton.innerText = 'Submit';
		submitButton.onclick = () => {
			submit();
		};

		container.appendChild(input);
		container.appendChild(output);
		container.appendChild(submitButton);

		input.addEventListener('input', () => {
			const binary = input.value;
			output.innerText = textToBinary(binary);
		});

		return container;
	}

	function textToBinary(text) {
		let output = '';
		for (let i = 0; i < text.length; i++) {
			output += text.charCodeAt(i).toString(2) + ' ';
		}
		return output.trim();
	}

	function submit() {
		const submission = document.getElementById('convert-widget-input').value;
		console.log(submission);
		_level.submit(submission);
	}

	return {
		generateHtml,
		setLevel,
	};
};

export { exampleWidget, binaryWidget, binaryConvertWidget };
