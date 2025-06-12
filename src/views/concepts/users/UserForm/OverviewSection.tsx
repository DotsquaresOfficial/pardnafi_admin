import { useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import { FormItem } from '@/components/ui/Form'
import NumericInput from '@/components/shared/NumericInput'
import { countryList } from '@/constants/countries.constant'
import { Controller, useForm } from 'react-hook-form'
import { components } from 'react-select'
import type { FormSectionBaseProps, UserFormSchema } from './types'
import type { ControlProps, OptionProps } from 'react-select'
import { uploadFile } from '@/services/UserService'
import { useToken } from '@/store/authStore'
import { ConfirmDialog } from '@/components/shared'
type OverviewSectionProps = FormSectionBaseProps

type CountryOption = {
    label: string
    dialCode: string
    value: string
}

const { Control } = components



const OverviewSection = ({ control, errors }: OverviewSectionProps) => {

    const { token } = useToken()
    const someAsyncTokenFetchFunction = async (): Promise<string | null> => {
        return Promise.resolve(token);
    };
    const { setValue } = useForm<UserFormSchema>({
        defaultValues: {
            avatar: "",
        },
    });



    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const tokenPromise = someAsyncTokenFetchFunction()
        if (!file) {
            console.error("No file selected");
            return;
        }

        try {

            const data = new FormData();
            data.append("fileInput", file);


            const response = await uploadFile(data, tokenPromise);


            if (response && response.file && response.file.url) {


                setImagePreview(response.file.url);


                localStorage.setItem("avatar", response.file.url)
            } else {
                console.error("Failed to upload the file. Response was invalid.");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };
    return (
        <Card>
            {/* <h4 className="mb-6">Overview</h4> */}
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="First Name"
                    invalid={Boolean(errors.firstName)}
                    errorMessage={errors.firstName?.message}
                >
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="First Name"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Last Name"
                    invalid={Boolean(errors.lastName)}
                    errorMessage={errors.lastName?.message}
                >
                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Last Name"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
            </div>
            {/* <div className="grid md:grid-cols-2 gap-4">


                <FormItem
                    label="Phone Number"
                    invalid={Boolean(errors.phoneNumber)}
                    errorMessage={errors.phoneNumber?.message}
                >
                    <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="phoneNumber"
                                autoComplete="off"
                                placeholder="phoneNumber"
                                {...field}
                            />
                        )}
                    />
                </FormItem>  <FormItem
                    label="Address"
                    invalid={Boolean(errors.address)}
                    errorMessage={errors.address?.message}
                >
                    <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="address"
                                {...field}
                            />
                        )}
                    />

                </FormItem> </div> */}
            <div className="grid md:grid-cols-2 gap-4">

                <FormItem
                    label="Avatar"
                    invalid={Boolean(errors.avatar)}
                    errorMessage={errors.avatar?.message}
                >
                    <Controller
                        name="avatar"
                        control={control}
                        render={({ field }) => (
                            <>

                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        field.onChange(e);
                                        handleImageChange(e); // Handle the image preview separately
                                    }}
                                />

                                {imagePreview && (
                                    <div>
                                        <img
                                            src={imagePreview}
                                            alt="Avatar Preview"
                                            width={100}
                                            height={100}
                                            style={{ marginTop: '10px', borderRadius: '50%' }}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    />
                </FormItem>


            </div>

        </Card>
    )
}

export default OverviewSection
