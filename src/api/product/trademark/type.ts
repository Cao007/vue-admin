// 定义请求参数类型
export interface TrademarkParams {
  currentPage: number;
  pageSize: number;
}

// 定义响应数据类型
export interface Response<T = {}> {
  code: number;
  message: string;
  data: T;
}

// 定义品牌的响应数据中data的类型
export interface Trademark {
  id?: number;
  tmName: string;
  logoUrl: string;
}

// 定义品牌列表的响应数据类型
export interface TrademarkListData {
  trademarks: Trademark[];
  pagination: {
    total: number;
    currentPage: number;
    pageSize: number;
  };
}

export type TrademarkListResponse = Response<TrademarkListData>;
export type TrademarkResponse = Response<Trademark>;
