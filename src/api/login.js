import request from '@/utils/request'

export function loginByPhone(phone, password) {
    const data = {
        phone,
        password
    }
    return request({
        url: '/login',
        method: 'post',
        params: data
    })
}

export function logout() {
    return request({
        url: '/logout',
        method: 'post'
    })
}

export function getUserInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}