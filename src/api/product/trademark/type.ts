// 定义请求参数类型
export interface TrademarkParams {
  page: number;
  limit: number;
}

// 定义响应数据类型
interface Response<T = {}> {
  code: number;
  message: string;
  data: T;
}

// 定义品牌的响应数据中data的类型
interface TrademarkListData {
  records: [
    {
      id: number;
      tmName: string;
      logoUrl: string;
    }
  ];
  total: number;
  size: number;
  current: number;
  pages: number;
  searchCount: boolean;
}

export type TrademarkListResponse = Response<TrademarkListData>;
