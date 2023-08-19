export interface ITopic {
    _id: string;
    name: string;
    description: string;
}
export interface ICreateTopic extends Omit<ITopic, '_id'> {}
