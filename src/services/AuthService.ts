import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'
import axios from 'axios';
import type {
    SignInCredential,
    SignUpCredential,
    ForgotPassword,
    ResetPassword,
    SignInResponse,
    SignUpResponse,
} from '@/@types/auth'



export async function apiSignIn(data: SignInCredential, baseURL?: string) {
    try {
        const response = await ApiService.fetchDataWithAxios<SignInResponse>({
            url: endpointConfig.signIn,  
            method: 'post',
            data,  
        }, baseURL); 
       

        return response;
    } catch (error) {
        
        console.error('Error signing in:', error);
        throw error;
    }
}

export async function apiSignUp(data: SignUpCredential) {
    return ApiService.fetchDataWithAxios<SignUpResponse>({
        url: endpointConfig.signUp,
        method: 'post',
        data,
    })
}

export async function apiSignOut() {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.signOut,
        method: 'post',
    })
}

export async function apiForgotPassword<T>(data: ForgotPassword) {
    return ApiService.fetchDataWithAxios<T>({
        url: endpointConfig.forgotPassword,
        method: 'post',
        data,
    })
}

export async function apiResetPassword<T>(data: ResetPassword) {
    return ApiService.fetchDataWithAxios<T>({
        url: endpointConfig.resetPassword,
        method: 'post',
        data,
    })
}
