import portrait from './portrait.js';
import settings from './settings.js';
import { scene, actor } from './scene.js';
//import { actor } from './scene.js';

{
	document.getElementById('open-settings-button').onclick = () => {
		settings.openSettings();
	};

	document.getElementById('close-settings-button').onclick = () => {
		settings.closeSettings();
	};

	for (let i = 0; i < 4; i++) {
		document.getElementById('animation-settings-options').children[i].onclick = () => {
			settings.setAnimationUpdateRate(i);
		};
	}

	for (let i = 0; i < 3; i++) {
		document.getElementById('font-settings-options').children[i].onclick = () => {
			settings.setFontChoice(i);
		};
	}

	for (let i = 0; i < 4; i++) {
		document.getElementById('dialogue-settings-options').children[i].onclick = () => {
			settings.setDialogueSpeed(i);
		};
	}
}