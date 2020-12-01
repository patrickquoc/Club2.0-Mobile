export interface CreateArgumentDto {
    discussionId: string,
    user: string,
    text: string,
    date: Date
    prevArgumentId?: string;
}
