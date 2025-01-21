import request from "@/utils/request";

/**
 * 登录接口
 */
export function login(params: any) {
    return request({
        url: '/users/login',
        method: 'post',
        data: params,
        mock: false
    })
}

/**
 * 菜单列表
 */
export function getMenuList(params?: any) {
    return request({
        url: '/menu/list',
        method: 'get',
        data: params,
        mock: true
    })
}