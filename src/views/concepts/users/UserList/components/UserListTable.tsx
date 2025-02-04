import { useMemo, useState, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import useUserList from '../hooks/useUserList'
import { Link, useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { confirmAlert } from "react-confirm-alert";
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { DeleteData, DeleteResponse, GetUsersListResponse, User } from '../types'
import type { TableQueries } from '@/@types/common'
import { TbPencil, TbEye, TbLock } from 'react-icons/tb';
import { AiOutlineUnlock } from 'react-icons/ai'
import { updateUserStatus, getAllUsers } from '@/services/UserService'
import { useToken } from '@/store/authStore'
import { apiGetUsersList } from '@/services/UserService'
import useSWR from 'swr'
import { useUserListStore } from '../store/userListStore'
import { KycStatus } from "../../../../../constants/enum"
import { kycStatusColors } from '@/utils/kycStatusColors'
import { statusColor } from '@/utils/accountStatusColors'
import { MdCheckCircle, MdCancel } from 'react-icons/md'
import ScrollBar from '@/components/ui/ScrollBar'
import Dialog from '@/components/ui/Dialog'
import { Button, FormItem, Input } from '@/components/ui'
import { updateKycStatus } from '@/services/KycService'
import { set } from 'lodash'




const { token } = useToken()


const someAsyncTokenFetchFunction = async (): Promise<string | null> => {
    return Promise.resolve(token);  // Wrap the token in a resolved Promise
};



const NameColumn = ({ row }: { row: User }) => {
    return (
        <div className="flex items-center">
            <Avatar size={40} shape="circle" src={row.avatar} />
            <Link
                className={`hover:text-primary ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
                to={`/concepts/users/user-details/${row._id}`}
            >
                {row.firstName}
            </Link>
        </div>
    )
}

const ActionColumn = ({
    onEdit,
    onViewDetail,
    isActive, kycStatus, onStaus,
    onToggleStatus, row
}: {
    onEdit: () => void;
    onViewDetail: () => void;
    isActive: boolean;
    kycStatus: string;
    onStaus: (status: string, row: any) => void
    onToggleStatus: () => void;
    row: any;
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
            <Tooltip title={isActive ? "Deactivate Account" : "Activate Account"}>
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onToggleStatus}
                >
                    {isActive ? <AiOutlineUnlock /> : <TbLock />}
                </div>
            </Tooltip>
            <Tooltip title="Approve">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={() => row.kycStatus === KycStatus.PENDING_REVIEW ? onStaus("APPROVED", row) : ""}

                >
                    {/* kycStatus == KycStatus.PENDING_REVIEW  */}
                    <MdCheckCircle className="text-green-500" />



                </div>
            </Tooltip>
            <Tooltip title="Reject">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={() => row.kycStatus === KycStatus.PENDING_REVIEW ? onStaus("REJECTED", row) : ""}

                >

                    <MdCancel className="text-red-500" />


                </div>
            </Tooltip>





        </div>
    );
};

const UserListTable = () => {
    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userId, setUserId] = useState("");
    const [remark, setRemark] = useState("");





    const {
        userList,
        userListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllCustomer,
        setSelectedCustomer,
        selectedCustomer,
    } = useUserList()

    const roleNameRef = useRef<HTMLInputElement>(null)





    const updateKycHandler = async () => {
        const tokenPromise = someAsyncTokenFetchFunction()
        const data = {
            id: userId,
            status: remark,
            kycRemakrs: roleNameRef?.current?.value
        }

        const resp = await updateKycStatus(data, tokenPromise)


        if (resp.success) {
            // await getAllUsers (tokenPromise)

            toast.push(
                <Notification type="success">{resp?.message}</Notification>,
                { placement: 'top-center' },
            )

            setTimeout(() => {
                window.location.reload()
            }, 200)


        } else {
            toast.push(
                <Notification type="danger">{resp?.message}</Notification>,
                { placement: 'top-center' },
            )
        }
        return resp
    }

    const {

        setFilterData,
    } = useUserListStore((state) => state)



    const handleEdit = (customer: User) => {
        navigate(`/concepts/users/user-edit/${customer._id}`)
        window.location.reload()
    }

    const handleViewDetails = (customer: User) => {
        navigate(`/concepts/users/user-details/${customer._id}`)
    }


    const handleRejectKyc = (status: string, row: any) => {
        setRemark(status)
        setUserId(row?._id)
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false)

    }

    const handleDeactivateActivate = (id: string | number, status: boolean): void => {
        const message = status
            ? "Are you sure to do Activate this user?"
            : "Are you sure to do Block this user?";

        confirmAlert({
            title: "Confirm to submit",
            message: message,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => statusAccountHandler(id, status),
                },
                {
                    label: "No",
                },
            ],
        });
    };


    const statusAccountHandler = async (id: string | number, status: boolean): Promise<DeleteResponse> => {

        try {
            const tokenPromise = someAsyncTokenFetchFunction()
            const data =
                { id, status }
            const response = await updateUserStatus(data, tokenPromise)
            if (response.success) {
                // await getAllUsers (tokenPromise)

                toast.push(
                    <Notification type="success">{response?.message}</Notification>,
                    { placement: 'top-center' },
                )

                setTimeout(() => {
                    window.location.reload()
                }, 200)


            } else {
                toast.push(
                    <Notification type="danger">{response?.message}</Notification>,
                    { placement: 'top-center' },
                )
            }
            return response
        } catch (error) {
            console.error("Error deleting about us:", error);
            throw new Error('Failed to delete');
        }
    };

    const columns: ColumnDef<User>[] = useMemo(
        () => [
            {
                header: 'First Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original;
                    return <NameColumn row={row} />;
                },
            },
            {
                header: 'Last Name',
                accessorKey: 'lastName',
            },
            {
                header: 'Email',
                accessorKey: 'email',
            },
            {
                header: 'Kyc Status',
                accessorKey: 'kycStatus',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            <Tag
                                className={(
                                    row?.kycStatus === KycStatus.NOT_SUBMITTED
                                        ? kycStatusColors[KycStatus.NOT_SUBMITTED]
                                        : row?.kycStatus === KycStatus.PENDING_REVIEW
                                            ? kycStatusColors[KycStatus.PENDING_REVIEW]
                                            : row?.kycStatus === KycStatus.APPROVED
                                                ? kycStatusColors[KycStatus.APPROVED]
                                                : row?.kycStatus === KycStatus.REJECTED
                                                    ? kycStatusColors[KycStatus.REJECTED]
                                                    : ''
                                )}

                            >
                                <span className="capitalize">
                                    {row?.kycStatus === KycStatus.NOT_SUBMITTED
                                        ? "NOT SUBMITTED"
                                        : row?.kycStatus === KycStatus.PENDING_REVIEW
                                            ? "PENDING REVIEW"
                                            : row?.kycStatus === KycStatus.APPROVED
                                                ? "APPROVED"
                                                : row?.kycStatus === KycStatus.REJECTED
                                                    ? "REJECTED"
                                                    : ''}
                                </span>
                            </Tag>
                        </div>
                    );
                },
            },
            {
                header: 'Account Status',
                accessorKey: 'status',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            <Tag
                                className={
                                    row?.isActive
                                        ? statusColor["active"]
                                        : statusColor["blocked"]
                                }
                            >
                                <span className="capitalize">
                                    {row?.isActive ? "active" : "blocked"}
                                </span>
                            </Tag>
                        </div>
                    );
                },
            },
            {
                header: 'Registration Date',
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
            {
                header: '',
                id: 'action',
                cell: (props) => {
                    const row = props.row.original;
                    const handleToggleStatus = () => {

                        if (row.isActive) {

                            handleDeactivateActivate(row._id, false);
                        } else {
                            // Activate the account
                            handleDeactivateActivate(row._id, true);
                        }
                    };

                    return (
                        <ActionColumn
                            onEdit={() => handleEdit(row)}
                            onViewDetail={() => handleViewDetails(row)}
                            isActive={row.isActive}
                            kycStatus={row.kycStatus}
                            onStaus={handleRejectKyc}
                            onToggleStatus={handleToggleStatus}
                            row={row}
                        />
                    );
                },
            },
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

    const handleRowSelect = (checked: boolean, row: User) => {
        setSelectedCustomer(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<User>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllCustomer(originalRows)
        } else {
            setSelectAllCustomer([])
        }
    }

    return (
        <>
            <DataTable
                selectable
                columns={columns}
                data={userList}
                noData={!isLoading && userList.length === 0}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={isLoading}
                pagingData={{
                    total: userListTotal,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                checkboxChecked={(row) =>
                    selectedCustomer.some((selected) => selected._id === row._id)
                }
                onPaginationChange={handlePaginationChange}
                onSelectChange={handleSelectChange}
                onSort={handleSort}
                onCheckBoxChange={handleRowSelect}
                onIndeterminateCheckBoxChange={handleAllRowSelect}
            />

            <Dialog
                isOpen={isModalOpen}
                width={500}
                onClose={handleClose}
                onRequestClose={handleClose}
            >
                <h4>Reasons</h4>
                <ScrollBar className="mt-6 max-h-[600px] overflow-y-auto">
                    <div className="px-4">

                        <>
                            <FormItem label="Remarks">
                                <Input ref={roleNameRef} />
                            </FormItem>

                        </>


                        <div className="flex justify-end mt-6">
                            <Button
                                className="ltr:mr-2 rtl:ml-2"
                                variant="plain"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="solid"
                                onClick={
                                    () => updateKycHandler()
                                }
                            >
                                save
                            </Button>
                        </div>
                    </div>
                </ScrollBar>
            </Dialog>
        </>
    )
}

export default UserListTable
