import Mock from "mockjs";

/**
 * mock用户列表数据
 */
const createUserList = function () {
  return [
    {
      id: 1,
      avatar:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      username: "admin",
      password: "111111",
      desc: "平台管理员",
      roles: ["平台管理员"],
      buttons: ["cuser.detail"],
      routes: ["home"],
      token: "Admin Token",
    },
    {
      id: 2,
      avatar:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      username: "system",
      password: "111111",
      desc: "系统管理员",
      roles: ["系统管理员"],
      buttons: ["cuser.detail", "cuser.user"],
      routes: ["home"],
      token: "System Token",
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
  // 1.登录接口
  {
    url: "/mock/user/login",
    method: "post",
    response: ({ body }) => {
      const { username, password } = body;
      //用户列表中查看是否有此用户
      const userList = createUserList(); // 只执行一次，存储到变量
      const checkUser = userList.find(
        (item) => item.username === username && item.password === password
      );
      if (!checkUser) {
        return {
          code: 201,
          message: "账号或者密码不正确",
          data: {},
        };
      } else {
        return {
          code: 200,
          message: "登录成功",
          data: {
            token: checkUser.token,
          },
        };
      }
    },
  },

  // 2.获取用户信息接口
  {
    url: "/mock/user/info",
    method: "get",
    response: (request) => {
      //获取请求头携带token
      const token = request.headers.token;
      //校验token是否正确
      const userList = createUserList(); // 只执行一次，存储到变量
      const checkUser = userList.find((item) => item.token === token);
      if (!checkUser) {
        return {
          code: 201,
          message: "获取用户信息失败",
          data: {},
        };
      } else {
        return {
          code: 200,
          message: "获取用户信息成功",
          data: checkUser,
        };
      }
    },
  },

  // 3.退出登录接口
  {
    url: "/mock/user/logout",
    method: "post",
    response: () => {
      return {
        code: 200,
        message: "退出登录成功",
        data: {},
      };
    },
  },
];
