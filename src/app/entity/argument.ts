export interface Argument {
    argumentId: string,
    discussionId: string,
    user: string,
    text: string,
    date: Date,
    totalRating: number[],
    userRating: number
    previousArgumentId?: string,
    followingArgumentCount: number
}
