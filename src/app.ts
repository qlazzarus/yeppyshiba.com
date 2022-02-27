import 'phaser';
import { LoaderScene, MainScene } from '@/scenes';
import { PicoCRT } from '@/pipelines';

class Game extends Phaser.Game {
    constructor() {
        super(<Phaser.Types.Core.GameConfig>{
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            type: Phaser.WEBGL,
            parent: 'content',
            physics: {
                default: 'arcade',
            },
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },
            pipeline: {
                PicoCRT
            } as any,
            scene: [
                LoaderScene, 
                MainScene
            ]
        });
    }
}

new Game();