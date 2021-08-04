import { Level } from './level.js';
import {
	binaryWidget,
	binaryConvertWidget,
	RGBWidget,
	commandLineWidget,
} from './widgets.js';

/** @function levelAtlas
 * @summary Holds all level information.
 * @description Levels are made by hand in this function.
 * @author DTT
 * @author BC
 */
function levelAtlas() {
	let levels = [];

	// Example Level
	//levels.push(
	//	new Level(
	//		0,
	//		'Example Title',
	//		'Example Topic',
	//		new exampleWidget(),
	//		[2, 'Cat', true],
	//		['1 + 1 = ?', 'Animal that meows?', 'The sky is blue.']
	//	)
	//);

	levels.push(
		new Level(
			0,
			'Binary',
			'How do computers think?',
			new binaryWidget(),
			['1', '5', '198'],
			['Write 1 in binary', 'Write 5 in binary', 'Write 198 in binary'],
			'LEVEL INFO GOES HERE, IT CAN BE AN HTML ELEMENT OBJECT TOO'
		)
	);

	levels.push(
		new Level(
			1,
			'Binary conversion',
			'How do computers understand English?',
			new binaryConvertWidget(),
			['a', 'A', '123', 'Hello world!'],
			[
				'What is "a" in binary?',
				'What is "A" in binary?',
				'What is "123" in binary?',
				'What is "Hello world!" in binary?',
			],
			'LEVEL INFO GOES HERE, IT CAN BE AN HTML ELEMENT OBJECT TOO'
		)
	);

	levels.push(
		new Level(
			2,
			'Colors',
			'How do computers see color?',
			new RGBWidget(),
			['0, 255, 0', '255, 0, 0', '0, 255, 255'],
			[
				'Make green (R:0 G:255 B:0)',
				'Make red (R:255 G:0 B:0)',
				'Make cyan (R:0 G:255 B:255)',
			],
			'LEVEL INFO GOES HERE, IT CAN BE AN HTML ELEMENT OBJECT TOO'
		)
	);

	levels.push(
		new Level(
			3,
			'Command line',
			'Learn to use the command line',
			new commandLineWidget(),
			['done', 'done', 'done', 'done', 'done', 'done'],
			[
				'The command "ls" will show you folders and files, try it out!',
				'The command "clear" will wipe the display. Give it a try.',
				'The command "cd" is used to move between folders. Try typing the command "cd Desktop".',
				'Typing "cd" without a target folder will send you to the home folder. Try it now!',
				'View the current directory you\'re in by typing the command "pwd".',
				'You are now in free mode! Explore this system to find secrets, or type "finish" to complete this level.',
			],
			`Commands:
                ls : display folders
                clear : clear display
                cd : go to home folder
                cd .. : go up a folder
                cd [folderName] : open a folder
                pwd : display current directory
            `
		)
	);

	// Dev testing widget.
	levels.push(
		new Level(
			levels.length,
			'Testing',
			'Testing',
			new binaryWidget(),
			['1', '3', '7'],
			[
				[
					'This is the first message in the queue.',
					'This is the second.',
					'The third. Anser is 1.',
				],
				[
					'Now onto the second level, which has two messages queued instead of one.',
					'The answer for this one is 3.',
				],
				'The final stage in this test level has one message, no array.',
			],
			'LEVEL INFO GOES HERE, IT CAN BE AN HTML ELEMENT OBJECT TOO'
		)
	);

	return levels;
}

export { levelAtlas };
