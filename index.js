const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.7;

class Sprite {
	constructor({ position, velocity, color = "red", offset }) {
		this.position = position;
		this.velocity = velocity;
		this.width = 50;
		this.height = 150;
		this.lastKey;
		this.attackBox = {
			position: {
				x: this.position.x,
				y: this.position.y,
			},
			offset,
			width: 50,
			height: 50,
		};

		this.color = color;
		this.isAttacking;
	}
	draw() {
		c.fillStyle = this.color;
		c.fillRect(this.position.x, this.position.y, 50, this.height);
		// this is where attack box is drawn
		if (this.isAttacking) {
			c.fillStyle = "green";
			c.fillRect(
				this.attackBox.position.x,
				this.attackBox.position.y,
				this.attackBox.position.width,
				this.attackBox.width.height
			);
		}
	}

	update() {
		this.draw();
		this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
		this.attackBox.position.y = this.position.y;
		this.position.x += 10;
		this.position.y += 10;

		if (this.position.y + this.height + this.velocuty >= canvas.height) {
			this.velocity.y = 0;
		} else this.velocity.y += gravity;
	}
	attack() {
		this.isAttacking = true;
		setTimeout(() => {
			this.isAttacking = false;
		}, 100);
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

	offset: {
		x: 0,
		y: 0,
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
	color: "blue",
	offset: {
		x: -50,
		y: -50,
	},
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

function detectForRectangularCollision({ rectangle, rectangle2 }) {
	return (
		rectangle.attackBox.position.x + rectangle.attackBox.width >=
			rectangle2.position.x &&
		rectangle.attackBox.position.x <=
			rectangle2.position.x + rectangle2.width &&
		rectangle.attackBox.position.y + rectangle.attackBox.height >=
			rectangle2.position.y &&
		rectangle.attackBox.position.y <=
			rectangle2.position.y + rectangle2.height &&
		rectangle.isAttacking
	);
}

function animate() {
	window.requestAnimationFrame(animate);
	c.fillStyle = "black";
	c.fillRect(0, 0, canvas.width, canvas.height);
	player.update();
	enemy.update();

	player.velocity.x = 0;
	player.velocity.y = 0;

	// * Player movement
	if (keys.a.pressed && player.lastKey === "a") {
		player.velocity.x = -5;
	} else if (keys.d.pressed && player.lastKey === "d") {
		player.velocity.x = 5;
	}
	//  * Enemy movement
	if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
		enemy.velocity.x = -5;
	} else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
		enemy.velocity.x = 5;
	}
}
/*
detect for collision 
if the right side of the player's attack box is greater or equal to the left side of the enemy's attackBox, 
then a collision has been made, log the collision.
*/

if (
	detectForRectangularCollision({ rectangle: player, rectangle2: enemy }) &&
	player.isAttacking
) {
	player.isAttacking = false;
	console.log("enemy attack successful");
}

animate();

window.addEventListener("keydown", (event) => {
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
		case " ":
			player.attack();
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
			enemy.isAttacking = true;
			break;
	}
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
});
