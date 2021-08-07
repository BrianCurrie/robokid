const AudioManager = (() => {
	const bgm = document.getElementById('bgm');

	function init() {
		document.getElementById('toggle-bgm-button').onclick = () => {
			toggleBgm();
		};
		bgm.volume = 0.1;
		bgm.loop = true;
	}

	function toggleBgm() {
		if (!bgm.paused) {
			bgm.pause();
			document.getElementById('toggle-bgm-button').src = 'assets/audio-off.png';
		} else {
			bgm.play();
			document.getElementById('toggle-bgm-button').src = 'assets/audio-on.png';
		}
	}

	init();
})();

export { AudioManager };
