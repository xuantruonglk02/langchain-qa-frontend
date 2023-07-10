import { type AxiosResponse } from 'axios';
import { DocumentFileExtension, FileType, HttpStatus, OrderDirection } from './constants';

export interface IBodyResponse<T> extends AxiosResponse {
    success: boolean;
    isRequestError?: boolean;
    code: HttpStatus;
    message: string;
    data: T;
    errors?: { key: string; message: string; errorCode: HttpStatus }[];
}

export interface ICommonGetListQuery {
    page?: number;
    limit?: number;
    keyword?: string;
    orderBy?: string;
    orderDirection?: OrderDirection;
}

export interface IGetListResponse<T> {
    items: T[];
    totalItems: number;
}

export interface IS3File {
    _id: string;
    name: string;
    key: string;
    type: FileType;
    fileExtension: DocumentFileExtension;
}
