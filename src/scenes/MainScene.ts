import { Animation, Asset, Pipeline, Scene } from '@/enums';
import { TextQueue, TextQueueType } from '@/properties';

export default class MainScene extends Phaser.Scene {
    private scrollSpeed = 1;
    private backgroundFar?: Phaser.GameObjects.TileSprite;
    private backgroundBack?: Phaser.GameObjects.TileSprite;
    private backgroundForeground?: Phaser.GameObjects.TileSprite;
    private text?: Phaser.GameObjects.DynamicBitmapText;
    private textOffset = 0;

    constructor() {
        super(Scene.MAIN_SCENE);
    }

    public create(): void {
        this.addBackground();
        this.addShiba();
        this.addAudio();
        this.addText();
        this.addPipeline();   
    }

    public update(): void {
        this.updateBackground();
    }

    private updateBackground(): void {
        if (this.backgroundFar) this.backgroundFar.tilePositionX += this.scrollSpeed / 8;
        if (this.backgroundBack) this.backgroundBack.tilePositionX += this.scrollSpeed / 6;
        if (this.backgroundForeground) this.backgroundForeground.tilePositionX += this.scrollSpeed / 4;
    }

    private addPipeline(): void {
        this.cameras.main.setPostPipeline(Pipeline.PICO_CRT);
    }

    private addText(): void {
        this.text = this.add.dynamicBitmapText(GAME_WIDTH * 1.5, GAME_HEIGHT / 2, Asset.ATARI_SMOOTH)
            .setText('')
            .setFontSize(30)
            .setOrigin(0.5, 0.5)
            .setCenterAlign();

        this.showText();
    }

    private showText(): void {
        const queue = TextQueue[this.textOffset];
        
        this.tweens.timeline({
            targets: this.text,
            tweens: [
                // ready
                {
                    x: GAME_WIDTH * 1.5,
                    duration: queue.ready
                },
                // appear
                {
                    x: GAME_WIDTH / 2,
                    duration: queue.appear
                },
                // hold
                {
                    x: GAME_WIDTH / 2,
                    duration: queue.hold
                },
                // disappear
                {
                    x: GAME_WIDTH * -1,
                    duration: queue.disappear
                },
            ],
            onStart: () => {
                if (this.text) this.text.setX(GAME_WIDTH * 1.5).setText(queue.text);
            },
            onComplete: () => {
                if (this.text) {
                    this.text.setX(GAME_WIDTH * -1);
                    this.textOffset++;
                    if (TextQueue.length <= this.textOffset) {
                        this.textOffset = 0;
                    }

                    this.showText();
                }
            }
        });
    }

    private addAudio(): void {
        this.sound.play(Asset.EIGHT_BIT_DETECTIVE);
    }

    private addShiba(): void {
        this.anims.create({
            key: Animation.SHIBA_WALK,
            frames: this.anims.generateFrameNumbers(Asset.SHIBA, { start: 4, end: 7, first: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT - 64, Asset.SHIBA)
            .play(Animation.SHIBA_WALK)
            .setScale(4);
    }

    private addBackground(): void {
        this.backgroundFar = this.addScaledBackground(Asset.FAR_BUILDINGS, 256, 192);
        this.backgroundBack = this.addScaledBackground(Asset.BACK_BUILDINGS, 256, 192);
        this.backgroundForeground = this.addScaledBackground(Asset.FOREGROUND, 352, 192)
            .setY(GAME_HEIGHT / 40);
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