import request from "@/utils/request";

/**
 * 登录接口
 */
export function login(params: any) {
    return request({
        url: '/admin/user/login',
        method: 'post',
        data: params,
        mock: false
    })
}

/**
 * 上传接口
 */
export function upload(params: any) {
    const data = new FormData();
    for (const key in params.value) { // params为ref响应式的form表单
        data.append(key, params.value[key])
    }

    return request({
        url: '/admin/upload',
        method: 'post',
        data: data,
        mock: false,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}