import { apiGetKycList } from '@/services/KycService'
import useSWR from 'swr'
import { useKycListStore } from '../store/kycListStore'
import type {  GetKycListResponse } from '../types'
import type { TableQueries } from '@/@types/common'

export default function useUserList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedCustomer,
        setSelectedCustomer,
        setSelectAllCustomer,
        setFilterData,
    } = useKycListStore((state:any) => state)


    const { data, error, isLoading, mutate } = useSWR(
        ['/api/kyc', { ...tableData, ...filterData }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetKycList<GetKycListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const kycList = data?.users || []

    const kycListTotal = data?.total || 0


    return {
        kycList,
        kycListTotal,
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
