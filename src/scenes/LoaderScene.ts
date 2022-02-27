import { Scene } from '@/enums';
import { AssetQueue } from '@/properties';

export default class LoaderScene extends Phaser.Scene {
    constructor() {
        super(Scene.LOADER_SCENE);
    }

    public preload(): void {
        const width = 320;
        const height = 50;

        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect((GAME_WIDTH - width) / 2, (GAME_HEIGHT - height) / 2, width, height); // x,y, width, height: ;

        const progressBar = this.add.graphics();

        this.load.on('progress', (value: number) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(((GAME_WIDTH - width) / 2) + 10, ((GAME_HEIGHT - height) / 2) + 10, (width - 20) * value, height - 20);
        });

        this.load.on('complete', () => {
            this.scene.start(Scene.MAIN_SCENE);
        });

        AssetQueue.forEach(o => {
            switch (o.type) {
                case 'image':
                    this.load.image(o.name, o.path);
                    break;
                case 'audio':
                    this.load.audio(o.name, o.path);
                    break;
                case 'spritesheet':
                    this.load.spritesheet(o.name, o.path, o.frameConfig);
                    break;
                case 'bitmap-font':
                    this.load.bitmapFont(o.name, o.path, o.fontData);
                    break;
            }
        });
    }
}