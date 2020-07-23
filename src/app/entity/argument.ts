export interface Argument {
    argumentId: string,
    discussionId: string,
    user: string,
    text: string,
    date: Date,
    rating?: number,
    numberOfRatings?: number,
    userRated?: string[],
    numberOfReports?: number,
    usersReported?: string[]
}
