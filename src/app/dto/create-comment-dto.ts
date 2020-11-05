export interface CreateCommentDto {
    user: string
    text: string,
    date: Date,
    prevArgumentId: string
}
