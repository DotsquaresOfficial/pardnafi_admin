import { useMemo,useState } from 'react'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import Avatar from '@/components/ui/Avatar'
import { FormItem } from '@/components/ui/Form'
import NumericInput from '@/components/shared/NumericInput'
import { countryList } from '@/constants/countries.constant'
import { Controller,useForm } from 'react-hook-form'
import { components } from 'react-select'
import type { FormSectionBaseProps, GroupFormSchema } from './types'
import type { ControlProps, OptionProps } from 'react-select'
import { uploadFile } from '@/services/GroupService'
import { useToken } from '@/store/authStore'
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

         
            const response = await uploadFile(data,tokenPromise);

           
            if (response && response.file && response.file.url) {
               
               
                setImagePreview(response.file.url);
               

                localStorage.setItem("groupImage",response.file.url)
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
                    label="Group Name"
                    invalid={Boolean(errors.groupName)}
                    errorMessage={errors.groupName?.message}
                >
                    <Controller
                        name="groupName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Group Name"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Group Description"
                    invalid={Boolean(errors.description)}
                    errorMessage={errors.description?.message}
                >
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Group Description"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              
            <FormItem
                label="Group Image"
                invalid={Boolean(errors.groupImage)}
                errorMessage={errors.groupImage?.message}
            >
                <Controller
                    name="groupImage"
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
