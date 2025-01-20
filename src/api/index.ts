import request from "@/utils/request";


/**
 * 登录接口
 */
export function login(params: any) {
    return request({
        url: '/login',
        method: 'post',
        data: params,
        mock: true
    })
}