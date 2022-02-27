import { Asset } from '@/enums';

export type AssetQueueType = {
    type: 'image' | 'audio' | 'spritesheet',
    name: string,
    path: string,
    frameConfig?: Phaser.Types.Loader.FileTypes.ImageFrameConfig
};

export default <AssetQueueType[]>[
    {
        type: 'image',
        name: Asset.FAR_BUILDINGS,
        path: 'assets/far-buildings.png'
    },
    {
        type: 'image',
        name: Asset.BACK_BUILDINGS,
        path: 'assets/back-buildings.png'
    },
    {
        type: 'image',
        name: Asset.BACK_BUILDINGS,
        path: 'assets/back-buildings.png'
    },
    {
        type: 'image',
        name: Asset.FOREGROUND,
        path: 'assets/foreground.png'
    },
    {
        type: 'spritesheet',
        name: Asset.SHIBA,
        path: 'assets/shiba.png',
        frameConfig: {
            frameWidth: 32, 
            frameHeight: 32
        }
    },
    {
        type: 'audio',
        name: Asset.EIGHT_BIT_DETECTIVE,
        path: 'assets/8bit_detective.mp3'
    }
];