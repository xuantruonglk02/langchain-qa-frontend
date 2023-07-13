export enum PageName {
    CHAT_PAGE = 'ChatPage',
    LOGIN_PAGE = 'LoginPage',
    LOGIN_WITH_GOOGLE = 'LoginWithGoogle',
    NOT_FOUND_PAGE = 'NotFoundPage',
}

export enum HttpStatus {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,
    GROUP_HAS_CHILDREN = 410,
    GROUP_MAX_LEVEL = 411,
    GROUP_MAX_QUANTITY = 412,
    ITEM_NOT_FOUND = 444,
    ITEM_ALREADY_EXIST = 445,
    ITEM_INVALID = 446,
    NETWORK_ERROR = 447,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
}

export enum OrderDirection {
    ASC = 'asc',
    DESC = 'desc',
}

export enum DocumentFileExtension {
    DOCX = 'docx',
    PDF = 'pdf',
}

export enum FileType {
    DOCUMENT = 'document',
}

export const FormValidator = {
    INPUT_TEXT_MAX_LENGTH: 255,
    TEXT_AREA_MAX_LENGTH: 2000,
    PASSWORD_MIN_LENGTH: 8,
    REGEX: {
        NAME: /^([^!@`~#$:%^*&()<>?\\/\\+|=]+?)$/,
        PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
        PHONE_NUMBER:
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        SPECIAL_CHARACTERS: /[~`!@#$%^&*()+={}[\];:'"<>.,/\\?-_]/g,
    },
};

export const DocumentFileType = {
    [DocumentFileExtension.DOCX]: '.docx',
    [DocumentFileExtension.PDF]: '.pdf',
};

export const DocumentFileMimeType = {
    [DocumentFileExtension.DOCX]:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    [DocumentFileExtension.PDF]: 'application/pdf',
};

export const DEFAULT_FIRST_PAGE = 1;
export const DEFAULT_ITEM_PER_PAGE_LIMIT = 10;
