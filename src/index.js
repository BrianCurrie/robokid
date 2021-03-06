import { GameplayManager } from './gameplayManager.js';
import { DialogueManager } from './DialogueManager.js';
import { Level } from './level.js';
import { levelAtlas } from './levelAtlas.js';
import { PortraitManager } from './portrait.js';
import { Actor, Scene } from './scene.js';
import { SettingsManager } from './settings.js';
import { GameInfoManager } from './GameInfoManager.js';
import { AudioManager } from './AudioManager.js';
import { exampleWidget, binaryWidget, binaryConvertWidget } from './widgets.js';

document.getElementById('onstart-play').onclick = () => {
	document.getElementById('onstart-container').style.display = 'none';
	AudioManager.toggleBgm();
};
