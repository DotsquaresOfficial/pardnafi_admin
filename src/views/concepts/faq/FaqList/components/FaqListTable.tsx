import { useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import useFaqList from '../hooks/useFaqList'
import { Link, useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { TbPencil, TbEye, TbTrash } from 'react-icons/tb'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Faq, GetFaqListResponse } from '../types'
import type { TableQueries } from '@/@types/common'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { removeFaq, apiGetFaqList } from '@/services/FaqServices'
import { useToken } from '@/store/authStore'
import { useFaqListStore } from '../store/faqListStore'
import useSWR from 'swr'
import sleep from '@/utils/sleep'
const statusColor: Record<string, string> = {
    active: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    blocked: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
}

const NameColumn = ({ row }: { row: Faq }) => {
    return (
        <div className="flex items-center">
            {/* <Avatar size={40} shape="circle" src={row.img} /> */}
            <Link
                className={`hover:text-primary ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
                to={`/concepts/faq/faq-details/${row._id}`}
            >
                {row.question}
            </Link>
        </div>
    )
}



const ActionColumn = ({
    onEdit,
    onDelete,
}: {
    onEdit: () => void;
    onDelete: () => void;
}) => {
    return (
        <div className="flex items-center gap-3">
            <Tooltip title="Edit">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onEdit}
                >
                    <TbPencil />
                </div>
            </Tooltip>

            <Tooltip title="Delete">
                <div
                    className="text-xl cursor-pointer select-none font-semibold"
                    role="button"
                    onClick={onDelete}
                >
                    <TbTrash />
                </div>
            </Tooltip>
        </div>
    );
};

const FaqListTable = () => {
    const navigate = useNavigate()
    const {
        filterData,
    } = useFaqListStore((state) => state)
    const {
        faqList,
        faqListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllCustomer,
        setSelectedCustomer,
        selectedCustomer,
    } = useFaqList()


    const { token } = useToken()


    const someAsyncTokenFetchFunction = async (): Promise<string | null> => {
        return Promise.resolve(token);  // Wrap the token in a resolved Promise
    };

    const handleDelete = async (faq: Faq) => {
        try {
            const data = { id: faq._id }
            const tokenPromise = someAsyncTokenFetchFunction()
            const resp = await removeFaq(data, tokenPromise);
            if (resp?.success) {

                toast.push(
                    <Notification type="success">{resp?.message}</Notification>,
                    { placement: 'top-center' },
                )
                await sleep(200)
                window.location.reload()

            } else {
                toast.push(
                    <Notification type="danger">{resp?.message}</Notification>,
                    { placement: 'top-center' },
                )
            }



            // setTableData((prevData) => {
            //     const updatedFaqList = prevData.data.filter((item: Faq) => item._id !== faq._id);
            //     return { ...prevData, data: updatedFaqList };
            // });
        } catch (error) {
            toast.push(
                <Notification type="danger">{error + "err"}</Notification>,
                { placement: 'top-center' },
            )

        }
    };
    const handleEdit = (customer: Faq) => {
        navigate(`/concepts/faq/faq-edit/${customer?._id}`)
    }

    const handleViewDetails = (customer: Faq) => {
        navigate(`/concepts/faq/faq-details/${customer._id}`)
    }

    const columns: ColumnDef<Faq>[] = useMemo(
        () => [
            {
                header: 'question',
                accessorKey: 'question',

            },
            // {
            //     header: 'question',
            //     accessorKey: 'name',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return <NameColumn row={row} />
            //     },
            // },
            {
                header: 'Answer',
                accessorKey: 'answer',
            },

            {
                header: 'Action',
                id: 'action',
                cell: (props) => (
                    <ActionColumn
                        onEdit={() => handleEdit(props.row.original)}
                        onDelete={() => handleDelete(props.row.original)}
                    />

                ),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedCustomer.length > 0) {
            setSelectAllCustomer([])
        }
    }

    const handlePaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        handleSetTableData(newTableData)
    }

    const handleSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        handleSetTableData(newTableData)
    }

    const handleSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        handleSetTableData(newTableData)
    }

    const handleRowSelect = (checked: boolean, row: Faq) => {
        setSelectedCustomer(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Faq>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllCustomer(originalRows)
        } else {
            setSelectAllCustomer([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={faqList}
            noData={!isLoading && faqList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: faqListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            // checkboxChecked={(row) =>
            //     selectedCustomer.some((selected) => selected.id === row.id)
            // }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
        // onCheckBoxChange={handleRowSelect}
        // onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default FaqListTable
