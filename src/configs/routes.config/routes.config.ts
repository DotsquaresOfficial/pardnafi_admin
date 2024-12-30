import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'
import conceptsRoute from './conceptsRoute'
import faqRoute from './faqRoute'
import { CONCEPTS_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN } from '@/constants/roles.constant'
import { FaSquareYoutube } from 'react-icons/fa6'
import termsRoute from './termsRoute'
import aboutUsRoute from './aboutUsRoute'
import privacyPolicyRoute from './privacyPolicyRoute'
import groupRoute from './groupRoute'
import kycRoute from './kycRoute'
export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },

    {
        key: 'dashboardMenuItem',
        path: '/dashboard',
        component: lazy(() => import('@/views/demo/DashboardMenuItemView')),
        authority: [],
    },
    ...conceptsRoute,
    ...kycRoute,
    ...groupRoute,

  
    ...termsRoute,

    ...faqRoute,

    ...aboutUsRoute,
    ...privacyPolicyRoute,
    {
        key: 'inquiryMenuItem',
        path: `${CONCEPTS_PREFIX_PATH}/inquirys/inquiry-list`,
        component: lazy(
            () => import('@/views/concepts/inquiry/InquiryList'),
        ),
        authority: [ADMIN],
    },





 
    ...othersRoute,
]
