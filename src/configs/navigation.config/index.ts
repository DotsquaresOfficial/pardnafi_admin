import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE
} from '@/constants/navigation.constant'

import type { NavigationTree } from '@/@types/navigation'
import conceptsNavigationConfig from './concepts.navigation.config'
import { CONCEPTS_PREFIX_PATH } from '@/constants/route.constant'

const navigationConfig: NavigationTree[] = [

    {
        key: 'dashboardMenuItem',
        path: '/dashboard',
        title: 'User Management',
        translateKey: 'nav.dashboardMenuItem',
        icon: 'dashboardMenuItem',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },

    ...conceptsNavigationConfig,

    // {
    //     key: 'transactionMenu',
    //     path: '',
    //     title: 'Transaction Management',
    //     translateKey: 'nav.transactionMenu.transactionMenu',
    //     icon: 'transactioncollapseMenu',
    //     type: NAV_ITEM_TYPE_COLLAPSE,
    //     authority: [],
    //     subMenu: [
    //         {
    //             key: 'transactionMenu.item1',
    //             path: '/transaction-details',
    //             title: 'Transaction Details',
    //             translateKey: 'nav.transactionMenu.item1',
    //             icon: '',
    //             type: NAV_ITEM_TYPE_ITEM,
    //             authority: [],
    //             subMenu: [],
    //         },

    //     ],
    // },
    {
        key: 'contentMenu',
        path: '',
        title: 'Content Management',
        translateKey: 'nav.contentMenu.contentMenu',
        icon: 'contentMenu',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [

            {
                key: 'terms.item2',
                path: `${CONCEPTS_PREFIX_PATH}/terms/terms-list`,
                title: 'Terms And Conditions',
                translateKey: 'nav.terms.item2',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [
                    {
                        key: 'concepts.terms.userList',
                        path: `${CONCEPTS_PREFIX_PATH}/terms/terms-list`,
                        title: 'Terms And Conditions List',
                        translateKey: 'nav.conceptsTerms.userList',
                        icon: 'termsList',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        meta: {
                            description: {
                                translateKey:
                                    'nav.conceptsTerms.userListDesc',
                                label: 'List of all users',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'concepts.terms.userEdit',
                        path: `${CONCEPTS_PREFIX_PATH}/terms/terms-edit/1`,
                        title: 'terms Edit',
                        translateKey: 'nav.conceptsTerms.userEdit',
                        icon: 'termsEdit',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        meta: {
                            description: {
                                translateKey:
                                    'nav.conceptsTerms.userEditDesc',
                                label: 'Edit user info',
                            },
                        },
                        subMenu: [],
                    },

                    {
                        key: 'concepts.terms.userDetails',
                        path: `${CONCEPTS_PREFIX_PATH}/terms/terms-details/1`,
                        title: 'User Details',
                        translateKey: 'nav.conceptsTerms.userDetails',
                        icon: 'userDetails',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
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

            {
                key: 'faq.item2',
                path: `${CONCEPTS_PREFIX_PATH}/faq/faq-list`,
                title: 'FAQ',
                translateKey: 'nav.faq.item2',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [
                    {
                        key: 'concepts.users.userList',
                        path: `${CONCEPTS_PREFIX_PATH}/faq/faq-list`,
                        title: 'User List',
                        translateKey: 'nav.conceptsUsers.userList',
                        icon: 'userList',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
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
                        path: `${CONCEPTS_PREFIX_PATH}/faq/faq-edit/1`,
                        title: 'user Edit',
                        translateKey: 'nav.conceptsUsers.userEdit',
                        icon: 'userEdit',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
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
                        path: `${CONCEPTS_PREFIX_PATH}/faq/faq-details/1`,
                        title: 'User Details',
                        translateKey: 'nav.conceptsUsers.userDetails',
                        icon: 'userDetails',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
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





            {
                key: 'aboutUs.item2',
                path: `${CONCEPTS_PREFIX_PATH}/about-us/about-us-list`,
                title: 'About Us',
                translateKey: 'nav.about-us.item2',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [
                    {
                        key: 'concepts.aboutUs.aboutUs',
                        path: `${CONCEPTS_PREFIX_PATH}/about-us/about-us-list`,
                        title: 'User List',
                        translateKey: 'nav.conceptsUsers.aboutUs',
                        icon: 'aboutUs',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        meta: {
                            description: {
                                translateKey:
                                    'nav.conceptsUsers.userListDesc',
                                label: 'List of all users',
                            },
                        },
                        subMenu: [],
                    },



                ],
            },



            {
                key: 'privacyPolicy.item2',
                path: `${CONCEPTS_PREFIX_PATH}/privacy-policy/privacy-policy-list`,
                title: 'Privacy Policy',
                translateKey: 'nav.privacy-policy.item2',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [
                    {
                        key: 'concepts.privacyPolicy.privacyPolicy',
                        path: `${CONCEPTS_PREFIX_PATH}/privacy-policy/privacy-policy-list`,
                        title: 'User List',
                        translateKey: 'nav.conceptsUsers.privacyPolicy',
                        icon: 'privacyPolicy',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        meta: {
                            description: {
                                translateKey:
                                    'nav.conceptsUsers.userListDesc',
                                label: 'List of all users',
                            },
                        },
                        subMenu: [],
                    },



                ],
            },



        ],
    },
    {
        key: 'inquiryMenuItem',
        path: `${CONCEPTS_PREFIX_PATH}/inquirys/inquiry-list`,
        title: 'Inquiry Management',
        translateKey: 'nav.inquiryMenuItem',
        icon: 'inquiryMenuItem',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],

    },






]

export default navigationConfig
