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
import type { GroupFormSchema } from './types'

type CustomerFormProps = {
    onFormSubmit: (values: GroupFormSchema) => void
    defaultValues?: GroupFormSchema
    newGroup?: boolean
} & CommonProps

const validationSchema: ZodType<GroupFormSchema> = z.object({
    groupName: z.string().min(1, { message: 'Group name required' }),
    description: z.string().min(1, { message: 'Description name required' }),
    groupImage: z.string().min(1, { message: 'Group Image required' }),

 
    // country: z.string().min(1, { message: 'Please select a country' }),

    // postcode: z.string().min(1, { message: 'Postcode required' }),
    // city: z.string().min(1, { message: 'City required' }),
    // img: z.string(),
    // tags: z.array(z.object({ value: z.string(), label: z.string() })),
})

const GroupForm = (props: CustomerFormProps) => {
    const {
        onFormSubmit,
        defaultValues = {},
        newGroup = false,
        children,
    } = props

    const {
        handleSubmit,
        reset, setValue: any,
        formState: { errors },
        control,
    } = useForm<GroupFormSchema>({

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

    const onSubmit = (values: GroupFormSchema) => {
        
console.log(values,"groupImage===")

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

export default GroupForm
