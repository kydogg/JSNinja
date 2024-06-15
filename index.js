const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.7;

class Sprite {
	constructor({ position, velocity, color = "red" }) {
		this.position = position;
		this.velocity = velocity;
		this.width = 50; 
		this.height = 150;
		this.lastKey = "";

		this.attackBox = {
			position: this.position,
			width: 100,
			height: this.height,
		};
		this.color = color;
	}
	draw() {
		c.fillStyle = this.color;
		c.fillRect(this.position.x, this.position.y, 50, this.height);
		c.fillStyle = "green";
		// this is where attack box is drawn
		c.fillRect(
			this.attackBox.position.x,
			this.attackBox.position.y,
			this.attackBox.position.width,
			this.attackBox.width.height
		);
	}

	update() {
		this.draw();

		this.position.x += 10;
		this.position.y += 10;

		if (this.position.y + this.height + this.velocuty >= canvas.height) {
			this.velocity.y = 0;
		} else this.velocity.y += gravity;
	}
}

const player = new Sprite({
	position: {
		x: 400,
		y: 0,
	},

	velocity: {
		x: 1,
		y: 1,
	},
});

const enemy = new Sprite({
	position: {
		x: 400,
		y: 100,
	},
	velocity: {
		x: 100,
		y: 100,
	},
	color = "blue",
});

console.log(player);

const keys = {
	d: {
		pressed: false,
	},
	a: {
		pressed: false,
	},
	w: {
		pressed: false,
	},
	ArrowRight: {
		pressed: false,
	},
	ArrowLeft: {
		pressed: false,
	},
};

function animate() {
	window.requestAnimationFrame(animate);
	c.fillStyle = 'black';
	c.fillRect(0, 0, canvas.width, canvas.height);
	player.update();
	enemy.update();
	
	player.velocity.x = 0;
	player.velocity.y = 0;

	// * Player movement
	if (keys.a.pressed && player.lastKey === 'a') {
		player.velocity.x = -5;
	} else if (keys.d.pressed && player.lastKey === 'd') {
		player.velocity.x = 5;
	}
//  * Enemy movement
	if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
		enemy.velocity.x = -5;
	} else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
		enemy.velocity.x = 5;
	}
}
/*
detect for collision 
if the right side of the player's attack box is greater or equal to the left side of the enemy's attackBox, 
then a collision has been made, log the collision.
! make sure to animate this as the next step
*/
if (
	player.attackBox.position.x + player.attackBox.width >=
	enemy.position.x && player.attackBox.position.x <= enemy.position.x + enemy.width
) {
	console.log("collision");
}

animate();

window.addEventListener("keydown", (event) => {
	console.log(event.key);

	switch (event.key) {
		case "d":
			keys.d.pressed = true;
			player.lastKey = "d";
			break;
		case "a":
			keys.a.pressed = true;
			player.lastKey = "a";
			break;
		case "w":
			player.velocity.y = -30;
			break;
		case "ArrowLeft":
			keys.ArrowLeft.pressed = true;
			enemy.lastKey = "ArrowLeft";
			break;
		case "ArrowUp":
			keys.ArrowUp.pressed = true;
			enemy.lastKey = "ArrowUp";
			break;
		case "ArrowRight":
			keys.ArrowRight.pressed = true;
			enemy.lastKey = "ArrowRight";
			break;
		case "ArrowDown":
			enemy.velocity.y = -30;
			break;
	}
	console.log(event.key);
});

window.addEventListener("keyup", (event) => {
	switch (event.key) {
		case "d":
			keys.d.pressed = false;
			break;
		case "a":
			keys.a.pressed = false;
			break;
		case "w":
			keys.w.pressed = false;
			break;
	}
	//enemy keys
	switch (event.key) {
		case "ArrowRight":
			keys.ArrowRight.pressed = false;
			break;
		case "ArrowLeft":
			keys.ArrowLeft.pressed = false;
			break;
	}
	console.log(event.key);
});
