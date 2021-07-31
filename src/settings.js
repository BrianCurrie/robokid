import { portrait } from './portrait.js';

const settings = (() => {
	/* -------------- */
	/* PUBLIC METHODS */
	/* -------------- */

	/**
	 * Opens the settings window.
	 * Sets the settings window's display style to "";
	 */
	const openSettings = () => {
		document.getElementById('settings-container').style.display = '';
	};

	/**
	 * Closes the settings window.
	 * Sets the settings window's display style to "none";
	 */
	const closeSettings = () => {
		document.getElementById('settings-container').style.display = 'none';
	};

	/**
	 * Sets the animation update rate.
	 * Limiting the animation update rate could help with potential performance
	 * issues. In the case of disabling animation, it does not completely stop any
	 * bone tracking since stopping it outright will make the image positions not
	 * match the bone's default state, so Number.MAX_SAFE_INTEGER is used as the
	 * update interval.
	 * @param {number} setting 0, 1, 2, or 3 corrosponding to "Off", "10fps", "30fps",
	 * and "Unlimited" respectively.
	 */
	const setAnimationUpdateRate = (setting) => {
		switch (setting) {
			case 0:
				portrait.disableAnimations();
				portrait.initBoneTracking(Number.MAX_SAFE_INTEGER);
				break;
			case 1:
				portrait.enableAnimations();
				portrait.initBoneTracking(1000 / 10);
				break;
			case 2:
				portrait.enableAnimations();
				portrait.initBoneTracking(1000 / 30);
				break;
			case 3:
				portrait.enableAnimations();
				portrait.initBoneTracking(1);
				break;
		}
		document
			.getElementById('animation-settings-options')
			.children[0].classList.remove('selected');
		document
			.getElementById('animation-settings-options')
			.children[1].classList.remove('selected');
		document
			.getElementById('animation-settings-options')
			.children[2].classList.remove('selected');
		document
			.getElementById('animation-settings-options')
			.children[3].classList.remove('selected');
		document
			.getElementById('animation-settings-options')
			.children[setting].classList.add('selected');
	};

	/**
	 * Sets the font choice.
	 * VT323 is the pixelated font of choice which fits the game nicely. Open Sans
	 * is an easy to read and modern looking font. Open Dyslexic is a font
	 * optimized for users with dyslexia.
	 * @param {number} setting 0, 1, or 2 corrosponding to "VT323", "Open Sans", and
	 * "Open Dyslexic" respectively.
	 */
	const setFontChoice = (setting) => {
		switch (setting) {
			case 0: // Pixel
				document.body.classList.remove('font-standard');
				document.body.classList.remove('font-dyslexic');
				document.body.classList.add('font-pixel');
				break;
			case 1: // Standard
				document.body.classList.remove('font-pixel');
				document.body.classList.remove('font-dyslexic');
				document.body.classList.add('font-standard');
				break;
			case 2: // Dyslexic
				document.body.classList.remove('font-pixel');
				document.body.classList.remove('font-standard');
				document.body.classList.add('font-dyslexic');
				break;
		}
		document
			.getElementById('font-settings-options')
			.children[0].classList.remove('selected');
		document
			.getElementById('font-settings-options')
			.children[1].classList.remove('selected');
		document
			.getElementById('font-settings-options')
			.children[2].classList.remove('selected');
		document
			.getElementById('font-settings-options')
			.children[setting].classList.add('selected');
	};

	/**
	 * Sets the dialogue speed.
	 * Dialogue text is not set up yet, so no particular values have been decided
	 * on.
	 * @param {number} setting 0, 1, 2, or 3 corrosponding to "Off", "Slow", "Mid",
	 * and "Fast" respectively.
	 */
	const setDialogueSpeed = (setting) => {
		console.log('Dialogue speed set to ' + setting);
		document
			.getElementById('dialogue-settings-options')
			.children[0].classList.remove('selected');
		document
			.getElementById('dialogue-settings-options')
			.children[1].classList.remove('selected');
		document
			.getElementById('dialogue-settings-options')
			.children[2].classList.remove('selected');
		document
			.getElementById('dialogue-settings-options')
			.children[3].classList.remove('selected');
		document
			.getElementById('dialogue-settings-options')
			.children[setting].classList.add('selected');
	};

	/* -------- */
	/* FINALIZE */
	/* -------- */

	return {
		openSettings,
		closeSettings,
		setAnimationUpdateRate,
		setFontChoice,
		setDialogueSpeed,
	};
})();

export { settings };
