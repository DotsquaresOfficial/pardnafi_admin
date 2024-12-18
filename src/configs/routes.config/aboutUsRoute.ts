import { lazy } from 'react'
import { CONCEPTS_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const aboutUsRoute: Routes = [

    {
        key: 'aboutUs.item2',
        path: `${CONCEPTS_PREFIX_PATH}/about-us/about-us-list`,
        component: lazy(() => import('@/views/concepts/aboutUs/AboutUsList')),
        authority: [],
    },
 


]

export default aboutUsRoute