import request from "@/utils/request";
import type { TrademarkParams, TrademarkListResponse } from "./type";

//项目用户相关的请求地址
enum API {
  TradeMarkList_URL = "/admin/product/baseTrademark",
}

// 1.品牌列表接口
export const getTrademarkList = ({ page = 1, limit = 10 }: TrademarkParams) =>
  request.get<TrademarkListResponse>(
    `${API.TradeMarkList_URL}/${page}/${limit}`
  );
