export interface CreateSTDDto {
    name: string,
    host: string,
    description: string,
    categories: string[],
    date: Date,
    userLimit: string,
    privateFlag: string,
    password?: string,
}
