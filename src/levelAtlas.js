import { Level } from './level.js';
import {
	binaryWidget,
	binaryConvertWidget,
	RGBWidget,
	commandLineWidget,
	quizWidget,
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
			['1', '5', '255', '81', '198', '234'],
			[
				'Set 1 in binary',
				'Set 5 in binary',
				'Set 255 in binary',
				'Set 81 in binary',
				'Set 198 in binary',
				'Continue to experiement, or set 234 in binary and click submit to end this level.',
			],
			[
				"That's right!",
				'Correct!',
				'Right again!',
				'Good job!',
				'Right!',
				'Correct!',
			],
			`Every computer thinks in 1s and 0s, also known as binary.

            Binary can be used to represent the decimal numbers that we use everyday!
            
            This level provides a tool that has eight "bits" which you can toggle on(1) or off(0) by pressing plus or minus buttons.

            The ranges of numbers you can represent with 8 bits is 0-255.
            `
		)
	);

	levels.push(
		new Level(
			1,
			'Binary conversion',
			'How do computers understand English?',
			new binaryConvertWidget(),
			['a', 'z', '123', 'Hello world!', 'finish'],
			[
				'What is "a" in binary?',
				'What is "z" in binary?',
				'What is "123" in binary?',
				'What is "Hello world!" in binary?',
				'Type whatever you want to see how the computer reads it, or type "finish" and click submit to end the level.',
			],
			[
				"That's right!",
				'Good job!',
				'Correct!',
				"A classic, that's right!",
				'Correct answer!',
			],
			`If computers can only think in binary how can they understand what we type in English?
            
            Computer scientists came up with a clever way to solve this problem.

            They created a system where they could represent letters and characters as numbers. These numbers could then be converted into binary so the computer can understand what we are saying!
            `
		)
	);

	levels.push(
		new Level(
			2,
			'Colors',
			'How do computers see color?',
			new RGBWidget(),
			['255, 0, 0', '0, 255, 0', '0, 255, 255', '255, 255, 255', '0, 0, 0'],
			[
				'Make red (R:255 G:0 B:0)',
				'Make green (R:0 G:255 B:0)',
				'Make cyan (R:0 G:255 B:255)',
				'Set every slider to 255, what color do we get?',
				'Continue to experiment with making new colors, or set every slider to 0 and click submit to finish this level.',
			],
			[
				'Good job!',
				"My favorite color, that's right!",
				'Correct!',
				'We get white!',
				'Correct answer!',
			],
			`One of the most common ways to represent color to a computer is by using RGB, which stands for Red Green Blue.

            RGB consists of three numbers, each one ranging from 0-255. These numbers determine how much of each color we add to the mix to get a final output color.

            Bonus: Isn't it interesting that each color in RGB is represented by a number from 0-255? That's because 0-255 is the range of numbers we can represent with 8 binary bits!
            `
		)
	);

	levels.push(
		new Level(
			3,
			'Command line',
			'How do you navigate a computer without a mouse?',
			new commandLineWidget(),
			['done', 'done', 'done', 'done', 'done', 'done'],
			[
				'The command "ls" will show you folders and files, try it out!',
				'The command "clear" will wipe the display. Give it a try.',
				'The command "cd" is used to move between folders. Try typing the command "cd Desktop"',
				'Typing "cd" without a target folder will send you to the home folder. Try it now!',
				'View the current directory you\'re in by typing the command "pwd"',
				'You are now in free mode! Explore this system more, or type "finish" to complete this level.',
			],
			[
				'Look at all those folders!',
				'Nice!',
				'Beep boop, right again!',
				"You're good at this!",
				'Good job!',
				'Correct answer!',
			],
			`The command line is a user interface for navigating a computers folders and files.

            This level has a handful of commands to get you comfortable working with the command line.

            Commands:
                ls - display folders and files
                clear - clear display
                cd - go to home folder
                cd .. - go up a folder
                cd [folderName] - open a folder
                pwd - display current directory
            `
		)
	);

	levels.push(
		new Level(
			4,
			'Final Quiz',
			'What have you learned?',
			new quizWidget(),
			['finished'],
			[
				'Good luck on the quiz! You can go back and reference the other levels if you get stuck.',
			],
			['Quiz finished!'],
			`This quiz will test everything you have learned so far.
            Feel free to revisit the other levels to help you answer each of the questions, your progress will be saved!
            `
		)
	);

	// Dev testing widget.
	/*
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
	); */

	return levels;
}

export { levelAtlas };
