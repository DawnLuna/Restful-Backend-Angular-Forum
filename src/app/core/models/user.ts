export interface User {
    _id: string,
    username: string,
    email?: string,
    password?: string,
    signature?: string,
    threadCount?: number,
    replyCount?: number,
    banned?: boolean,
    createdAt?: Date,
    updatedAt?: Date
}
