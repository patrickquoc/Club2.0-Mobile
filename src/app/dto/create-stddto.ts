export interface CreateSTDDto {
    name: string,
    host: string,
    description: string,
    categories: string[],
    date: Date,
    userLimit: string,
    totalRounds: string,
    privateFlag: string,
    password?: string,
}
