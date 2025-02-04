import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { apiGetUser, updateUsers } from '@/services/UserService'
import UserForm from '../UserForm'
import sleep from '@/utils/sleep'
import NoUserFound from '@/assets/svg/NoUserFound'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useParams, useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import type { UserFormSchema } from '../UserForm'
import type { User, UsersResponse } from '../UserList/types'
import { useToken } from '@/store/authStore'
const UserEdit = () => {
    const { id } = useParams()


    const navigate = useNavigate()

  
    const { setValue } = useForm({
        defaultValues: {
            avatar: "", // default value for avatar field
        },
    });
 

    const { data, isLoading, error } = useSWR(
        id ? [`/user/get-user-by-id/${id}`, { id: id as string }] : null,
        ([url, params]) => apiGetUser<UsersResponse, { id: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        }
    );
   

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const { token } = useToken()


    const someAsyncTokenFetchFunction = async (): Promise<string | null> => {
        return Promise.resolve(token);  // Wrap the token in a resolved Promise
    };




    const handleFormSubmit = async (values: UserFormSchema) => {

        const avatar = localStorage.getItem("avatar")

        setIsSubmiting(true)
        await sleep(800)
        const tokenPromise = someAsyncTokenFetchFunction()
        const resp = await updateUsers({ ...values, avatar, id }, tokenPromise)
        if (resp?.success) {
            setIsSubmiting(false)
            toast.push(
                <Notification type="success">{resp?.message}</Notification>,
                { placement: 'top-center' },
            )
            navigate('/concepts/users/user-list')

        } else {
            toast.push(
                <Notification type="danger">{resp?.message}</Notification>,
                { placement: 'top-center' },
            )
        }

    }

    const getDefaultValues = () => {
        if (data?.data?.user_details) {
            const { firstName, lastName, address, email, phoneNumber, avatar } = data?.data?.user_details

            return {
                firstName,
                lastName,
                avatar, address, phoneNumber: phoneNumber != null ? phoneNumber.toString() : "", email

            }
        }

        return {}
    }

    const handleConfirmDelete = () => {
        setDeleteConfirmationOpen(true)
        toast.push(
            <Notification type="success">User deleted!</Notification>,
            { placement: 'top-center' },
        )
        navigate('')
    }

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleBack = () => {
        history.back()
    }

    return (
        <>
            {!isLoading && !data && (
                <div className="h-full flex flex-col items-center justify-center">
                    <NoUserFound height={280} width={280} />
                    <h3 className="mt-8">No user found!</h3>
                </div>
            )}
            {!isLoading && data && (
                <>
                    <UserForm
                        defaultValues={getDefaultValues() as UserFormSchema}
                        newUser={false}
                        onFormSubmit={handleFormSubmit}
                    >
                        <Container>
                            <div className="flex items-center justify-between px-8">
                                <Button
                                    className="ltr:mr-3 rtl:ml-3"
                                    type="button"
                                    variant="plain"
                                    icon={<TbArrowNarrowLeft />}
                                    onClick={handleBack}
                                >
                                    Back
                                </Button>
                                <div className="flex items-center">
                                    <Button
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        customColorClass={() =>
                                            'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                        }
                                        icon={<TbTrash />}
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="solid"
                                        type="submit"
                                        loading={isSubmiting}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </Container>
                    </UserForm>
                    <ConfirmDialog
                        isOpen={deleteConfirmationOpen}
                        type="danger"
                        title="Remove users"
                        onClose={handleCancel}
                        onRequestClose={handleCancel}
                        onCancel={handleCancel}
                        onConfirm={handleConfirmDelete}
                    >
                        <p>
                            Are you sure you want to remove this user? This
                            action can&apos;t be undo.{' '}
                        </p>
                    </ConfirmDialog>
                </>
            )}
        </>
    )
}

export default UserEdit
