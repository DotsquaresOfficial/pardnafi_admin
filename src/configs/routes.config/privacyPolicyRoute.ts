import { lazy } from 'react'
import { CONCEPTS_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const privacyPolicyRoute: Routes = [

    {
        key: 'privacyPolicy.item2',
        path: `${CONCEPTS_PREFIX_PATH}/privacy-policy/privacy-policy-list`,
        component: lazy(() => import('@/views/concepts/privacyPolicy/PrivacyPolicyList')),
        authority: [],
    },


]

export default privacyPolicyRoute