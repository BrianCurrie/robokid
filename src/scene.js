const scene = (() => {



})();

export default scene;

/*

const KID_ROBO = document.getElementById("robokid");
const KID_1 = document.getElementById("kid1");
const KID_2 = document.getElementById("kid2");
const KID_3 = document.getElementById("kid3");

// pls trust
const MAXPOS_LEFT = 0 + 16;
const MAXPOS_RIGHT = 672 - 48;

let updateRate = 1000 / 60;

function initKid(kid) {
	kid.posx = Math.round(MAXPOS_LEFT + Math.random() * MAXPOS_RIGHT);
	kid.posy = 0;
	kid.facing = 1;
	kidActionLoop(kid);
	kidUpdateLoop(kid);
}

function kidUpdateLoop(kid) {
	kid.style.transform = `translate(${kid.posx}px, ${kid.posy}px) scaleX(${kid.facing})`;
	setTimeout(() => {
		kidUpdateLoop(kid);
	}, updateRate); // limit this if there's performance issues, 1000/30 would be 30hz update
}

function kidActionLoop(kid) {

	clearInterval(kid.action);

	switch (Math.round(Math.random() * 2)) {

		// Do nothing.
		case 0:
			break;

		// Move action.
		case 1:
			kid.facing = Math.random() < 0.5 ? 1 : -1;
			moveAction(kid);
			break;

		// Jump action.
		case 2:
			jumpAction(kid);
			break;

	}

  setTimeout(function() {
  	kidActionLoop(kid);
	}, 500 + Math.random() * 1500);

}

function moveAction(kid) {

	kid.action = setInterval(function() {
		if (kid.posx < MAXPOS_LEFT) {
			kid.posx = MAXPOS_LEFT;
      clearInterval(kid.action);
			return;
		} else if (kid.posx > MAXPOS_RIGHT) {
			kid.posx = MAXPOS_RIGHT;
      clearInterval(kid.action);
      return;
    }
		kid.posx += kid.facing;
	}, 15 + Math.random() * 10);

}

function jumpAction(kid) {

	kid.action = setInterval(function () {
		if (kid.posy > -16) {
			kid.posy -= 2;
		} else {
			clearInterval(kid.action);
			kid.action = setInterval(() => {
				if (kid.posy < 0) {
					kid.posy += 2;
				} else {
					clearInterval(kid.action);
				}
			}, 1);
		}
	}, 1);

}

initKid(KID_ROBO);
initKid(KID_1);
initKid(KID_2);
initKid(KID_3);

*/