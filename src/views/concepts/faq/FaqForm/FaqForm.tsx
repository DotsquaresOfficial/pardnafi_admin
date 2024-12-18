import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import OverviewSection from './OverviewSection'
// import AddressSection from './AddressSection'

import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import type { FaqFormSchema } from './types'

type CustomerFormProps = {
    onFormSubmit: (values: FaqFormSchema) => void
    defaultValues?: FaqFormSchema
    newFaq?: boolean
} & CommonProps

const validationSchema: ZodType<FaqFormSchema> = z.object({
    question: z.string().min(1, { message: 'Question name required' }),
    answer: z.string().min(1, { message: 'Answer name required' }),
    // email: z
    //     .string()
    //     .min(1, { message: 'Email required' })
    //     .email({ message: 'Invalid email' }),
    // dialCode: z.string().min(1, { message: 'Please select your country code' }),
    // phoneNumber: z
    //     .string()
    //     .min(1, { message: 'Please input your mobile number' }),
    // country: z.string().min(1, { message: 'Please select a country' }),
    // address: z.string().min(1, { message: 'Addrress required' }),
    // postcode: z.string().min(1, { message: 'Postcode required' }),
    // city: z.string().min(1, { message: 'City required' }),
    // img: z.string(),
    // tags: z.array(z.object({ value: z.string(), label: z.string() })),
})

const FaqForm = (props: CustomerFormProps) => {
    const {
        onFormSubmit,
        defaultValues = {},
        newFaq = false,
        children,
    } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<FaqFormSchema>({
        // defaultValues: {
        //     ...{
        //         banAccount: false,
        //         accountVerified: true,
        //     },
        //     ...defaultValues,
        // },
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: FaqFormSchema) => {
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
                        {/* <AddressSection control={control} errors={errors} /> */}
                    </div>
                    <div className="md:w-[370px] gap-4 flex flex-col">
                        {/* <ProfileImageSection
                            control={control}
                            errors={errors}
                        />
                        <TagsSection control={control} errors={errors} /> */}
                        {/* {!newFaq && (
                            <AccountSection control={control} errors={errors} />
                        )} */}
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default FaqForm