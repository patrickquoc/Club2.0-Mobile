import { Argument } from './argument';

export interface LongTermDiscussion {
    discussionId: string,
    host: string,
    name: string,
    description: string,
    categories: string[],
    date: Date
    archived: boolean
}
