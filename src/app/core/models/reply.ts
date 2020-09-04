import { User } from './user';
import { Thread } from './thread';

export interface Reply {
    _id: string,
    tid: Thread,
    author: User,
    content: string,
    createdAt?: Date,
    updatedAt?: Date
}
