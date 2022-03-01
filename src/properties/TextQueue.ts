export type TextQueueType = {
    text: string,
    ready: number,
    appear: number,
    hold: number,
    disappear: number
}

export default <TextQueueType[]>[
    {
        text: 'yeppyshiba.com',
        ready: 1000,
        appear: 2000,
        hold: 2000,
        disappear: 2000
    },
    {
        text: "PROUDLY\nPRESENTS",
        ready: 1000,
        appear: 2000,
        hold: 4000,
        disappear: 2000
    },
    {
        text: "Yeppy Shiba\nGames",
        ready: 1000,
        appear: 2000,
        hold: 2000,
        disappear: 2000
    },
    {
        text: "See you\nsoon!",
        ready: 1000,
        appear: 2000,
        hold: 2000,
        disappear: 2000
    },
];