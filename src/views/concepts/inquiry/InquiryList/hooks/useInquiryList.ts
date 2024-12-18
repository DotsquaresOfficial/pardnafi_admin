import { apiGetInquiryList } from '@/services/InquiryService'
import useSWR from 'swr'
import { useInquiryListStore } from '../store/inquiryListStore'
import type { GetInquiryListResponse } from '../types'
import type { TableQueries } from '@/@types/common'

export default function useInquiryList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedCustomer,
        setSelectedCustomer,
        setSelectAllCustomer,
        setFilterData,
    } = useInquiryListStore((state) => state)


    const { data, error, isLoading, mutate } = useSWR(
        ['/api/inquiry', { ...tableData, ...filterData }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetInquiryList<GetInquiryListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )
    console.log(data,"data===")

    const inquiryList = data?.list || []


    const inquiryListTotal = data?.total || 0


    return {
        inquiryList,
        inquiryListTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        selectedCustomer,
        setSelectedCustomer,
        setSelectAllCustomer,
        setFilterData,
    }
}
