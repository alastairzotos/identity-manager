
export interface IDomainError {
  code: string;
  error: Error[];
}

export class Result<T> {
  constructor(
    private readonly _value: T,
    private readonly _error?: IDomainError,
  ) {}

  static succeed<T>(value: T) {
    return new Result<T>(value);
  }

  static fail<T>(error: IDomainError) {
    return new Result<T>(undefined, error);
  }

  failed() {
    return !!this._error;
  }

  error() {
    return this._error;
  }

  value() {
    return this._value;
  }
}
