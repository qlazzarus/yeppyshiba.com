import AnimationEnum from '@/AnimationEnum';
import AssetEnum from '@/AssetEnum';

export default class MainScene extends Phaser.Scene {
    private scrollSpeed = 1;
    private backgroundFar?: Phaser.GameObjects.TileSprite;
    private backgroundBack?: Phaser.GameObjects.TileSprite;
    private backgroundForeground?: Phaser.GameObjects.TileSprite;

    constructor() {
        super('main-scene');
    }

    public init(): void {}

    public preload(): void {
        this.load.image(AssetEnum.FAR_BUILDINGS, 'assets/far-buildings.png'); // first
        this.load.image(AssetEnum.BACK_BUILDINGS, 'assets/back-buildings.png');
        this.load.image(AssetEnum.FOREGROUND, 'assets/foreground.png');
        this.load.spritesheet(AssetEnum.SHIBA, 'assets/shiba.png', { frameWidth: 32, frameHeight: 32 });
        this.load.audio(AssetEnum.EIGHT_BIT_DETECTIVE, 'assets/8bit_detective.mp3');
    }

    public create(): void {
        const width = this.scale.width;
        const height = this.scale.height;
        
        // add far buildings
        this.backgroundFar = this.add.tileSprite(0, 0, width, height, AssetEnum.FAR_BUILDINGS)
            .setScale(2);

        // add back buildings
        this.backgroundBack = this.add.tileSprite(0, -25, width, height, AssetEnum.BACK_BUILDINGS)
            .setScale(2);

        // add forground
        this.backgroundForeground = this.add.tileSprite(0, -45, width, height, AssetEnum.FOREGROUND)
            .setScale(2.25);

        // add shiba animation
        this.anims.create({
            key: AnimationEnum.SHIBA_WALK,
            frames: this.anims.generateFrameNumbers(AssetEnum.SHIBA, { start: 4, end: 7, first: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.add.sprite(100, height - 55, AssetEnum.SHIBA)
            .play(AnimationEnum.SHIBA_WALK)
            .setScale(4);

        // add audio 
        this.sound.play(AssetEnum.EIGHT_BIT_DETECTIVE);
    }

    public update(): void {
        if (this.backgroundFar) this.backgroundFar.tilePositionX += this.scrollSpeed / 8;
        if (this.backgroundBack) this.backgroundBack.tilePositionX += this.scrollSpeed / 6;
        if (this.backgroundForeground) this.backgroundForeground.tilePositionX += this.scrollSpeed / 4;
    }
}