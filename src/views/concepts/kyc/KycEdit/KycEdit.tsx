import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { apiGetKyc, updateKyc } from '@/services/kycService'
import KycForm from '../KycForm'
import sleep from '@/utils/sleep'
import NoUserFound from '@/assets/svg/NoUserFound'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useParams, useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import type { KycFormSchema } from '../KycForm'
import type { Kyc } from '../KycList/types'
import { useToken } from '@/store/authStore'
const KycEdit = () => {
    const { id } = useParams()


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
            avatar: "", // default value for avatar field
        },
    });


    const { data, isLoading, error } = useSWR(
        id ? [`/kyc/get-kyc-by-id/${id}`, { id: id as string }] : null,
        ([url, params]) => apiGetKyc<Kyc, { id: string }>(params),
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




    const handleFormSubmit = async (values: KycFormSchema) => {

        const avatar = localStorage.getItem("avatar")

        setIsSubmiting(true)
        await sleep(800)
        const tokenPromise = someAsyncTokenFetchFunction()
        const resp = await updateKyc({ ...values, avatar, id }, tokenPromise)
        if (resp?.success) {
            setIsSubmiting(false)
            toast.push(
                <Notification type="success">{resp?.message}</Notification>,
                { placement: 'top-center' },
            )
            navigate('/concepts/kyc/kyc-list')

        } else {
            toast.push(
                <Notification type="danger">{resp?.message}</Notification>,
                { placement: 'top-center' },
            )
        }

    }

    const getDefaultValues = () => {
        // if (data?.data) {
        //     const { firstName, lastName, address, email, phoneNumber, avatar } = data?.data

        //     return {
        //         firstName,
        //         lastName,
        //         avatar, address, phoneNumber: phoneNumber != null ? phoneNumber.toString() : "", email

        //     }
        // }

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
                    <KycForm
                        defaultValues={getDefaultValues() as KycFormSchema}
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
                    </KycForm>
                    <ConfirmDialog
                        isOpen={deleteConfirmationOpen}
                        type="danger"
                        title="Remove kyc"
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

export default KycEdit