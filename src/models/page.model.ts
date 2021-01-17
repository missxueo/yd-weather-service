interface IPageQuery{
  skip?: number;

  take?: number;
}

export class PageModel {

  page: number = 1;
  
  rows: number = 10;

  asQuery(): IPageQuery{
    return {
      take: this.rows,
      skip: (this.page - 1) * this.rows
    };
  }
}
