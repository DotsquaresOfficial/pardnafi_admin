import { apiGetFaqList, getFaq } from '@/services/FaqServices'
import useSWR from 'swr'
import { useFaqListStore } from '../store/faqListStore'
import type { GetFaqListResponse } from '../types'
import type { TableQueries } from '@/@types/common'
import { useToken } from '@/store/authStore'
import { FaqFormSchema } from '../../FaqForm'
export default function useFaqList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedCustomer,
        setSelectedCustomer,
        setSelectAllCustomer,
        setFilterData,
    } = useFaqListStore((state) => state)


    interface FaqResponse {
        message: string;
        success: boolean;
        status: number;
        total?: number;
        faqs?: any;
        data?: Array<{
            question: string;
            answer: string;
            _id: string;
          }>
        
      }

    const { token, setToken } = useToken()

    const someAsyncTokenFetchFunction = async () => {

        return await token;
    };

    const { data, error, isLoading, mutate } = useSWR(
        ['/faqs/get-faqs', { ...tableData, ...filterData }],
        ([_, params]) =>
            apiGetFaqList<FaqResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    );





    const faqList = data?.data || []

   


    const faqListTotal = data?.data?.length || 0
    

    return {
        faqList,
        faqListTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        selectedCustomer,
        setSelectedCustomer,
        setSelectAllCustomer,
        setFilterData,
    }
}
