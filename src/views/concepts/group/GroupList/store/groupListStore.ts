import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { Group, Filter } from '../types'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData = {
    purchasedProducts: '',
    purchaseChannel: [
        'Retail Stores',
        'Online Retailers',
        'Resellers',
        'Mobile Apps',
        'Direct Sales',
    ],
}

export type CustomersListState = {
    tableData: TableQueries
    filterData: Filter
    selectedCustomer: Partial<Group>[]
}

type CustomersListAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
    setSelectedCustomer: (checked: boolean, customer: Group) => void
    setSelectAllCustomer: (customer: Group[]) => void
}

const initialState: CustomersListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedCustomer: [],
}

export const useGroupListStore = create<
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
