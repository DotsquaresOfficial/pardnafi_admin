import { apiGetContactUsList } from '@/services/InquiryService'
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
            apiGetContactUsList<GetInquiryListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )
    console.log(data,"data===")

    const inquiryList = data?.tickets || []


    const inquiryListTotal = data?.tickets?.length || 0

    console.log(inquiryListTotal,"inquiryListTotal")
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
