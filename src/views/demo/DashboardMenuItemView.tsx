import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import classNames from '@/utils/classNames'
import { Link } from 'react-router-dom'
import { TbUsers, TbFileText, TbMessageCircle, TbUserCheck, TbUserX, TbClock, TbCodeCircle, TbExclamationCircle } from 'react-icons/tb';
// import { Project } from '../types'

import { useEffect, useState, type ReactNode } from 'react'
import { useToken } from '@/store/authStore'
import { getDashboardData } from '@/services/DashboardService';
export type Project = {
    ongoingProject: number
    projectCompleted: number
    upcomingProject: number
}


type StatisticCardProps = {
    title: string
    icon: ReactNode
    className: string
    value?: number
}

const { token } = useToken()

const someAsyncTokenFetchFunction = async () => {

    return await token;
};

const StatisticCard = ({
    title,
    className,
    icon,
    value,
}: StatisticCardProps) => {
    return (
        <div
            className={classNames(
                'rounded-2xl p-4 flex flex-col justify-center',
                className,
            )}
        >
            <div className="flex justify-between items-center relative">
                <div>
                    <div className="mb-4 text-gray-900 font-bold">{title}</div>
                    <h1 className="mb-1 text-gray-900">{value}</h1>
                </div>
                <div
                    className={
                        'flex items-center justify-center min-h-12 min-w-12 max-h-12 max-w-12 bg-gray-900 text-white rounded-full text-2xl'
                    }
                >
                    {icon}
                </div>
            </div>
        </div>
    )
}

const DashboardMenuItemView = () => {

    const [totalUsers, setTotalUsers] = useState<number | undefined>(undefined);
    const [deActiveUsers, setDeActiveUsers] = useState<number | undefined>(undefined);
    const [activeUsers, setActiveUsers] = useState<number | undefined>(undefined);
    const [totalFAQs, setTotalFAQs] = useState<number | undefined>(undefined);
    const [totalContactUs, setTotalContactUs] = useState<number | undefined>(undefined);

    const [approvedKycUsers, setApprovedKycUsers] = useState<number | undefined>(undefined);
    const [totalRejectedKyc, setTotalRejectedKyc] = useState<number | undefined>(undefined);
    const [totalPendingKyc, setTotalPendingKyc] = useState<number | undefined>(undefined);
    const [totalNotSubmittedKyc, setTotalNotSubmittedKyc] = useState<number | undefined>(undefined);




    useEffect(() => {
        dashboardDataHandler()
    }, [])


    const dashboardDataHandler = async () => {

        const tokenPromise = someAsyncTokenFetchFunction();

        const response = await getDashboardData(tokenPromise)
        console.log(response, "responsekkio")

        if (response?.success) {

            setTotalUsers(response.data?.totalUsers);
            setDeActiveUsers(response.data?.deActiveUsers);
            setActiveUsers(response.data?.activeUsers);
            setTotalFAQs(response.data?.totalFAQs);
            setTotalContactUs(response.data?.totalContactUs);
            setApprovedKycUsers(response.data?.totalApprovedKYC)
            setTotalRejectedKyc(response.data?.totalRejectedKYC
            )
            setTotalPendingKyc(response.data?.totalPendingKYC)
            setTotalNotSubmittedKyc(response.data?.totalNotSubmittedKYC
            )
        }



    }



    return <>

        <Card>
            <div className="flex items-center justify-between">

                <h3>Dashboard Management</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl mt-4">
                {/* <StatisticCard
                    title="Total Users"
                    className="bg-sky-100 dark:bg-opacity-75"
                    value={totalUsers}
                    icon={<TbUsers />}
                /> */}
                <Link to="/concepts/users/user-list" className="block">
                    <StatisticCard
                        title="Total Users"
                        className="bg-sky-100 dark:bg-opacity-75"
                        value={totalUsers?totalUsers:0}
                        icon={<TbUsers />}
                    />
                </Link>
                <StatisticCard
                    title="Total Active Users"
                    className="bg-sky-100 dark:bg-opacity-75"
                    value={activeUsers?activeUsers:0}
                    icon={<TbUserCheck />}
                />

                <StatisticCard
                    title="Total Blocked Users"
                    className="bg-sky-100 dark:bg-opacity-75"
                    value={deActiveUsers?deActiveUsers:0}
                    icon={<TbUserX />}
                />

                <StatisticCard
                    title="Total Approved Kyc Users"
                    className="bg-sky-100 dark:bg-opacity-75"
                    value={approvedKycUsers ? approvedKycUsers : 0}
                    icon={<TbUserCheck className="text-green-500" />} // Green check icon for approved
                />

                <StatisticCard
                    title="Total Rejected Kyc Users"
                    className="bg-sky-100 dark:bg-opacity-75"
                    value={totalRejectedKyc ? totalRejectedKyc : 0}
                    icon={<TbUserX className="text-red-500" />} // Red "X" icon for rejected
                />

                <StatisticCard
                    title="Total Pending Kyc Users"
                    className="bg-sky-100 dark:bg-opacity-75"
                    value={totalPendingKyc ? totalPendingKyc : 0}
                    icon={<TbClock className="text-yellow-500" />} // Yellow clock icon for pending
                />

                <StatisticCard
                    title="Total Not Submit Kyc Users"
                    className="bg-sky-100 dark:bg-opacity-75"
                    value={totalNotSubmittedKyc ? totalNotSubmittedKyc : 0}
                    icon={<TbExclamationCircle className="text-orange-500" />} // Orange exclamation for not submitted
                />



                <Link to="/concepts/faq/faq-list" className="block">
                    <StatisticCard
                        title="Total Faqs"
                        className="bg-emerald-100 dark:bg-opacity-75"
                        value={totalFAQs?totalFAQs:0}
                        icon={<TbFileText />}
                    /></Link>


                <Link to="/concepts/inquirys/inquiry-list" className="block">
                    <StatisticCard
                        title="Total Inquiry"
                        className="bg-purple-100 dark:bg-opacity-75"
                        value={totalContactUs?totalContactUs:0}
                        icon={<TbMessageCircle />}
                    />
                </Link>

            </div>
        </Card>
    </>
}

export default DashboardMenuItemView
