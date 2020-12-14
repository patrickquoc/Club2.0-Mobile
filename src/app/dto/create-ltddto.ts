export interface CreateLTDDto {
    name: string,
    host: string,
    description: string,
    categories: string[],
    date: Date,
    password?: string;
}
