import { MessageType } from './constants';

export interface IMessage {
    _id?: string;
    conversationId?: string;
    type?: MessageType;
    content?: string;
    raw?: string;
}
