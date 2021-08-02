import { level } from './level.js';
import { exampleWidget } from './widgets.js';

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
	levels.push(
		new level().set({
			id: 0,
			title: 'Example Title',
			topic: 'Example Topic',
			widget: new exampleWidget(),
			progressionRequirements: ['Apple', 'Bee', 'Cat'],
			dialogue: [
				'The first stage\'s dialogue. The answer is "Apple"',
				'Second dialogue, answer is "Bee"',
				'Third, "Cat"',
			],
		})
	);

	return levels;
}

export { levelAtlas };
