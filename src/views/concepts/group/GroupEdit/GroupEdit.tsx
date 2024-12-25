import { useState,useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form';
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { apiGetGroup, updateGroups } from '@/services/GroupService'
import GroupForm from '../GroupForm'
import sleep from '@/utils/sleep'
import NoUserFound from '@/assets/svg/NoUserFound'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useParams, useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import type { GroupFormSchema } from '../GroupForm'
import type { Group } from '../GroupList/types'
import { useToken } from '@/store/authStore'
const GroupEdit = () => {
    const { id } = useParams()
    console.log(id,"gggg")


    const navigate = useNavigate()

    // const { data, isLoading } = useSWR(
    //     [`/user/get-user-by-id${id}`, { id: id as string }],
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //     ([_, params]) => apiGetUser<User, { id: string }>(params),
    //     {
    //         revalidateOnFocus: false,
    //         revalidateIfStale: false,
    //     },
    // )
    const { setValue } = useForm({
        defaultValues: {
            avatar: "",
        },
    });


    const { data, isLoading, error } = useSWR(
        id ? [`/group/get-group-by-id/${id}`, { id: id as string }] : null,
        ([url, params]) => apiGetGroup<Group, { id: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        }
    );

  

    useEffect(() => {
     console.log("calklll")
        getDefaultValues()
     
    }, [id])
    


    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const { token } = useToken()


    const someAsyncTokenFetchFunction = async (): Promise<string | null> => {
        return Promise.resolve(token);  // Wrap the token in a resolved Promise
    };




    const handleFormSubmit = async (values: GroupFormSchema) => {
        const groupImage
            = localStorage.getItem("groupImage")

        setIsSubmiting(true)
        await sleep(800)
        const tokenPromise = someAsyncTokenFetchFunction()
        const resp = await updateGroups({
            ...values, groupImage
            , id
        }, tokenPromise)
        if (resp?.success) {
            setIsSubmiting(false)
            toast.push(
                <Notification type="success">{resp?.message}</Notification>,
                { placement: 'top-center' },
            )
            navigate('/concepts/group/group-list')
            localStorage.removeItem("groupImage")

        } else {
            toast.push(
                <Notification type="danger">{resp?.message}</Notification>,
                { placement: 'top-center' },
            )
        }

    }

    const getDefaultValues = () => {
        console.log(data?.data,"data?.data===")
        if (data?.data) {
            const { groupName, description, groupImage } = data?.data

            return {
                groupName,
                description,
                groupImage,

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
                    <GroupForm
                        defaultValues={getDefaultValues() as GroupFormSchema}
                        newGroup={false}
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
                    </GroupForm>
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

export default GroupEdit
