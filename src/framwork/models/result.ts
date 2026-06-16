export interface Result<T> {
  isSuccess: boolean;
  message: string;
  data: T;
  errors?: string[];
}
