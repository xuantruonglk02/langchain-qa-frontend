import { DocumentFileExtension, FileType } from '@/common/constants';
import { DocumentAnalysisParagraphStatus, DocumentStatus } from './constants';

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
    fileUrl?: string;
    status: DocumentStatus;
}

export interface IDocumentAnalysisResult {
    _id: string;
    result: {
        status: DocumentAnalysisParagraphStatus;
        rawParagraph: string;
        rawResult: string | null;
    }[];
    createdAt?: string;
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
