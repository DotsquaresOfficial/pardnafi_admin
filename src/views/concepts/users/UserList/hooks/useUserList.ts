import { apiGetUsersList } from '@/services/UserService'
import useSWR from 'swr'
import { useUserListStore } from '../store/userListStore'
import type {  GetUsersListResponse } from '../types'
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
    } = useUserListStore((state) => state)


    const { data, error, isLoading, mutate } = useSWR(
        ['/api/users', { ...tableData, ...filterData }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetUsersList<GetUsersListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const userList = data?.users || []

    const userListTotal = data?.users?.length || 0
   


    return {
        userList,
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
