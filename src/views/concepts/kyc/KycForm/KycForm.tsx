import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import OverviewSection from './OverviewSection'

import ProfileImageSection from './ProfileImageSection'

import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { number, z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import type { KycFormSchema } from './types'

type CustomerFormProps = {
    onFormSubmit: (values: KycFormSchema) => void
    defaultValues?: KycFormSchema
    newUser?: boolean
} & CommonProps

const validationSchema: ZodType<KycFormSchema> = z.object({
    firstName: z.string().min(1, { message: 'First name required' }),
    lastName: z.string().min(1, { message: 'Last name required' }),
    address: z.string().min(1, { message: 'Addrress required' }),

    phoneNumber: z
        .string()
        .min(10, { message: 'Phone number must be at least 10 digits' })
        .regex(/^\d+$/, { message: 'Phone number must contain only digits' }) // Validate phone number is digits only
    ,

})

const KycForm = (props: CustomerFormProps) => {
    const {
        onFormSubmit,
        defaultValues = {},
        newUser = false,
        children,
    } = props

    const {
        handleSubmit,
        reset, setValue: any,
        formState: { errors },
        control,
    } = useForm<KycFormSchema>({

        defaultValues: {
            ...{
                banAccount: false,
                accountVerified: true,
            },
            ...defaultValues,
        },

        resolver: zodResolver(validationSchema),
    })


    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }

    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: KycFormSchema) => {


        onFormSubmit?.(values)
    }

    return (
        <Form
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="gap-4 flex flex-col flex-auto">
                        <OverviewSection control={control} errors={errors} />

                    </div>

                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default KycForm
