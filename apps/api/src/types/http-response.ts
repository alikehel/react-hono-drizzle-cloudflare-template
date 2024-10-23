// http response type definition for api (success and error)
// also includes pagination response type

export interface HttpSuccessResponse<T> {
    success: true;
    data: T;
}

export interface HttpErrorResponse {
    success: false;
    error: string;
}

export type HttpResponse<T> = HttpSuccessResponse<T> | HttpErrorResponse;
