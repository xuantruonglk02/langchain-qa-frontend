import { MessageType } from './constants';

export interface IChatResponse {
    reply: string;
}

export interface IMessage {
    type: MessageType;
    message: string;
}
