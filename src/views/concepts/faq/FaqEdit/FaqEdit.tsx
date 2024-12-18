import { useEffect, useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { apiGetFaq, faqUpdate } from '@/services/FaqServices'
import FaqForm from '../FaqForm'
import sleep from '@/utils/sleep'
import NoUserFound from '@/assets/svg/NoUserFound'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useParams, useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import type { FaqFormSchema } from '../FaqForm'
import type { Faq } from '../FaqList/types'
import { useToken } from '@/store/authStore'
const FaqEdit = () => {
    const { id } = useParams()


    const navigate = useNavigate()

    const { data, isLoading } = useSWR(
        [`/faqs/get-one${id}`, { id: id as string }],

        ([_, params]) => apiGetFaq<Faq, { id: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },

    )





    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)
    const { token } = useToken()


    const someAsyncTokenFetchFunction = async (): Promise<string | null> => {
        return Promise.resolve(token);  // Wrap the token in a resolved Promise
    };

    const handleFormSubmit = async (values: FaqFormSchema) => {

        setIsSubmiting(true)
        await sleep(800)
        const tokenPromise = someAsyncTokenFetchFunction()
        const resp = await faqUpdate({ ...values, id }, tokenPromise)
        if (resp?.success) {
            setIsSubmiting(false)
            toast.push(
                <Notification type="success">{resp?.message}</Notification>,
                { placement: 'top-center' },
            )
            navigate('/concepts/faq/faq-list')

        } else {
            toast.push(
                <Notification type="danger">{resp?.message}</Notification>,
                { placement: 'top-center' },
            )
        }

    }

    const getDefaultValues = () => {
        if (data?.data) {
            const { question, answer, _id } = data.data;
            return {
                _id,
                question,
                answer,
            };
        }

        return {}; 
    };

    const handleConfirmDelete = () => {
        setDeleteConfirmationOpen(true)
        toast.push(
            <Notification type="success">Faq deleted!</Notification>,
            { placement: 'top-center' },
        )
        navigate('/concepts/faq/faq-list')
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
                    <FaqForm
                        defaultValues={getDefaultValues() as FaqFormSchema}
                        newFaq={false}
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
                    </FaqForm>
                    <ConfirmDialog
                        isOpen={deleteConfirmationOpen}
                        type="danger"
                        title="Remove faq"
                        onClose={handleCancel}
                        onRequestClose={handleCancel}
                        onCancel={handleCancel}
                        onConfirm={handleConfirmDelete}
                    >
                        <p>
                            Are you sure you want to remove this faq? This
                            action can&apos;t be undo.{' '}
                        </p>
                    </ConfirmDialog>
                </>
            )}
        </>
    )
}

export default FaqEdit
