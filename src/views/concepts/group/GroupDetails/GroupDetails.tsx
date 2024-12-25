import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Loading from '@/components/shared/Loading'
import GroupSection from './GroupSection'

import { apiGetUser } from '@/services/UserService'
import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import type { Group } from '../GroupList/types'

const { TabNav, TabList, TabContent } = Tabs

const GroupDetails = () => {
    const { id } = useParams()

    const { data, isLoading } = useSWR(
        ['/api/users', { id: id as string }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) => apiGetUser<Group, { id: string }>(params),
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
                        {/* <GroupSection data={data} /> */}
                    </div>

                </div>
            )}
        </Loading>
    )
}

export default GroupDetails
