
export interface IResponseModel<T = any> {

  code: number;

  msg?: string;

  data?: T;

  error?: any;
}
