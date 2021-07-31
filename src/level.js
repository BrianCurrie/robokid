import { gameplayManager } from './gameplayManager.js';
import { exampleWidget } from './widgets.js';

/**
 * A function representing a level object.
 */
const level = function () {
	let _id = -1;
	let _title = 'no title';
	let _topic = 'no topic';
	let _widget = null;

	let _currentStage = 0;
	let _progressionRequirements = [];

	let _locked = false;
	let _completed = false;

	/* ------------------------ */
	/*                          */
	/*     PUBLIC FUNCTIONS     */
	/*                          */
	/* ------------------------ */

	/**
	 * Gets the level's id.
	 */
	function getId() {
		return _id;
	}

	/**
	 * Sets all data required at level created via an object, detailed as such:
	 *
	 * - id - The id number of the level, a positive integer which should climb up
	 * from 0 along with other levels created.
	 * - title - The title of the level, something very short and witty.
	 * - topic - The educational topic of the level, also short and to the point.
	 * - widget - A widget object instance the level will be using.
	 * - progressionRequirements - The collection (array) of requirements for
	 * progressing through the level's stages. The values can be whatever you
	 * want, they are checked against the widget's submissions for progression. If
	 * the first requirement is "Apple" and the widget submits "Apple" in the
	 * first stage, then it will progress to the second stage.
	 *
	 * @param {object} obj The object of data.
	 */
	function set(obj) {
		if ((obj.id && obj.title && obj.topic && obj.widget) == null) {
			console.log('Object passed in level creation set had null property.');
			return null;
		} else {
			_id = obj.id;
			_title = obj.title;
			_topic = obj.topic;
			_widget = obj.widget;
			_progressionRequirements = obj.progressionRequirements;
			return this;
		}
	}

	/**
	 * Generates an html element representing the level as a level selection
	 * element for the gameplay manager to use. Is only ever called from the
	 * gameplay manager.
	 */
	function generateLevelSelectItemHtml() {
		//	<div id="level-select-item">
		//		<div id="level-select-item-title">
		//		</div>
		//		<div id="level-select-item-topic">
		//		</div>
		//	</div>

		let elTitle = document.createElement('div');
		elTitle.classList.add('level-select-item-title');
		elTitle.innerText = _title;

		let elTopic = document.createElement('div');
		elTopic.classList.add('level-select-item-topic');
		elTopic.innerText = _topic;

		let elItem = document.createElement('div');
		elItem.classList.add('level-select-item');
		elItem.id = `level-select-item-${_id}`;

		elItem.appendChild(elTitle);
		elItem.appendChild(elTopic);

		elItem.onclick = () => {
			gameplayManager.beginLevel(_id);
		};

		return elItem;
	}

	/**
	 * Submits data as an attempt to progress through the level's progression
	 * requirements. Used frequently by the level's widget.
	 * @param {any} submission The submission to check with.
	 */
	function submit(submission) {
		if (_completed) {
			console.log('This level is already complete.');
			return;
		}
		console.log('Requirement: ' + _progressionRequirements[_currentStage]);
		console.log('Submission: ' + submission);
		if (submission == _progressionRequirements[_currentStage]) {
			console.log(
				'Submission attempt had correct answer - Level stage progressed'
			);
			_currentStage++;
			if (_currentStage > _progressionRequirements.length - 1) {
				finish();
			}
		} else {
			console.log('Submission attempt had incorrect answer.');
		}
	}

	/* ------------------------- */
	/*                           */
	/*     PRIVATE FUNCTIONS     */
	/*                           */
	/* ------------------------- */

	/**
	 * Begins the level, sets up communication with the widget and draws it.
	 * @param {level} lvl Due to a weird issue with setting the level's widget, the
	 * variable representing the level itself must be passed so it may be passed
	 * onto the widget.
	 */
	function begin(lvl) {
		console.log(`Level ${_id} began.`);
		document.getElementById('gameplay-container').innerHTML = '';
		if (_widget != null) {
			_widget.setLevel(lvl);
			document
				.getElementById('gameplay-container')
				.appendChild(_widget.generateHtml());
		} else {
			console.log('Level widget was null!');
		}
	}

	/**
	 * Finished the level, setting it as completed, then returns to level
	 * selection.
	 */
	function finish() {
		console.log('Level finished.');
		_completed = true;
		gameplayManager.finishLevel();
	}

	/* ---------------- */
	/*                  */
	/*     FINALIZE     */
	/*                  */
	/* ---------------- */

	return {
		set,
		getId,
		generateLevelSelectItemHtml,
		begin,
		submit,
	};
};

export { level };
