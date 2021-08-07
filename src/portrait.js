/** @constant PortraitManager
 * @summary Manages the systems within the portrait view.
 * @author DTT
 */
const PortraitManager = (() => {
	const anchor = document.getElementById('portrait-container');
	let bones = [];
	let images = [];
	let trackers = [];

	/* ------------------------ */
	/*                          */
	/*     PUBLIC FUNCTIONS     */
	/*                          */
	/* ------------------------ */

	/** @function initBoneTracking
	 * @summary Initializes bone tracking.
	 * @access public
	 * @param {number} interval The interval in milliseconds at which the visuals
	 * are updated to match the internal bone transforms.
	 */
	const initBoneTracking = (interval) => {
		for (let i = 0; i < 9; i++) {
			clearInterval(trackers[i]);
			trackers[i] = setInterval(() => {
				trackBone(i);
			}, interval);
		}
		//console.log(`Bone tracking initialized with interval of ${interval}`);
	};

	/** @function enableAnimations
	 * @summary Enables bone animations.
	 * @access public
	 */
	const enableAnimations = function () {
		bones.forEach((bone) => {
			bone.classList.add('animated');
		});
	};

	/** @function disableAnimations
	 * @summary Disables bone animations.
	 * @access public
	 */
	const disableAnimations = function () {
		bones.forEach((bone) => {
			bone.classList.remove('animated');
		});
	};

	/* ------------------------- */
	/*                           */
	/*     PRIVATE FUNCTIONS     */
	/*                           */
	/* ------------------------- */

	/** @function init
	 * @summary Initializes the portrait manager.
	 * @access private
	 */
	const init = function () {
		getBoneAndImageElements();
		initBoneTracking(1000 / 60);
	};

	/** @function getBoneAndImageElements
	 * @summary Gets all the needed elements.
	 * @access private
	 */
	function getBoneAndImageElements() {
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
	}

	/** @function trackBone
	 * @summary Tracks and image to it's bone.
	 * @description Sets the image's transforms to match it's matched bone's
	 * transforms.
	 * @access private
	 * @param {number} id The id of the bone / image to adjust.
	 */
	const trackBone = (id) => {
		images[id].style.transform = getComputedStyle(bones[id]).getPropertyValue(
			'transform'
		);
		images[id].style.transformOrigin = getComputedStyle(
			bones[id]
		).getPropertyValue('transformOrigin');
		images[id].style.left =
			bones[id].getBoundingClientRect().left -
			anchor.getBoundingClientRect().left;
		images[id].style.top =
			bones[id].getBoundingClientRect().top -
			anchor.getBoundingClientRect().top;
	};

	/* ---------------- */
	/*                  */
	/*     FINALIZE     */
	/*                  */
	/* ---------------- */

	init();

	return {
		initBoneTracking,
		enableAnimations,
		disableAnimations,
	};
})();

export { PortraitManager };
