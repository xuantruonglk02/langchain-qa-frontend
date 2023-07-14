export interface ILoginWithGoogleBody {
    code: string;
    scope: string;
    authuser: string;
    prompt: string;
}

export interface IGoogleCredentials {
    accessToken: string;
    refreshToken: string;
    scope: string;
    tokenType: string;
    idToken: string;
    expiryDate: number;
}

export interface IUserGoogleProfile {
    _id: string;
    id: string;
    email: string;
    name: string;
    givenName: string;
    familyName: string;
    picture: string;
    locale: string;
}

export interface ILoginWithGoogle {
    profile: IUserGoogleProfile;
    tokens: IGoogleCredentials;
}
