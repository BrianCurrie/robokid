import { Level } from './level.js';
import { exampleWidget, binaryWidget, binaryConvertWidget } from './widgets.js';

/**
 * The levelAtlas function generates all of the level data for the game.
 * This is where levels are created.
 */
function levelAtlas() {
	/*
	A new level is created by:
	
	1. Calling "new level()" to construct a new level object.
	2. Calling "set()" on the newly constructed level. See the set function
	documentation for more details.
	3. Pushing the new level into the "levels" variable.

	This can be short-cut into a condensed single-line call as illustrated in the
	example below - levels.push(new level().set({}));
	
	An example (you may copy-paste this, it does work):

		// Example Level
		// Example Title - Example Topic
		levels.push(new level().set({
			id: 0,
			title: 'Example Title',
			topic: 'Example Topic',
			widget: new exampleWidget(),
			progressionRequirements: ['a', 'b', 'c']
		}));

	 */

	let levels = [];

	// Example Level
	// Example Title - Example Topic
	//levels.push(
	//	new Level().set({
	//		id: 0,
	//		title: 'Example Title',
	//		topic: 'Example Topic',
	//		widget: new exampleWidget(),
	//		progressionRequirements: ['Apple', 'Bee', 'Cat'],
	//		dialogue: [
	//			'The first stage\'s dialogue. The answer is "Apple"',
	//			'Second dialogue, answer is "Bee"',
	//			'Third, "Cat"',
	//		],
	//	})
	//);
	//levels.push(
	//	new Level().set(
	//		0,
	//		'Example Title',
	//		'Example Topic',
	//		new exampleWidget(),
	//		['Apple', 'Bee', 'Cat'],
	//		[
	//			'The first stage\'s dialogue. The answer is "Apple"',
	//			'Second dialogue, answer is "Bee"',
	//			'Third, "Cat"',
	//		]
	//	)
	//);
	levels.push(
		new Level(
			0,
			'Example Title',
			'Example Topic',
			new exampleWidget(),
			['Apple', 'Bee', 'Cat'],
			[
				'The first stage\'s dialogue. The answer is "Apple"',
				'Second dialogue, answer is "Bee"',
				'Third, "Cat"',
			]
		)
	);

	levels.push(
		new Level(
			1,
			'Binary',
			'Introduction to binary',
			new binaryWidget(),
			['1', '5', '198'],
			['Write 1 in binary', 'Write 5 in binary', 'Write 198 in binary']
		)
	);

	levels.push(
		new Level(
			2,
			'Binary conversion',
			'Learn to convert to and from binary',
			new binaryConvertWidget(),
			['a', 'A', 'Hello world!'],
			[
				'What is "a" in binary?',
				'What is "A" in binary?',
				'What is "Hello world!" in binary?',
			]
		)
	);

	return levels;
}

export { levelAtlas };
