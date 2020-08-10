export interface ShortTermDiscussion {
    discussionId: string,
    host: string,
    name: string,
    description: string,
    categories: Array<string>,
    date: Date,
    userLimit: number,
    totalRounds: number,
    users: Array<string>,
    privateFlag: boolean,
    finished: boolean
}
