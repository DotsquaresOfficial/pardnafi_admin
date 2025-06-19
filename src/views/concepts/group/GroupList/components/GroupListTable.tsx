import { useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import useGroupList from '../hooks/useGroupList'
import { Link, useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { confirmAlert } from "react-confirm-alert";
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { DeleteData, DeleteResponse, GetGroupListResponse, Group, GroupData } from '../types'
import type { TableQueries } from '@/@types/common'
import { TbPencil, TbEye, TbLock } from 'react-icons/tb';
import { AiOutlineUnlock } from 'react-icons/ai'
import { getAllGroup } from '@/services/GroupService'
import { useToken } from '@/store/authStore'
import { apiGetGroupList } from '@/services/GroupService'
import useSWR from 'swr'
import { useGroupListStore } from '../store/groupListStore'
const statusColor: Record<string, string> = {
    active: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    blocked: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
}



const { token } = useToken()


const someAsyncTokenFetchFunction = async (): Promise<string | null> => {
    return Promise.resolve(token);  // Wrap the token in a resolved Promise
};



const NameColumn = ({ row }: { row: any }) => {
    return (
        <div className="flex items-center">
            <Avatar size={40} shape="circle" src={row.groupImage} />
            <Link
                className={`hover:text-primary ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
                to={`/concepts/group/group-list`}
            >
                {row.groupName}
            </Link>
        </div>
    )
}

const ActionColumn = ({
    onEdit,
    onViewDetail,
    isActive,
    // onToggleStatus
}: {
    onEdit: () => void;
    onViewDetail: () => void;
    isActive: boolean;
    // onToggleStatus: () => void;
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
            <Tooltip title="View">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onViewDetail}
                >
                    <TbEye />
                </div>
            </Tooltip>

        </div>
    );
};

const UserListTable = () => {
    const navigate = useNavigate()

    const {
        groupList,
        userListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllCustomer,
        setSelectedCustomer,
        selectedCustomer,
    } = useGroupList()



    const {

        setFilterData,
    } = useGroupListStore((state) => state)



    const handleEdit = (customer: Group) => {
        navigate(`/concepts/group/group-edit/${customer._id}`)
        window.location.reload()
    }

    const handleViewDetails = (customer: Group) => {
        navigate(`/concepts/group/group-details/${customer._id}`)
    }


    const columns: ColumnDef<Group>[] = useMemo(
        () => [
            {
                header: 'Group Name',
                accessorKey: 'groupName',
                cell: (props) => {
                    const row = props.row.original;
                    return <NameColumn row={row} />;
                },
            },
            {
                header: 'Description',
                accessorKey: 'description'
            },
            {
                header: 'Owner Address',
                accessorKey: 'owner',
            },


            {
                header: 'Group Size',
                accessorKey: 'groupSize',
            },
            {
                header: 'Transaction Hash',
                accessorKey: 'txHash',
            },

            {
                header: 'Created Date',
                accessorKey: 'createdAt',
                cell: (props: any) => {
                    const date = new Date(props.row.original.createdAt);
                    const formattedDate = date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    });
                    return <span>{formattedDate}</span>;
                },
            },
            // {
            //     header: '',
            //     id: 'action',
            //     cell: (props) => {
            //         const row = props.row.original;
            //         const handleToggleStatus = () => {

            //             // if (row.isActive) {

            //             //     handleDeactivateActivate(row._id, false);
            //             // } else {
            //             //     // Activate the account
            //             //     handleDeactivateActivate(row._id, true);
            //             // }
            //         };

            //         return (
            //             <ActionColumn
            //                 onEdit={() => handleEdit(row)}
            //                 onViewDetail={() => handleViewDetails(row)}
            //                 isActive={row.isActive}
            //             // onToggleStatus={handleToggleStatus}
            //             />
            //         );
            //     },
            // },
        ],
        [] // Add dependencies as needed
    );

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

    const handleRowSelect = (checked: boolean, row: Group) => {
        setSelectedCustomer(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Group>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllCustomer(originalRows)
        } else {
            setSelectAllCustomer([])
        }
    }
    const paginatedData = (list: any[], page: number, pageSize: number) => {
        const start = (page - 1) * pageSize;
        const end = page * pageSize;
        return list.slice(start, end);
    };

    return (
        <DataTable
            selectable
            columns={columns}
            data={paginatedData(groupList, tableData?.pageIndex as number, tableData?.pageSize as number)}
            // data={groupList}
            noData={!isLoading && groupList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: userListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedCustomer.some((selected: any) => selected._id === row._id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default UserListTable
