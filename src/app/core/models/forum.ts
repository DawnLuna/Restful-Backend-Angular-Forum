import { User } from '.';

export interface Forum {
    name: string,
    description: string,
    shortDescription: string,
    admins: User[],
    createdAt?: Date,
    updatedAt?: Date
}
