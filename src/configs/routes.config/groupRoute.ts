import { lazy } from 'react'
import { CONCEPTS_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const groupRoute: Routes = [

    {
        key: 'concepts.group.groupList',
        path: `${CONCEPTS_PREFIX_PATH}/group/group-list`,
        component: lazy(
            () => import('@/views/concepts/group/GroupList'),
        ),
        authority: [ADMIN, USER],
    },
    {
        key: 'concepts.group.groupCreate',
        path: `${CONCEPTS_PREFIX_PATH}/group/group-create`,
        component: lazy(
            () => import('@/views/concepts/group/GroupCreate'),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Create group',
                description:
                    'Manage group details, purchase history, and preferences.',
                contained: true,
            },
            footer: false,
        },
    },
    {
        key: 'concepts.group.groupEdit',
        path: `${CONCEPTS_PREFIX_PATH}/group/group-edit/:id`,
        component: lazy(
            () => import('@/views/concepts/group/GroupEdit'),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Edit group',
                description:
                    'Manage group details, purchase history, and preferences.',
                contained: true,
            },
            footer: false,
        },
    },
    
    // {
    //     key: 'concepts.users.userDetails',
    //     path: `${CONCEPTS_PREFIX_PATH}/users/user-details/:id`,
    //     component: lazy(
    //         () => import('@/views/concepts/users/UserDetails'),
    //     ),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         pageContainerType: 'contained',
    //     },
    // },

]

export default groupRoute