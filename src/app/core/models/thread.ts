import { User, Section } from '.';

export interface Thread {
    _id: string,
    section?: Section,
    author: User,
    title: string,
    content: string,
    slug: string,
    replyCount: number,
    createdAt?: Date,
    updatedAt?: Date
}
