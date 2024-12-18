// import { getAllPage } from '@/services/TermsAndConditionsServices'
// import useSWR from 'swr'
// import { usePrivacyPolicyListStore } from '../store/privacyPolicyListStore'
// import type { GetPrivacyPolicyListResponse } from '../types'
// import type { TableQueries } from '@/@types/common'
// import { useToken } from '@/store/authStore'
// export default function usePrivacyPolicyList() {
//     const {
//         tableData,
//         filterData,
//         setTableData,
//         selectedCustomer,
//         setSelectedCustomer,
//         setSelectAllCustomer,
//         setFilterData,
//     } = usePrivacyPolicyListStore((state) => state)



//     // const { data, error, isLoading, mutate } = useSWR(
//     //     ['/api/faq', { ...tableData, ...filterData }],
//     //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     //     ([_, params]) =>
//     //         getFaq<GetFaqListResponse, TableQueries>(params),
//     //     {
//     //         revalidateOnFocus: false,
//     //     },
//     // )
//     const { token, setToken } = useToken()

//     const someAsyncTokenFetchFunction = async () => {

//         return await token;
//     };

//     const { data, error, isLoading, mutate } = useSWR(
//         ['/terms/get-terms', { ...tableData, ...filterData }],
//         ([_, params]) =>
//             apiGetTermsList<GetPrivacyPolicyListResponse, TableQueries>(params),
//         {
//             revalidateOnFocus: false,
//         },
//     );





//     const termsList = data?.data || []



//     const termsListTotal = data?.total || 0

//     return {
//         termsList,
//         termsListTotal,
//         error,
//         isLoading,
//         tableData,
//         filterData,
//         mutate,
//         setTableData,
//         selectedCustomer,
//         setSelectedCustomer,
//         setSelectAllCustomer,
//         setFilterData,
//     }
// }
