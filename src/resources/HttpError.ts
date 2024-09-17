export class HttpError extends Error {
  type = 'HttpError' as const;

  constructor(
    public message: string = 'Bilinməyən xəta baş verdi',
    public status: number = 500
  ) {
    super(message);

    this.name = 'HttpError';
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static isHttpError(error: any): error is HttpError {
    return error.type === 'HttpError';
  }

  json() {
    return {
      message: this.message,
      status: this.status,
      timestamp: Date.now(),
      name: this.name,
      type: this.type,
    };
  }
}
