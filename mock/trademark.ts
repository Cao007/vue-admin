import Mock from "mockjs";

/**
 * mock用户列表数据
 */
const createTradeMarkList = function () {
  return [
    {
      id: 1,
      tmName: "苹果",
      logoUrl:
        "https://img.alicdn.com/tfs/TB1YbFnRXXXXXaZaFXXXXXXXXXX-480-260.png",
    },
    {
      id: 2,
      tmName: "小米",
      logoUrl:
        "https://img.alicdn.com/tfs/TB1YbFnRXXXXXaZaFXXXXXXXXXX-480-260.png",
    },
    {
      id: 3,
      tmName: "华为",
      logoUrl:
        "https://img.alicdn.com/tfs/TB1YbFnRXXXXXaZaFXXXXXXXXXX-480-260.png",
    },
  ];
};

/**
 * mock用户相关接口
 * promise中data返回的业务数据格式为
 * {
 *   code: 200,
 *   message: "成功",
 *   data: {}
 * }
 */
export default [
  // 1.获取品牌相关列表接口
  {
    url: "/mock/product/trademark",
    method: "get",
    response: (request) => {
      const res = createTradeMarkList();
      return {
        code: 200,
        message: "成功",
        data: {
          records: res,
          total: res.length,
          size: 10,
          current: 1,
          pages: Math.ceil(res.length / 10),
          searchCount: true,
        },
      };
    },
  },
];
