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
		submitButton.classList.add('submit-button');
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
		submitButton.classList.add('submit-button');
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
		submitButton.classList.add('submit-button');
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

		input.addEventListener('keypress', (e) => {
			if (e.key === 'Enter') {
				submit();
			}
		});

		return container;
	}

	function textToBinary(text) {
		let output = '';
		for (let i = 0; i < text.length; i++) {
			let temp = text.charCodeAt(i).toString(2);
			if (temp.length < 8) {
				for (let j = temp.length; j < 8; j++) {
					temp = '0' + temp;
				}
			}
			output += temp + ' ';
		}
		return output.trim();
	}

	function submit() {
		const submission = document.getElementById('convert-widget-input').value;
		document.getElementById('convert-widget-input').value = '';
		document.getElementById('convert-widget-output').innerText = '';
		_level.submit(submission);
	}

	return {
		generateHtml,
		setLevel,
	};
};

const RGBWidget = function () {
	let _level = null;

	function setLevel(level) {
		_level = level;
	}

	let rgbValues = [0, 0, 0];

	function generateHtml() {
		const container = document.createElement('div');
		container.id = 'RGB-widget-container';

		const colorDisplay = document.createElement('div');
		colorDisplay.id = 'RGB-widget-color-display';
		colorDisplay.style.backgroundColor = `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`;

		const sliderContainer = document.createElement('div');
		sliderContainer.id = 'RGB-widget-slider-container';

		const red = document.createElement('div');
		const redText = document.createElement('div');
		redText.innerText = `Red ${rgbValues[0]}`;
		const redInput = document.createElement('input');
		redInput.id = 'RGB-widget-red-input';
		redInput.classList.add('slider');
		redInput.type = 'range';
		redInput.min = '0';
		redInput.max = '255';
		redInput.value = rgbValues[0];

		const green = document.createElement('div');
		const greenText = document.createElement('div');
		greenText.innerText = `Green ${rgbValues[1]}`;
		const greenInput = document.createElement('input');
		greenInput.id = 'RGB-widget-green-input';
		greenInput.classList.add('slider');
		greenInput.type = 'range';
		greenInput.min = '0';
		greenInput.max = '255';
		greenInput.value = rgbValues[1];

		const blue = document.createElement('div');
		const blueText = document.createElement('div');
		blueText.innerText = `Blue ${rgbValues[2]}`;
		const blueInput = document.createElement('input');
		blueInput.id = 'GB-widget-blue-input';
		blueInput.classList.add('slider');
		blueInput.type = 'range';
		blueInput.min = '0';
		blueInput.max = '255';
		blueInput.value = rgbValues[2];

		const submitButton = document.createElement('div');
		submitButton.classList.add('submit-button');
		submitButton.innerText = 'Submit';
		submitButton.onclick = () => {
			submit();
		};

		red.appendChild(redText);
		red.appendChild(redInput);

		green.appendChild(greenText);
		green.appendChild(greenInput);

		blue.appendChild(blueText);
		blue.appendChild(blueInput);

		sliderContainer.appendChild(red);
		sliderContainer.appendChild(green);
		sliderContainer.appendChild(blue);

		container.appendChild(colorDisplay);
		container.appendChild(sliderContainer);
		container.appendChild(submitButton);

		redInput.addEventListener('input', () => {
			rgbValues[0] = parseInt(redInput.value);
			redText.innerText = `Red ${rgbValues[0]}`;
			colorDisplay.style.backgroundColor = `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`;
		});

		greenInput.addEventListener('input', () => {
			rgbValues[1] = parseInt(greenInput.value);
			greenText.innerText = `Green ${rgbValues[1]}`;
			colorDisplay.style.backgroundColor = `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`;
		});

		blueInput.addEventListener('input', () => {
			rgbValues[2] = parseInt(blueInput.value);
			blueText.innerText = `Blue ${rgbValues[2]}`;
			colorDisplay.style.backgroundColor = `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`;
		});

		return container;
	}

	function submit() {
		const submission = `${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}`;
		_level.submit(submission);
	}

	return {
		generateHtml,
		setLevel,
	};
};

