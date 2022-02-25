import 'phaser';
import MainScene from '@/MainScene';
import PicoCRT from '@/PicoCRT';

namespace yeppy {
    export class Game extends Phaser.Game {
        constructor() {
            super(<Phaser.Types.Core.GameConfig>{
                width: GAME_WIDTH,
                height: GAME_HEIGHT,
                type: Phaser.WEBGL,
                parent: 'content',
                /*
                render: {
                    pixelArt: true
                },
                */
                /*
                physics: {
                    default: 'arcade',
                },
                */
                scale: {
                    mode: Phaser.Scale.FIT,
                    autoCenter: Phaser.Scale.CENTER_BOTH
                },
                pipeline: {
                    PicoCRT
                } as any,
                scene: MainScene,
            });
        }
    }
}

new yeppy.Game();