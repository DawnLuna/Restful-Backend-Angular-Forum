import { User } from '.';

export interface Section {
    _id: string,
    title: string,
    description: string,
    admins: User[],
    hidden?: boolean,
    threadCount: number,
    createdAt?: Date,
    updatedAt?: Date
}
