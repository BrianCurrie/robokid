import { Level } from './level.js';
import { binaryWidget, binaryConvertWidget, RGBWidget } from './widgets.js';

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
			['a', 'A', 'Hello world!'],
			[
				'What is "a" in binary?',
				'What is "A" in binary?',
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

	return levels;
}

export { levelAtlas };
