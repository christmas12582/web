import request from '@/utils/request'

export function fetchList(query) {
    return request({
        url: '/operator/getdistributelist',
        method: 'post',
        params: query
    })
}

export function changeRatio(userid, ratio) {
    return request({
        url: '/operator/setratio',
        method: 'post',
        params: { userid, ratio }
    })
}