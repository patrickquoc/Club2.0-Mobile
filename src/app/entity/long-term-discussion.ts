export interface LongTermDiscussion {
    discussionId: string,
    host: string,
    name: string,
    description: string,
    categories: string[],
    date: Date,
    privateFlag: boolean,
}
