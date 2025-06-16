import {
    forwardRef,
    useMemo,
    useRef,
    useEffect,
    useState,
    useImperativeHandle,
} from 'react'
import classNames from 'classnames'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import Select from '@/components/ui/Select'
import Checkbox from '@/components/ui/Checkbox'
import TableRowSkeleton from './loaders/TableRowSkeleton'
import Loading from './Loading'
import FileNotFound from '@/assets/svg/FileNotFound'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
    ColumnDef,
    ColumnSort,
    Row,
    CellContext,
} from '@tanstack/react-table'
import type { TableProps } from '@/components/ui/Table'
import type { SkeletonProps } from '@/components/ui/Skeleton'
import type { ForwardedRef, ChangeEvent, ReactNode } from 'react'
import type { CheckboxProps } from '@/components/ui/Checkbox'

export type OnSortParam = { order: 'asc' | 'desc' | ''; key: string | number }

type DataTableProps<T> = {
    columns: ColumnDef<T>[]
    customNoDataIcon?: ReactNode
    data?: T[]
    loading?: boolean
    noData?: boolean
    onCheckBoxChange?: (checked: boolean, row: T) => void
    onIndeterminateCheckBoxChange?: (checked: boolean, rows: Row<T>[]) => void
    onPaginationChange?: (page: number) => void
    onSelectChange?: (num: number) => void
    onSort?: (sort: OnSortParam) => void
    pageSizes?: number[]
    selectable?: boolean
    skeletonAvatarColumns?: number[]
    skeletonAvatarProps?: SkeletonProps
    pagingData?: {
        total: number
        pageIndex: number
        pageSize: number
    }
    checkboxChecked?: (row: T) => boolean
    indeterminateCheckboxChecked?: (row: Row<T>[]) => boolean
} & TableProps

type CheckBoxChangeEvent = ChangeEvent<HTMLInputElement>

interface IndeterminateCheckboxProps extends Omit<CheckboxProps, 'onChange'> {
    onChange: (event: CheckBoxChangeEvent) => void
    indeterminate: boolean
    onCheckBoxChange?: (event: CheckBoxChangeEvent) => void
    onIndeterminateCheckBoxChange?: (event: CheckBoxChangeEvent) => void
}

const { Tr, Th, Td, THead, TBody, Sorter } = Table

const IndeterminateCheckbox = (props: IndeterminateCheckboxProps) => {
    const {
        indeterminate,
        onChange,
        onCheckBoxChange,
        onIndeterminateCheckBoxChange,
        ...rest
    } = props

    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (typeof indeterminate === 'boolean' && ref.current) {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
    }, [ref, indeterminate])

    const handleChange = (e: CheckBoxChangeEvent) => {
        onChange(e)
        onCheckBoxChange?.(e)
        onIndeterminateCheckBoxChange?.(e)
    }

    return (
        <Checkbox
            ref={ref}
            className="mb-0"
            onChange={(_, e) => handleChange(e)}
            {...rest}
        />
    )
}

export type DataTableResetHandle = {
    resetSorting: () => void
    resetSelected: () => void
}

