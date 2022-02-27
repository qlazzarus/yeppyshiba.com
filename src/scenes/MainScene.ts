import { Animation, Asset, Scene } from '@/enums';

export default class MainScene extends Phaser.Scene {
    private scrollSpeed = 1;
    private backgroundFar?: Phaser.GameObjects.TileSprite;
    private backgroundBack?: Phaser.GameObjects.TileSprite;
    private backgroundForeground?: Phaser.GameObjects.TileSprite;

    constructor() {
        super(Scene.MAIN_SCENE);
    }

    public init(): void {}

    public create(): void {
        const width = this.scale.width;
        const height = this.scale.height;
        
        // add far buildings
        this.backgroundFar = this.add.tileSprite(0, 0, width, height, Asset.FAR_BUILDINGS)
            .setScale(2);

        // add back buildings
        this.backgroundBack = this.add.tileSprite(0, -25, width, height, Asset.BACK_BUILDINGS)
            .setScale(2);

        // add forground
        this.backgroundForeground = this.add.tileSprite(0, -45, width, height, Asset.FOREGROUND)
            .setScale(2.25);

        // add shiba animation
        this.anims.create({
            key: Animation.SHIBA_WALK,
            frames: this.anims.generateFrameNumbers(Asset.SHIBA, { start: 4, end: 7, first: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.add.sprite(100, height - 55, Asset.SHIBA)
            .play(Animation.SHIBA_WALK)
            .setScale(4);

        // add audio 
        this.sound.play(Asset.EIGHT_BIT_DETECTIVE);

        // set camera pipeline
        this.cameras.main.setPostPipeline('PicoCRT');
    }

    public update(): void {
        if (this.backgroundFar) this.backgroundFar.tilePositionX += this.scrollSpeed / 8;
        if (this.backgroundBack) this.backgroundBack.tilePositionX += this.scrollSpeed / 6;
        if (this.backgroundForeground) this.backgroundForeground.tilePositionX += this.scrollSpeed / 4;
    }
}