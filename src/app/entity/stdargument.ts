export interface STDArgument {
    argumentId: string,
    discussionId: string,
    user: string,
    text: string,
    date: Date,
    rating: number[],
    prevArgumentText?: string,
}
