import { lazy } from 'react'
import { CONCEPTS_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const faqRoute: Routes = [

    {
        key: 'faq.item2',
        path: `${CONCEPTS_PREFIX_PATH}/faq/faq-list`,
        component: lazy(() => import('@/views/concepts/faq/FaqList')),
        authority: [],
    },
    {
        key: 'concepts.faq.faqEdit',
        path: `${CONCEPTS_PREFIX_PATH}/faq/faq-edit/:id`,
        component: lazy(
            () => import('@/views/concepts/faq/FaqEdit'),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Edit faq',
                description:
                    'Manage faq details, purchase history, and preferences.',
                contained: true,
            },
            footer: false,
        },
    },
    {
        key: 'concepts.faq.faqCreate',
        path: `${CONCEPTS_PREFIX_PATH}/faq/faq-create`,
        component: lazy(
            () => import('@/views/concepts/faq/FaqCreate'),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Create faq',
                description:
                    'Manage faq details, track purchases, and update preferences easily.',
                contained: true,
            },
            footer: false,
        },
    },
    // {
    //     key: 'concepts.faq.faqDetails',
    //     path: `${CONCEPTS_PREFIX_PATH}/faq/faq-details/:id`,
    //     component: lazy(
    //         () => import('@/views/concepts/faq/FaqDetails'),
    //     ),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         pageContainerType: 'contained',
    //     },
    // },

]

export default faqRoute