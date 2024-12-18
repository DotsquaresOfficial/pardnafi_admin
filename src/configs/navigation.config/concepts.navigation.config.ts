import { CONCEPTS_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const conceptsNavigationConfig: NavigationTree[] = [

    {
        key: 'usersMenuItem',
        path: '',
        title: 'User Management',
        translateKey: 'nav.conceptsUsers.users',
        icon: 'usersMenuItem',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [ADMIN, USER],
        meta: {
            description: {
                translateKey: 'nav.conceptsUsers.usersDesc',
                label: 'User management',
            },
        },
        subMenu: [
            {
                key: 'concepts.users.userList',
                path: `${CONCEPTS_PREFIX_PATH}/users/user-list`,
                title: 'User List',
                translateKey: 'nav.conceptsUsers.userList',
                icon: 'userList',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey:
                            'nav.conceptsUsers.userListDesc',
                        label: 'List of all users',
                    },
                },
                subMenu: [],
            },
            {
                key: 'concepts.users.userEdit',
                path: `${CONCEPTS_PREFIX_PATH}/users/user-edit/1`,
                title: 'user Edit',
                translateKey: 'nav.conceptsUsers.userEdit',
                icon: 'userEdit',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey:
                            'nav.conceptsUsers.userEditDesc',
                        label: 'Edit user info',
                    },
                },
                subMenu: [],
            },

            {
                key: 'concepts.users.userDetails',
                path: `${CONCEPTS_PREFIX_PATH}/users/user-details/1`,
                title: 'User Details',
                translateKey: 'nav.conceptsUsers.userDetails',
                icon: 'userDetails',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey:
                            'nav.conceptsUsers.userDetailsDesc',
                        label: 'Detailed user info',
                    },
                },
                subMenu: [],
            },
        ],
    },



]

export default conceptsNavigationConfig
