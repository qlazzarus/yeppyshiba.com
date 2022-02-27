import { Animation, Asset, Pipeline, Scene } from '@/enums';
import { TextQueue } from '@/properties';

export default class MainScene extends Phaser.Scene {
    private scrollSpeed = 1;
    private backgroundFar?: Phaser.GameObjects.TileSprite;
    private backgroundBack?: Phaser.GameObjects.TileSprite;
    private backgroundForeground?: Phaser.GameObjects.TileSprite;
    private dynamicBitmapText?: Phaser.GameObjects.DynamicBitmapText;

    constructor() {
        super(Scene.MAIN_SCENE);
    }

    public create(): void {
        this.backgroundFar = this.addScaledBackground(Asset.FAR_BUILDINGS, 256, 192);
        this.backgroundBack = this.addScaledBackground(Asset.BACK_BUILDINGS, 256, 192);
        this.backgroundForeground = this.addScaledBackground(Asset.FOREGROUND, 352, 192)
            .setY(GAME_HEIGHT / 40);
        
        // add shiba animation
        this.anims.create({
            key: Animation.SHIBA_WALK,
            frames: this.anims.generateFrameNumbers(Asset.SHIBA, { start: 4, end: 7, first: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.add.sprite(100, GAME_HEIGHT - 55, Asset.SHIBA)
            .play(Animation.SHIBA_WALK)
            .setScale(4);
        
        // add audio 
        this.sound.play(Asset.EIGHT_BIT_DETECTIVE);

        // add text
        // https://labs.phaser.io/view.html?src=src\game%20objects\bitmaptext\retro%20font\scrolling%20retro%20text.js&v=3.55.2
        this.dynamicBitmapText = this.add.dynamicBitmapText(GAME_WIDTH / 2, GAME_HEIGHT / 2, Asset.ATARI_SMOOTH)
            .setText('')
            .setFontSize(30)
            .setOrigin(0.5)
            .setCenterAlign();

        // set camera pipeline
        this.cameras.main.setPostPipeline(Pipeline.PICO_CRT);
    }

    public update(): void {
        if (this.backgroundFar) this.backgroundFar.tilePositionX += this.scrollSpeed / 8;
        if (this.backgroundBack) this.backgroundBack.tilePositionX += this.scrollSpeed / 6;
        if (this.backgroundForeground) this.backgroundForeground.tilePositionX += this.scrollSpeed / 4;
    }

    private addScaledBackground(asset: string, textureWidth: number, textureHeight: number): Phaser.GameObjects.TileSprite {
        const scaledWidth = GAME_WIDTH / textureWidth;
        const scaledHeight = GAME_HEIGHT / textureHeight;
        const scaled = Math.min(scaledWidth, scaledHeight);

        return this.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, asset)
            .setScale(scaled)
            .setOrigin(0.0, 0.0)
    }
}