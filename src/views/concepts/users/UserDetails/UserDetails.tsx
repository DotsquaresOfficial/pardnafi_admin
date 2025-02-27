import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Loading from '@/components/shared/Loading'
import ProfileSection from './ProfileSection'

import { apiGetUser } from '@/services/UserService'
import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import type { User } from '../UserList/types'
import KycSection from './KycSection'

const { TabNav, TabList, TabContent } = Tabs

const UserDetails = () => {
    const { id } = useParams()
    console.log(id,"id00")

    const { data, isLoading } = useSWR(
        id ? [`/user/get-user-by-id/${id}`, { id: id as string }] : null,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) => apiGetUser<User, { id: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            evalidateOnFocus: false,
        },
    )

 
 
    return (
        <Loading loading={isLoading}>
            {!isEmpty(data) && (
                <div  className="flex flex-col lg:flex-row gap-4">
                    <div className="gap-4 flex flex-col flex-auto">
                        <ProfileSection data={data} />
                    </div>
                    <div className="gap-4 flex flex-col flex-auto">
                        <KycSection data={data} />
                    </div>
                  
                </div>
            )}
        </Loading>
    )
}

export default UserDetails
