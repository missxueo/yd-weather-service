
export class CustomerException implements Error {
  constructor(message: string, stack?: string, name?: string){
    this.message = message;
    this.stack = stack;
    this.name = name || "CustomerException";
  }

  name: string;
  message: string;
  stack?: string;
}