import { lazy } from 'react'
import { CONCEPTS_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const termsRoute: Routes = [

    {
        key: 'terms.item2',
        path: `${CONCEPTS_PREFIX_PATH}/terms/terms-list`,
        component: lazy(() => import('@/views/concepts/termsAndConditions/TermsList')),
        authority: [],
    },

   

]

export default termsRoute