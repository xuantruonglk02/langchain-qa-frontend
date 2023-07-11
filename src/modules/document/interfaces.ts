import { DocumentFileExtension, FileType } from '@/common/constants';

export interface ICreateDocument {
    name: string;
}

export interface IGetUrlUploadDocument {
    fileExtension: DocumentFileExtension;
}

export interface IDocument {
    _id: string;
    name: string;
    fileId: string | null;
}

export interface IFile {
    _id: string;
    name: string;
    key: string;
    type: FileType;
    extension: DocumentFileExtension;
    presignedUrl?: string;
    presignedUrlCreatedAt?: Date;
}
