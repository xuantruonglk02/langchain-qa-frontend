import {
    IBodyResponse,
    ICommonGetListQuery,
    IGetListResponse,
} from '@/common/interfaces';
import service from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';
import { ICreateDocument, IDocument, IGetUrlUploadDocument, IFile } from '../interfaces';

class DocumentApiService extends ApiService {
    getDocumentsList(query: ICommonGetListQuery) {
        return this.client.get<
            IGetListResponse<IDocument>,
            IBodyResponse<IGetListResponse<IDocument>>
        >(`${this.baseUrl}`, { params: query });
    }
    createDocument(data: ICreateDocument) {
        return this.client.post<IDocument, IBodyResponse<IDocument>>(
            `${this.baseUrl}`,
            data,
        );
    }
    getUrlUploadDocument(documentId: string, query: IGetUrlUploadDocument) {
        return this.client.get<
            { file: IFile; presignedUrlPutObject: string },
            IBodyResponse<{ file: IFile; presignedUrlPutObject: string }>
        >(`${this.baseUrl}/${documentId}/upload-document-url`, { params: query });
    }
    confirmDocumentUploaded(
        documentId: string,
        data: { fileId: string; fileKey: string },
    ) {
        return this.client.post<IDocument, IBodyResponse<IDocument>>(
            `${this.baseUrl}/${documentId}/confirm-document-uploaded`,
            data,
        );
    }
}

export const documentApiService = new DocumentApiService(
    { baseUrl: '/document' },
    service,
);
