import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Loading from '@/components/shared/Loading'
// import ProfileSection from './ProfileSection'

import { apiGetKyc } from '@/services/KycService'
import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import type { Kyc } from '../KycList/types'

const { TabNav, TabList, TabContent } = Tabs

const KycDetails = () => {
    const { id } = useParams()

    const { data, isLoading } = useSWR(
        ['/api/kyc', { id: id as string }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) => apiGetKyc<Kyc, { id: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            evalidateOnFocus: false,
        },
    )

    return (
        <Loading loading={isLoading}>
            {!isEmpty(data) && (
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="min-w-[330px] 2xl:min-w-[400px]">
                        {/* <ProfileSection datas={data} /> */}
                    </div>
                  
                </div>
            )}
        </Loading>
    )
}

export default KycDetails
