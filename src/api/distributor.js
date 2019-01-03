import request from '@/utils/request'

export function fetchList(query) {
    return request({
        url: '/operator/productlist',
        method: 'post',
        params: query
    })
}

export function fetchProduct(id) {
    return request({
        url: '/operator/productdetails',
        method: 'post',
        params: { id }
    })
}

export function fetchUnitList(query) {
    return request({
        url: '/operator/unitlist',
        method: 'post',
        params: query
    })
}

export function createProduct(data) {
    return request({
        url: '/operator/productadd',
        method: 'post',
        params: data
    })
}

export function updateProduct(data) {
    return request({
        url: '/operator/productupdate',
        method: 'post',
        params: data
    })
}


export function removeProduct(id) {
    return request({
        url: '/operator/productremove',
        method: 'post',
        params: { id }
    })
}

export function createUnit(data) {
    return request({
        url: '/operator/unitadd',
        method: 'post',
        params: data
    })
}

export function removeUnit(id) {
    return request({
        url: '/operator/unitremove',
        method: 'post',
        params: { id }
    })
}

export function changeUnitStatus(unitid, isvalid) {
    return request({
        url: '/operator/unitupdate',
        method: 'post',
        params: { unitid, isvalid }
    })
}