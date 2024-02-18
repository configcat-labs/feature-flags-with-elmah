import setUpLogger from './logger.js';

window.onload = function () {
	const logger = setUpLogger();

	const phaserConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: { autoCenter: Phaser.Scale.CENTER_BOTH },
    physics: {
    	default: 'arcade',
    	arcade: {
    		gravity: { y: 300 }
    	}
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
	};

	var game = new Phaser.Game(phaserConfig);

	var platforms, ball, candies, cursors;
	var score = 0;
	var scoreText;

	function preload () {
		this.load.image('background', 'assets/background.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('candy', 'assets/candy.png');
    this.load.image('ball', 'assets/ball.png');
	}

	function create () {
		this.add.image(0, 0, 'background').setOrigin(0, 0);

		platforms = this.physics.add.staticGroup();
		platforms.create(400, 580, 'ground').setScale(2).refreshBody();

		platforms.create(600, 410, 'ground');
		platforms.create(50, 270, 'ground');
		platforms.create(650, 200, 'ground');

		ball = this.physics.add.sprite(100, 450, 'ball');
		ball.setBounce(0.5);
		ball.setCollideWorldBounds(true);
		ball.body.setGravityY(300);

		this.physics.add.collider(ball, platforms);

		candies = this.physics.add.group({
			key: 'candy',
			repeat: 9,
			setXY: { x: 35, y: 0, stepX: 75 }
		});

		candies.children.iterate(function (child) {
			child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.6));
		});

		this.physics.add.collider(candies, platforms);
		this.physics.add.overlap(ball, candies, eatCandy, null, this);

		scoreText = this.add.text(630, 5, 'score: 0', { fontSize: '32px', fill: '#0052c6', fontFamily: 'Consolas' });

		cursors = this.input.keyboard.createCursorKeys();
	}

	function update () {
		if(cursors.left.isDown) {
			ball.rotation -= 0.10;
			ball.setVelocityX(-160);
		} else if(cursors.right.isDown) {
			ball.rotation += 0.10;
			ball.setVelocityX(160);
		} else {
			ball.setVelocityX(0);
		}

		if(cursors.up.isDown && ball.body.touching.down) {
			ball.setVelocityY(-450);
		}
	}

	function eatCandy(ball, candy) {
		candy.disableBody(true, true);
		logger.error("Candy Error");
		score += 5;
		scoreText.setText(`score: ${score}`)
	}
}