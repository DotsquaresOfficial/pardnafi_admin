import wildCardSearch from '@/utils/wildCardSearch'
import sortBy, { Primer } from '@/utils/sortBy'
import paginate from '@/utils/paginate'
import { mock } from '../MockAdapter'
import { faqData } from '../data/faqData'

mock.onGet(`/api/faq`).reply((config) => {
    const { pageIndex, pageSize, sort, query } = config.params

    const { order, key } = sort

    const faq = faqData as any[]

    const sanitizeFaq = faq.filter((elm) => typeof elm !== 'function')
    let data = sanitizeFaq
    let total = faq.length

    if (key && order) {
        if (key !== 'totalSpending') {
            data.sort(
                sortBy(key, order === 'desc', (a) =>
                    (a as string).toUpperCase(),
                ),
            )
        } else {
            data.sort(sortBy(key, order === 'desc', parseInt as Primer))
        }
    }

    if (query) {
        data = wildCardSearch(data, query)
        total = data.length
    }

    data = paginate(data, pageSize, pageIndex)

    const responseData = {
        list: data,
        total: total,
    }

    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve([200, responseData])
        }, 500)
    })
})

mock.onGet(new RegExp(`/api/faq/*`)).reply(function (config) {
    const id = config.url?.split('/')[2]

    const faq = faqData.find((faq) => faq.id === id)

    if (!faq) {
        return [404, {}]
    }

    return [200, faq]
})