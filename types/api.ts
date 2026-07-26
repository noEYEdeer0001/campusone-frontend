export interface ApiErrorDetail {
  field?: string;
  message: string;
}

export interface ApiSuccessEnvelope<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorEnvelope {
  success: false;
  message: string;
  errors: ApiErrorDetail[];
}

export class ApiRequestError extends Error {
  public readonly statusCode: number;
  public readonly errors: ApiErrorDetail[];

  constructor(statusCode: number, message: string, errors: ApiErrorDetail[] = []) {
    super(message);
    this.name = 'ApiRequestError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
