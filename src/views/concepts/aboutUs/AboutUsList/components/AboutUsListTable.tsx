import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useToken } from '@/store/authStore'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import type { PageData } from '../../../termsAndConditions/TermsList/types';
import { pageCreate, getAllPage } from '@/services/TermsAndConditionsServices';
import { about_us } from '@/constants/slugType';
import { confirmAlert } from "react-confirm-alert";
const AboutUsListTable = () => {
    const { token } = useToken()
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const someAsyncTokenFetchFunction = async (): Promise<string | null> => {
        return Promise.resolve(token);
    };
    const getData = async () => {
        const tokenPromise = someAsyncTokenFetchFunction();
        const data = await getAllPage(tokenPromise);
        const pageData = data?.updatedPages?.find((item: PageData) => item?.slug === about_us);
        if (pageData) {
            setTitle(pageData?.title || "");
            setSubTitle(pageData?.subTitle || "");
            setDescription(pageData?.description || "");
        } 
    };

    useEffect(() => {
        getData()
    }, [])

    const handleEditorChange = (content: string) => {
        setTitle(content);
    };
    const handleSubTitleChange = (content: string) => {
        setSubTitle(content);
    };
    const handleDescriptionContentChange = (value: string) => {
        setDescription(value);
    };

    const handlePublishAboutUs = (): void => {
        const message = 
             "Are you sure to do publish this About us"
           

        confirmAlert({
            title: "Confirm to submit",
            message: message,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => handleSave(),
                },
                {
                    label: "No",
                },
            ],
        });
    };

    const handleSave = async () => {
        const slug = about_us
        const data = {
            slug: slug,
            title,
            subTitle, description
        }
        const tokenPromise = someAsyncTokenFetchFunction()

        const response = await pageCreate(data, tokenPromise)

        if (response?.success) {
            toast.push(
                <Notification type="success">{response?.message}</Notification>,
                { placement: 'top-center' },
            )
        } else {
            toast.push(
                <Notification type="danger">{response?.message}</Notification>,
                { placement: 'top-center' },
            )
        }


    };


    return (
        <div >
            <div className="mt-4">
                <h2 className="text-xl">Title Content  </h2>
                <ReactQuill value={title} onChange={handleEditorChange} />
                <div>
                    <h4>Subtitle Content</h4>
                    <ReactQuill value={subTitle} onChange={handleSubTitleChange} />
                </div>
                <div>
                    <h4>Description Content</h4>
                    <ReactQuill value={description} onChange={handleDescriptionContentChange} />
                </div>
                <button
                    onClick={() => handlePublishAboutUs()}
                    className="mt-4 bg-blue-500 text-white p-2 rounded"
                >
                    Publish
                </button>
            </div>

        </div>
    );
};

export default AboutUsListTable;