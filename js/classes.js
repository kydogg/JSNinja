class Sprite {
	constructor(position, velocity) {
		this.position = position;
		this.velocity = velocity;
		this.height = 150;
		this.lastKey = "";

		this.attackBox = {
			position: this.position,
			width: 100,
			height: this.height,
		};
	}
}
