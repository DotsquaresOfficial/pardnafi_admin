import ApiService from './ApiService'

export async function apiGetInquiryList<T, U extends Record<string, unknown>>(
    params: U,
) {

    
    return ApiService.fetchDataWithAxios<T>({
        url: '/inquirys',
        method: 'get',
        params,
    })
}

export async function apiGetInquiry<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/inquirys/${id}`,
        method: 'get',
        params,
    })
}

export async function apiGetInquiryLog<T, U extends Record<string, unknown>>({
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/Inquirys/log`,
        method: 'get',
        params,
    })
}
