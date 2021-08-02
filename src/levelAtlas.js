import { Level } from './level.js';
import { exampleWidget } from './widgets.js';

/**
 * The levelAtlas function generates all of the level data for the game.
 * This is where levels are created.
 */
function levelAtlas() {
	let levels = [];

	// EXAMPLE LEVEL
	// levels.push(
	// 	new Level(
	// 		0,
	// 		'Example Title',
	// 		'Example Topic',
	// 		new exampleWidget(),
	// 		['Apple', 'Bee', 'Cat'],
	// 		[
	// 			'The first stage\'s dialogue. The answer is "Apple"',
	// 			'Second dialogue, answer is "Bee"',
	// 			'Third, "Cat"',
	// 		]
	// 	)
	// );

	return levels;
}

export { levelAtlas };
