import { lazy } from 'react'
import { CONCEPTS_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const kycRoute: Routes = [

    {
        key: 'concepts.kyc.kycList',
        path: `${CONCEPTS_PREFIX_PATH}/kyc/kyc-list`,
        component: lazy(
            () => import('@/views/concepts/kyc/KycList'),
        ),
        authority: [ADMIN, USER],
    },
    {
        key: 'concepts.kyc.kycEdit',
        path: `${CONCEPTS_PREFIX_PATH}/kyc/kyc-edit/:id`,
        component: lazy(
            () => import('@/views/concepts/kyc/KycEdit'),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Edit kyc',
                description:
                    'Manage kyc details, purchase history, and preferences.',
                contained: true,
            },
            footer: false,
        },
    },

    {
        key: 'concepts.kyc.kycDetails',
        path: `${CONCEPTS_PREFIX_PATH}/kyc/kyc-details/:id`,
        component: lazy(
            () => import('@/views/concepts/kyc/KycDetails'),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },

]

export default kycRoute