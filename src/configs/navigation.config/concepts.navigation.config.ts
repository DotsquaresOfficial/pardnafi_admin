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
                title: 'User Edit',
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

    // {
    //     key: 'kycMenuItem',
    //     path: '',
    //     title: 'Kyc Management',
    //     translateKey: 'nav.conceptsKyc.kyc',
    //     icon: 'kycMenuItem',
    //     type: NAV_ITEM_TYPE_COLLAPSE,
    //     authority: [ADMIN, USER],
    //     meta: {
    //         description: {
    //             translateKey: 'nav.conceptsKyc.kycDesc',
    //             label: 'User management',
    //         },
    //     },
    //     subMenu: [
    //         {
    //             key: 'concepts.kyc.kycList',
    //             path: `${CONCEPTS_PREFIX_PATH}/kyc/kyc-list`,
    //             title: 'Kyc List',
    //             translateKey: 'nav.conceptsKyc.kycList',
    //             icon: 'kycList',
    //             type: NAV_ITEM_TYPE_ITEM,
    //             authority: [ADMIN, USER],
    //             meta: {
    //                 description: {
    //                     translateKey:
    //                         'nav.conceptsKyc.kycListDesc',
    //                     label: 'List of all kyc',
    //                 },
    //             },
    //             subMenu: [],
    //         },
    //         {
    //             key: 'concepts.kyc.kycEdit',
    //             path: `${CONCEPTS_PREFIX_PATH}/kyc/kyc-edit/1`,
    //             title: 'Kyc Edit',
    //             translateKey: 'nav.conceptskyc.kycEdit',
    //             icon: 'kycEdit',
    //             type: NAV_ITEM_TYPE_ITEM,
    //             authority: [ADMIN, USER],
    //             meta: {
    //                 description: {
    //                     translateKey:
    //                         'nav.conceptsKyc.kycEditDesc',
    //                     label: 'Edit kyc info',
    //                 },
    //             },
    //             subMenu: [],
    //         },

    //         {
    //             key: 'concepts.kyc.kycDetails',
    //             path: `${CONCEPTS_PREFIX_PATH}/kyc/kyc-details/1`,
    //             title: 'Kyc Details',
    //             translateKey: 'nav.conceptskyc.kycDetails',
    //             icon: 'kycDetails',
    //             type: NAV_ITEM_TYPE_ITEM,
    //             authority: [ADMIN, USER],
    //             meta: {
    //                 description: {
    //                     translateKey:
    //                         'nav.conceptskyc.kycDetailsDesc',
    //                     label: 'Detailed kyc info',
    //                 },
    //             },
    //             subMenu: [],
    //         },
    //     ],
    // },

    {
        key: 'groupMenuItem',
        path: '',
        title: 'Group Management',
        translateKey: 'nav.conceptsGroup.group',
        icon: 'groupMenuItem',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [ADMIN, USER],
        meta: {
            description: {
                translateKey: 'nav.conceptsGroup.groupDesc',
                label: 'Group management',
            },
        },
        subMenu: [
            {
                key: 'concepts.group.groupList',
                path: `${CONCEPTS_PREFIX_PATH}/group/group-list`,
                title: 'Group List',
                translateKey: 'nav.conceptsGroup.groupList',
                icon: 'groupList',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey:
                            'nav.conceptsGroup.groupListDesc',
                        label: 'List of all group',
                    },
                },
                subMenu: [],
            },

            {
                key: 'concepts.group.groupCreate',
                path: `${CONCEPTS_PREFIX_PATH}/group/group-create`,
                title: 'Group Create',
                translateKey: 'nav.conceptsGroup.groupCreate',
                icon: 'groupCreate',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey:
                            'nav.conceptsGroup.groupCreateDesc',
                        label: 'Create group info',
                    },
                },
                subMenu: [],
            },
            {
                key: 'concepts.group.groupEdit',
                path: `${CONCEPTS_PREFIX_PATH}/group/group-edit/1`,
                title: 'Group Edit',
                translateKey: 'nav.conceptsGroup.groupEdit',
                icon: 'groupEdit',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey:
                            'nav.conceptsGroup.groupEditDesc',
                        label: 'Edit group info',
                    },
                },
                subMenu: [],
            },

            // {
            //     key: 'concepts.group.groupDetails',
            //     path: `${CONCEPTS_PREFIX_PATH}/group/group-details/1`,
            //     title: 'Group Details',
            //     translateKey: 'nav.conceptsGroup.groupDetails',
            //     icon: 'groupDetails',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN, USER],
            //     meta: {
            //         description: {
            //             translateKey:
            //                 'nav.conceptsgroup.groupDetailsDesc',
            //             label: 'Detailed user info',
            //         },
            //     },
            //     subMenu: [],
            // },
        ],
    },



]

export default conceptsNavigationConfig
