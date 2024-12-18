import { lazy } from 'react'
import { CONCEPTS_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const conceptsRoute: Routes = [

    {
        key: 'concepts.users.userList',
        path: `${CONCEPTS_PREFIX_PATH}/users/user-list`,
        component: lazy(
            () => import('@/views/concepts/users/UserList'),
        ),
        authority: [ADMIN, USER],
    },
    {
        key: 'concepts.users.userEdit',
        path: `${CONCEPTS_PREFIX_PATH}/users/user-edit/:id`,
        component: lazy(
            () => import('@/views/concepts/users/UserEdit'),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Edit user',
                description:
                    'Manage user details, purchase history, and preferences.',
                contained: true,
            },
            footer: false,
        },
    },

    {
        key: 'concepts.users.userDetails',
        path: `${CONCEPTS_PREFIX_PATH}/users/user-details/:id`,
        component: lazy(
            () => import('@/views/concepts/users/UserDetails'),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },

]

export default conceptsRoute