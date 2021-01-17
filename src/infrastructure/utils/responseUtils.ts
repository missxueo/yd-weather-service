import { IResponseModel } from "../../models/response.model";

export function resp(code: number, data?: any, msg?: string, error?: any): IResponseModel {
  return {
    code,
    data,
    msg,
    error,
  }
}

export function succeed(data: any, msg?: string): IResponseModel {
  return resp(200, data, msg || 'success');
}

export function ok(msg?: string): IResponseModel {
  return succeed(null, msg || 'ok');
}

export function accept(data: any, msg?: string){
  return resp(201, data, msg || 'accept');
}

export function fail(msg: string, data?: any){
  return resp(400, data, msg);
}

export function notfound(msg?: string){
  return resp(404, null, msg || '未找到资源');
}