import 'phaser';
import MainScene from '@/MainScene';

namespace yeppy {
    export class Game extends Phaser.Game {
        constructor() {
            super(<Phaser.Types.Core.GameConfig>{
                width: GAME_WIDTH,
                height: GAME_HEIGHT,
                type: Phaser.AUTO,
                parent: 'content',
                render: {
                    pixelArt: true
                },
                physics: {
                    default: 'arcade',
                },
                scale: {
                    mode: Phaser.Scale.FIT,
                    autoCenter: Phaser.Scale.CENTER_BOTH
                },
                scene: [
                    MainScene
                ]
            });
        }
    }
}

new yeppy.Game();