const commandLineWidget = function () {
	let _level = null;

	function setLevel(level) {
		_level = level;
	}

	function generateHtml() {
		const container = document.createElement('div');
		container.id = 'cmd-widget-container';

		const cmdDisplay = document.createElement('div');
		cmdDisplay.id = 'cmd-widget-display';

		const cmdOutput = document.createElement('div');
		cmdOutput.id = 'cmd-widget-output';

		const cmdDir = document.createElement('div');
		cmdDir.id = 'cmd-widget-dir';

		const cmdDirText = document.createElement('div');
		cmdDirText.id = 'cmd-widget-dir-text';

		const cmdDirInput = document.createElement('input');
		cmdDirInput.id = 'cmd-widget-dir-input';

		const cmdDirCaret = document.createElement('div');
		cmdDirCaret.id = 'cmd-widget-dir-caret';

		cmdDir.appendChild(cmdDirText);
		cmdDir.appendChild(cmdDirInput);
		cmdDir.appendChild(cmdDirCaret);

		cmdDisplay.appendChild(cmdOutput);
		cmdDisplay.appendChild(cmdDir);

		container.appendChild(cmdDisplay);

		cmdDirText.innerHTML = `<span class="green">${username}@${computername}</span>:<span class="blue">${currentDir.join(
			''
		)}</span>$`;

		clearInterval(blinking);
		blinking = setInterval(blink, 750);

		function keypress(e) {
			inputEffect(e.keyCode);
		}

		function keypressAlt(e) {
			switch (e.keyCode) {
				case 8: //Backspace
					inputEffect(e.keyCode);
					break;
			}
		}

		function keydown(e) {
			let dirText = document.getElementById('cmd-widget-dir-text');
			let command = document.getElementById('cmd-widget-dir-input');
			let output = document.getElementById('cmd-widget-output');
			if (e.keyCode === 13) {
				let lastCommand = document.createElement('div');
				lastCommand.innerHTML = `${dirText.innerHTML} ${command.value.trim()}`;
				output.prepend(lastCommand);

				if (command.value.trim() === 'ls') {
					if (levels[0] != 'done') {
						levels[0] = 'done';
						submit(levels[0]);
					}
					displayFolders(ls(currentFolder));
				} else if (
					command.value.trim().split(' ').includes('cd') &&
					command.value.trim().split(' ').length <= 2
				) {
					if (
						levels[0] === 'done' &&
						levels[1] === 'done' &&
						levels[2] !== 'done'
					) {
						if (command.value.trim() === 'cd Desktop') {
							levels[2] = 'done';
							submit(levels[2]);
							cd(command.value.trim().split(' ')[1]);
						} else {
							let err = document.createElement('div');
							err.innerText = `Try typing "cd Desktop"`;
							err.classList.add('errMsg');
							output.prepend(err);
						}
					} else if (
						levels[0] === 'done' &&
						levels[1] === 'done' &&
						levels[2] === 'done' &&
						levels[3] !== 'done'
					) {
						if (command.value.trim() === 'cd') {
							levels[3] = 'done';
							submit(levels[3]);
							cd(command.value.trim().split(' ')[1]);
						} else {
							let err = document.createElement('div');
							err.innerText = `Try typing "cd"`;
							err.classList.add('errMsg');
							output.prepend(err);
						}
					} else if (
						levels[0] === 'done' &&
						levels[1] === 'done' &&
						levels[2] === 'done' &&
						levels[3] === 'done'
					) {
						cd(command.value.trim().split(' ')[1]);
					} else {
						let err = document.createElement('div');
						err.innerText = `Finish all the tasks before entering free mode`;
						err.classList.add('errMsg');
						output.prepend(err);
					}
				} else if (command.value.trim() === 'clear') {
					if (levels[0] === 'done' && levels[1] !== 'done') {
						levels[1] = 'done';
						submit(levels[1]);
					}
					output.innerHTML = '';
				} else if (
					command.value.trim() === 'rm -rf /' ||
					command.value.trim() === ':(){:|:&};:'
				) {
					let err = document.createElement('div');
					err.innerText = `Calm down there Satan.`;
					err.classList.add('errMsg');
					output.prepend(err);
				} else if (command.value.trim() === 'pwd') {
					if (
						levels[0] === 'done' &&
						levels[1] === 'done' &&
						levels[2] === 'done' &&
						levels[3] === 'done' &&
						levels[4] !== 'done'
					) {
						levels[4] = 'done';
						submit(levels[4]);
					}
					pwd();
				} else if (command.value.trim() === 'finish') {
					if (
						levels[0] === 'done' &&
						levels[1] === 'done' &&
						levels[2] === 'done' &&
						levels[3] === 'done' &&
						levels[4] === 'done'
					) {
						levels[5] = 'done';
						submit(levels[5]);
					} else {
						let err = document.createElement('div');
						err.innerText = `Complete all tasks first!`;
						err.classList.add('errMsg');
						output.prepend(err);
					}
				} else {
					let err = document.createElement('div');
					err.innerText = `${command.value.trim()}: command not found`;
					err.classList.add('errMsg');
					output.prepend(err);
				}
				command.value = '';
				resizeInput(command);
			}
		}

		if (!listenersExist) {
			window.addEventListener('keypress', keypress);
			window.addEventListener('keydown', keypressAlt);
			window.addEventListener('keydown', keydown);

			listenersExist = true;
		}

		return container;
	}

	function ls(folder) {
		let output = [];

		for (let prop in folder.contents) {
			output.push([prop, folder.contents[prop].type]);
		}

		return output;
	}

	function displayFolders(arr) {
		if (!Array.isArray(arr)) {
			return -1;
		}

		if (arr.length === 0) {
			return -1;
		}

		const folderDisplay = document.createElement('div');
		const output = document.getElementById('cmd-widget-output');

		for (let ele of arr) {
			let currDiv = document.createElement('span');
			currDiv.innerText = ele[0] + ' ';
			if (ele[1] === 'folder') {
				currDiv.classList.add('folder');
			}
			folderDisplay.appendChild(currDiv);
		}

		output.prepend(folderDisplay);
	}

	function cd(folder) {
		const dirText = document.getElementById('cmd-widget-dir-text');
		const output = document.getElementById('cmd-widget-output');
		if (folder === undefined || folder === '~') {
			currentFolder = root;
			currentDir = ['~'];
			dirText.innerHTML = `<span class="green">${username}@${computername}</span>:<span class="blue">${currentDir.join(
				''
			)}</span>$`;
			return;
		}

		if (folder === '..') {
			if (currentDir.length > 1) {
				let newFolder = 'root';
				currentDir.pop();
				for (let i = 1; i < currentDir.length; i++) {
					newFolder += `.contents.${currentDir[i].substring(1)}`;
				}
				cd();
				for (let i = 2; i < newFolder.split('.').length; i += 2) {
					cd(newFolder.split('.')[i]);
				}
			} else {
				currentFolder = root;
			}
			dirText.innerHTML = `<span class="green">${username}@${computername}</span>:<span class="blue">${currentDir.join(
				''
			)}</span>$`;
			return;
		}

		if (currentFolder.contents.hasOwnProperty(folder) === false) {
			let err = document.createElement('div');
			err.innerText = `The folder "${folder}" does not exist`;
			err.classList.add('errMsg');
			output.prepend(err);
			return -1;
		}

		if (currentFolder.contents[folder].type != 'folder') {
			let err = document.createElement('div');
			err.innerText = `"${folder}" is a ${currentFolder.contents[folder].type}, not a folder`;
			err.classList.add('errMsg');
			output.prepend(err);
			return -1;
		}

		currentFolder = currentFolder.contents[folder];
		currentDir.push(`/${folder}`);
		dirText.innerHTML = `<span class="green">${username}@${computername}</span>:<span class="blue">${currentDir.join(
			''
		)}</span>$`;
	}

	function pwd() {
		let dir = document.createElement('div');
		let output = document.getElementById('cmd-widget-output');
		dir.innerText = `/home/${username}${currentDir
			.slice(1, currentDir.length)
			.join('')}`;
		dir.classList.add('dir');
		output.prepend(dir);
	}

	let root = {
		type: 'root',
		contents: {
			Desktop: {
				type: 'folder',
				contents: {
					Projects: {
						type: 'folder',
						contents: {
							['roboKid.js']: {
								type: 'file',
								content: {},
							},
							['roboKid.html']: {
								type: 'file',
								content: {},
							},
							['roboKid.css']: {
								type: 'file',
								content: {},
							},
							['.gitignore']: {
								type: 'file',
								content: {},
							},
						},
					},
				},
			},
			Downloads: {
				type: 'folder',
				contents: {
					['introduction_to_web_development.txt']: {
						type: 'file',
						content: {},
					},
					['theOdinProjectSecrets.exe']: {
						type: 'file',
						content: {},
					},
				},
			},
			Documents: {
				type: 'folder',
				contents: {
					['node_modules']: {
						type: 'folder',
						content: {
							['oneMillionFiles']: {
								type: 'file',
								content: {},
							},
						},
					},
				},
			},
			Videos: {
				type: 'folder',
				contents: {
					['cs50_lecture1.mp4']: {
						type: 'file',
						content: {},
					},
					['react_tutorial.mp4']: {
						type: 'file',
						content: {},
					},
				},
			},
			Music: {
				type: 'folder',
				contents: {
					['DOOMSoundtrack.mp3']: {
						type: 'file',
						content: {},
					},
					['KommSusserTod.mp3']: {
						type: 'file',
						content: {},
					},
					['NightcoreMix583WeebEdition.mp3']: {
						type: 'file',
						content: {},
					},
				},
			},
			Pictures: {
				type: 'folder',
				contents: {
					['DoILookLikeIKnowWhatAJpgIs.jpg']: {
						type: 'file',
						content: {},
					},
					['HomeworkCheatsheet.png']: {
						type: 'file',
						content: {},
					},
					['PicturesOfFriends']: {
						type: 'folder',
						content: {},
					},
				},
			},
		},
	};

	const username = 'robokid';
	const computername = 'systemName';
	let currentFolder = root;
	let currentDir = ['~'];
	let blinking;
	let listenersExist = false;

	let levels = ['-1', '-1', '-1', '-1', '-1', '-1'];

	function blink() {
		let caret = document.getElementById('cmd-widget-dir-caret');
		if (caret != null) {
			if (caret.style.visibility === 'visible') {
				caret.style.visibility = 'hidden';
			} else {
				caret.style.visibility = 'visible';
			}
		} else {
			clearInterval(blinking);
		}
	}

	function inputEffect(character) {
		let caret = document.getElementById('cmd-widget-dir-caret');
		let input = document.getElementById('cmd-widget-dir-input');
		if (caret != null && input != null) {
			switch (character) {
				case 8: //Backspace
					input.value = input.value.slice(0, -1);
					break;
				default:
					input.value = input.value + String.fromCharCode(character);
			}
			clearInterval(blinking);
			caret.style.visibility = 'visible';
			resizeInput(input);
			blinking = setInterval(blink, 750);
		}
	}

	//Magic resize function
	function resizeInput(input) {
		let canvas = document.createElement('canvas');
		let context = canvas.getContext('2d');
		context.font = '16px Ubuntu';
		let width = Math.ceil(context.measureText(input.value).width) + 5;
		input.style.width = `${width}px`;
	}

	function submit(submission) {
		_level.submit(submission);
	}

	return {
		generateHtml,
		setLevel,
	};
};

export {
	exampleWidget,
	binaryWidget,
	binaryConvertWidget,
	RGBWidget,
	commandLineWidget,
};
