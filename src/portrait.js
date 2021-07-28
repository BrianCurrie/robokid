const portrait = (() => {

	const anchor = document.getElementById('portrait-container');
	let bones = [];
	let images = [];
	let trackers = [];

						/* ----------------- */
						/* PUBLIC FUNCTIONS */
						/* ----------------- */

	/**
	 * Initializes bone tracking.
	 * Bone tracking is set for each bone and image using the private trackBone function.
	 * @param {number} interval How frequently image position should update (1000/30 = 30 fps, etc).
	 */
	const initBoneTracking = (interval) => {
		for (let i = 0; i < 9; i++) {
			clearInterval(trackers[i]);
			trackers[i] = setInterval(() => {
				trackBone(i);
			}, interval);
		}
		console.log(`Bone tracking initialized with interval of ${interval}`);
	}
	
	/**
	 * Enables bone animation.
	 * Adds the "animated" css class to each bone div.
	 */
	const enableAnimations = function () {
		bones.forEach((bone) => {
			bone.classList.add('animated');
		});
	};

	/**
	 * Disables bone animation.
	 * Removes the "animated" css class to each bone div.
	 */
	const disableAnimations = function () {
		bones.forEach((bone) => {
			bone.classList.remove('animated');
		});
	};

						/* ----------------- */
						/* PRIVATE FUNCTIONS */
						/* ----------------- */

	/**
	 * Initializes the portrait object.
	 * Grabs all the bone divs and images, then initiates bone tracking.
	 * @access private
	 */
	const init = function () {

		bones[0] = document.getElementById('bone-wheels');
		bones[1] = document.getElementById('bone-body-tube');
		bones[2] = document.getElementById('bone-chest');
		bones[3] = document.getElementById('bone-right-arm');
		bones[4] = document.getElementById('bone-right-hand');
		bones[5] = document.getElementById('bone-left-arm');
		bones[6] = document.getElementById('bone-left-hand');
		bones[7] = document.getElementById('bone-head');
		bones[8] = document.getElementById('bone-face');

		images[0] = document.getElementById('img-wheels');
		images[1] = document.getElementById('img-body-tube');
		images[2] = document.getElementById('img-chest');
		images[3] = document.getElementById('img-right-arm');
		images[4] = document.getElementById('img-right-hand');
		images[5] = document.getElementById('img-left-arm');
		images[6] = document.getElementById('img-left-hand');
		images[7] = document.getElementById('img-head');
		images[8] = document.getElementById('img-face');

		initBoneTracking(1000 / 60);

	};

	/**
	 * Tracks an image to it's bone.
	 * Adjusts the image to match it's bone's relevant transform styles.
	 * @param {number} id The ID of the bone / image to adjust.
	 * @access private
	 */
	const trackBone = (id) => {
		images[id].style.transform       = getComputedStyle(bones[id]).getPropertyValue('transform');
		images[id].style.transformOrigin = getComputedStyle(bones[id]).getPropertyValue('transformOrigin');
		images[id].style.left            = bones[id].getBoundingClientRect().left - anchor.getBoundingClientRect().left;
		images[id].style.top             = bones[id].getBoundingClientRect().top - anchor.getBoundingClientRect().top;
	}

						/* -------- */
						/* FINALIZE */
						/* -------- */

	init();

	return {
		initBoneTracking,
		enableAnimations,
		disableAnimations
	}

})();

export default portrait;