const DataTableComponent = <T,>(
    props: DataTableProps<T>,
    ref: ForwardedRef<DataTableResetHandle>
) => {
    const {
        skeletonAvatarColumns,
        columns: columnsProp = [],
        data = [],
        customNoDataIcon,
        loading,
        noData,
        onCheckBoxChange,
        onIndeterminateCheckBoxChange,
        onPaginationChange,
        onSelectChange,
        onSort,
        pageSizes = [10, 25, 50, 100],
        selectable = false,
        skeletonAvatarProps,
        pagingData = {
            total: data.length,
            pageIndex: 1,
            pageSize: 10,
        },
        checkboxChecked,
        indeterminateCheckboxChecked,
        ...rest
    } = props

    const isControlledPagination = !!pagingData
    const isControlledSorting = !!onSort

    const [internalPagination, setInternalPagination] = useState({
        pageIndex: (pagingData.pageIndex || 1) - 1,
        pageSize: pagingData.pageSize || 10,
    })

    const [sorting, setSorting] = useState<ColumnSort[]>([])

    const pageSizeOption = useMemo(
        () => pageSizes.map((number) => ({
            value: number,
            label: `${number} / page`,
        })),
        [pageSizes],
    )

    useEffect(() => {
        if (isControlledSorting && sorting.length > 0) {
            const sortOrder = sorting[0].desc ? 'desc' : 'asc'
            const id = sorting[0].id
            onSort?.({ order: sortOrder, key: id })
        }
    }, [sorting, isControlledSorting, onSort])

    const finalColumns: ColumnDef<T>[] = useMemo(() => {
        if (selectable) {
            return [
                {
                    id: 'select',
                    maxSize: 50,
                    header: ({ table }) => (
                        <IndeterminateCheckbox
                            checked={
                                indeterminateCheckboxChecked
                                    ? indeterminateCheckboxChecked(table.getRowModel().rows)
                                    : table.getIsAllRowsSelected()
                            }
                            indeterminate={table.getIsSomeRowsSelected()}
                            onChange={table.getToggleAllRowsSelectedHandler()}
                            onIndeterminateCheckBoxChange={(e) => {
                                onIndeterminateCheckBoxChange?.(
                                    e.target.checked,
                                    table.getRowModel().rows
                                )
                            }}
                        />
                    ),
                    cell: ({ row }) => (
                        <IndeterminateCheckbox
                            checked={
                                checkboxChecked
                                    ? checkboxChecked(row.original)
                                    : row.getIsSelected()
                            }
                            disabled={!row.getCanSelect()}
                            indeterminate={row.getIsSomeSelected()}
                            onChange={row.getToggleSelectedHandler()}
                            onCheckBoxChange={(e) =>
                                onCheckBoxChange?.(e.target.checked, row.original)
                            }
                        />
                    ),
                },
                ...columnsProp,
            ]
        }
        return columnsProp
    }, [columnsProp, selectable, checkboxChecked, indeterminateCheckboxChecked,
        onCheckBoxChange, onIndeterminateCheckBoxChange])

    const table = useReactTable({
        data,
        columns: finalColumns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: isControlledPagination,
        manualSorting: isControlledSorting,
        onPaginationChange: isControlledPagination ? undefined : (updater) => {
            if (typeof updater === 'function') {
                setInternalPagination(prev => {
                    const newValue = updater(prev)
                    table.setPageSize(newValue.pageSize)
                    table.setPageIndex(newValue.pageIndex)
                    return newValue
                })
            }
        },
        onSortingChange: setSorting,
        state: {
            pagination: isControlledPagination 
                ? {
                    pageIndex: (pagingData.pageIndex || 1) - 1,
                    pageSize: pagingData.pageSize || 10,
                }
                : internalPagination,
            sorting,
        },
        pageCount: isControlledPagination 
            ? Math.ceil((pagingData.total || 0) / (pagingData.pageSize || 10))
            : undefined,
    })

    const resetSorting = () => {
        setSorting([])
    }

    const resetSelected = () => {
        table.resetRowSelection()
    }

    useImperativeHandle(ref, () => ({
        resetSorting,
        resetSelected,
    }))

    const handlePaginationChange = (page: number) => {
        if (loading) return
        
        const zeroBasedPage = page - 1
        
        if (isControlledPagination) {
            onPaginationChange?.(page)
        } else {
            setInternalPagination(prev => ({
                ...prev,
                pageIndex: zeroBasedPage
            }))
        }
    }

    const handleSelectChange = (value?: number) => {
        if (loading || !value) return
        
        if (isControlledPagination) {
            onSelectChange?.(value)
        } else {
            setInternalPagination({
                pageIndex: 0,
                pageSize: value
            })
        }
    }

    const currentPageIndex = isControlledPagination 
        ? pagingData.pageIndex || 1
        : internalPagination.pageIndex + 1
        
    const currentPageSize = isControlledPagination 
        ? pagingData.pageSize || 10
        : internalPagination.pageSize
        
    const total = isControlledPagination 
        ? pagingData.total || 0
        : data.length


    return (
        <Loading loading={Boolean(loading && data.length !== 0)} type="cover">
            <Table {...rest}>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <Th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder ? null : (
                                        <div
                                            className={classNames(
                                                header.column.getCanSort() && 
                                                'cursor-pointer select-none',
                                                loading && 'pointer-events-none'
                                            )}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {header.column.getCanSort() && (
                                                <Sorter sort={header.column.getIsSorted()} />
                                            )}
                                        </div>
                                    )}
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </THead>
                
                {loading && data.length === 0 ? (
                    <TableRowSkeleton
                        columns={finalColumns.length}
                        rows={currentPageSize}
                        avatarInColumns={skeletonAvatarColumns}
                        avatarProps={skeletonAvatarProps}
                    />
                ) : (
                    <TBody>
                        {noData ? (
                            <Tr>
                                <Td className="hover:bg-transparent" colSpan={finalColumns.length}>
                                    <div className="flex flex-col items-center gap-4">
                                        {customNoDataIcon || (
                                            <>
                                                <FileNotFound />
                                                <span className="font-semibold">
                                                    No data found!
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </Td>
                            </Tr>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <Td
                                            key={cell.id}
                                            style={{ width: cell.column.getSize() }}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </Td>
                                    ))}
                                </Tr>
                            ))
                        )}
                    </TBody>
                )}
            </Table>

            <div className="flex items-center justify-between mt-4">
                <Pagination
                    pageSize={currentPageSize}
                    currentPage={currentPageIndex}
                    total={total}
                    onChange={handlePaginationChange}
                />
                <div style={{ minWidth: 130 }}>
                    <Select
                        size="sm"
                        menuPlacement="top"
                        isSearchable={false}
                        value={pageSizeOption.find(
                            (option) => option.value === currentPageSize
                        )}
                        options={pageSizeOption}
                        onChange={(option) => handleSelectChange(option?.value)}
                    />
                </div>
            </div>
        </Loading>
    )
}

export const DataTable = forwardRef(DataTableComponent) as <T>(
    props: DataTableProps<T> & {
        ref?: ForwardedRef<DataTableResetHandle>
    },
) => ReturnType<typeof DataTableComponent>

export type { ColumnDef, Row, CellContext }
export default DataTable