import { apiGetGroupList } from '@/services/GroupService'
import useSWR from 'swr'
import { useGroupListStore } from '../store/groupListStore'
import type {  GetGroupListResponse } from '../types'
import type { TableQueries } from '@/@types/common'

export default function useGroupList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedCustomer,
        setSelectedCustomer,
        setSelectAllCustomer,
        setFilterData,
    } = useGroupListStore((state) => state)


    const { data, error, isLoading, mutate } = useSWR(
        ['/api/group', { ...tableData, ...filterData }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetGroupList<GetGroupListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const groupList = data?.data || []

    const userListTotal = data?.total || 0


    return {
        groupList,
        userListTotal,
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
