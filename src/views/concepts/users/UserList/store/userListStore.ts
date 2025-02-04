import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { User, Filter } from '../types'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

console.log(initialTableData,"initialTableData====")

export const initialFilterData = {
    purchasedProducts: '',
    purchaseChannel: [
        'APPROVED',
        'REJECTED',
        'PENDING_REVIEW',
        'NOT_SUBMITTED',
    
    ],
}

console.log(initialFilterData,"initialFilterData====")

export type CustomersListState = {
    tableData: TableQueries
    filterData: Filter
    selectedCustomer: Partial<User>[]
}

type CustomersListAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
    setSelectedCustomer: (checked: boolean, customer: User) => void
    setSelectAllCustomer: (customer: User[]) => void
}

const initialState: CustomersListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedCustomer: [],
}

console.log(initialState,"initialState===")
export const useUserListStore = create<
    CustomersListState & CustomersListAction
>((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedCustomer: (checked, row) =>
        set((state) => {
            const prevData = state.selectedCustomer
            if (checked) {
                return { selectedCustomer: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some((prevCustomer) => row._id === prevCustomer._id)
                ) {
                    return {
                        selectedCustomer: prevData.filter(
                            (prevCustomer) => prevCustomer._id !== row._id,
                        ),
                    }
                }
                return { selectedCustomer: prevData }
            }
        }),
    setSelectAllCustomer: (row) => set(() => ({ selectedCustomer: row })),
}))

console.log(useUserListStore,"useUserListStore0000")
