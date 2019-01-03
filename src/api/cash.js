import request from '@/utils/request'

export function fetchList(query) {
    return request({
        url: '/operator/cashlist',
        method: 'post',
        params: query
    })
}

export function offlineCash(cashid, isexchange) {
    return request({
        url: '/operator/setcashexchange',
        method: 'post',
        params: { cashid, isexchange }
    })
}