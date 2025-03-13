import request from "@/utils/request";
import type {
  TrademarkParams,
  TrademarkListResponse,
  Trademark,
  TrademarkResponse,
} from "./type";

//项目用户相关的请求地址
enum API {
  TradeMarkList_URL = "/admin/trademarks",
  TradeMarkAdd_URL = "/admin/trademarks",
  TradeMarkUpdate_URL = "/admin/trademarks",
  TradeMarkDelete_URL = "/admin/trademarks",
}

// 1.品牌列表接口
export const trademarkListApi = (params: TrademarkParams) =>
  request.get<TrademarkListResponse>(API.TradeMarkList_URL, params);

// 2.添加品牌接口
export const trademarkAddApi = (data: Trademark) =>
  request.post<TrademarkResponse>(API.TradeMarkAdd_URL, data);

// 3.修改品牌接口
export const trademarkUpdateApi = (id: number, data: Trademark) =>
  request.put<TrademarkResponse>(`${API.TradeMarkUpdate_URL}/${id}`, data);

// 4.删除品牌接口
export const trademarkDeleteApi = (id: number) =>
  request.del<any>(`${API.TradeMarkDelete_URL}/${id}`);
