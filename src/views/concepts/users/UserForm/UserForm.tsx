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
import type { UserFormSchema } from './types'

type CustomerFormProps = {
    onFormSubmit: (values: UserFormSchema) => void
    defaultValues?: UserFormSchema
    newUser?: boolean
} & CommonProps

const validationSchema: ZodType<UserFormSchema> = z.object({
    firstName: z.string().min(1, { message: 'First name required' }),
    lastName: z.string().min(1, { message: 'Last name required' }),
    // address: z.string().min(1, { message: 'Addrress required' }),

    // phoneNumber: z
    //     .string()
    //     .min(10, { message: 'Phone number must be at least 10 digits' })
    //     .regex(/^\d+$/, { message: 'Phone number must contain only digits' }) // Validate phone number is digits only
    // ,
    // country: z.string().min(1, { message: 'Please select a country' }),

    // postcode: z.string().min(1, { message: 'Postcode required' }),
    // city: z.string().min(1, { message: 'City required' }),
    // img: z.string(),
    // tags: z.array(z.object({ value: z.string(), label: z.string() })),
})

const UserForm = (props: CustomerFormProps) => {
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
    } = useForm<UserFormSchema>({

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

    const onSubmit = (values: UserFormSchema) => {

console.log(values,"values")
        onFormSubmit?.(values)
    }

    return (
        // <Form
        //     className="flex w-full h-full"
        //     containerClassName="flex flex-col w-full justify-between"
        //     onSubmit={handleSubmit(onSubmit)}
        // >
        //     <Container>
        //         <div className="flex flex-col md:flex-row gap-4">
        //             <div className="gap-4 flex flex-col flex-auto">
        //                 <OverviewSection control={control} errors={errors} />

        //             </div>

        //         </div>
        //     </Container>
        //     <BottomStickyBar>{children}</BottomStickyBar>
        // </Form>
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

    {/* ✅ Now the submit button will work */}
    <BottomStickyBar>{children}</BottomStickyBar>
</Form>

    )
}

export default UserForm
