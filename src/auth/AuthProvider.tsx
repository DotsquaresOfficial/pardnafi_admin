import { useRef, useImperativeHandle, forwardRef } from 'react'
import AuthContext from './AuthContext'
import appConfig from '@/configs/app.config'
import { useSessionUser, useToken } from '@/store/authStore'
import { apiSignIn, apiSignOut, apiSignUp } from '@/services/AuthService'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'
import type {
    SignInCredential,
    SignUpCredential,
    AuthResult,
    OauthSignInCallbackPayload,
    User,
    Token,
} from '@/@types/auth'
import type { ReactNode } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import { logIn,forgotPassword } from '@/services/Auth'

type AuthProviderProps = { children: ReactNode }

export type IsolatedNavigatorRef = {
    navigate: NavigateFunction
}

const IsolatedNavigator = forwardRef<IsolatedNavigatorRef>((_, ref) => {
    const navigate = useNavigate()

    useImperativeHandle(
        ref,
        () => {
            return {
                navigate,
            }
        },
        [navigate],
    )

    return <></>
})

function AuthProvider({ children }: AuthProviderProps) {
    const signedIn = useSessionUser((state) => state.session.signedIn)
    const user = useSessionUser((state) => state.user)
    const setUser = useSessionUser((state) => state.setUser)
    const setSessionSignedIn = useSessionUser(
        (state) => state.setSessionSignedIn,
    )
    const { token, setToken } = useToken()

    const authenticated = Boolean(token && signedIn)

    const navigatorRef = useRef<IsolatedNavigatorRef>(null)

    const redirect = () => {
        const search = window.location.search
        const params = new URLSearchParams(search)

        const redirectUrl = params.get(REDIRECT_URL_KEY)
        console.log(redirectUrl,"redirectUrl==")

        console.log(REDIRECT_URL_KEY,"REDIRECT_URL_KEY===")
        navigatorRef.current?.navigate(
            redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath,
        )
    }

    const handleSignIn = (tokens: Token, user?: User) => {
        setToken(tokens.accessToken)
        setSessionSignedIn(true)
        console.log(tokens,"tokens===")

        if (user) {
            setUser(user)
        }
    }

    const handleSignOut = () => {
        setToken('')
        setUser({})
        setSessionSignedIn(false)
    }

    const signIn = async (values: SignInCredential): AuthResult => {
        try {
            const resp = await logIn(values)

            console.log(resp,"resp===")
            
            if (resp) {
                handleSignIn({ accessToken: resp.data.access_token })
                redirect()
                return {
                    success:resp.success,
                    status: "",
                    message: resp?.message,
                }
            }
            return {
                success:false,
                status: 'failed',
                message: 'Unable to sign in',
            }

        } catch (errors: any) {
            return {
                success:false,
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const forgotPasswordHandler = async (values: SignInCredential): AuthResult => {
        try {
            const resp = await forgotPassword(values)
            
            if (resp) {
               
                return {
                    success:resp.success,
                    status: 'success',
                    message: resp.message,
                }
            }
            return {
                success:false,
                status: 'failed',
                message: 'Unable to sign in',
            }

        } catch (errors: any) {
            return {
                success:false,
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    

    const signUp = async (values: SignUpCredential): AuthResult => {
        try {
            const resp = await apiSignUp(values)
            if (resp) {
                handleSignIn({ accessToken: resp.token }, resp.data)
                redirect()
                return {
                    success:resp.success,
                    status: 'success',
                    message: '',
                }
            }
            return {
                success:false,
                status: 'failed',
                message: 'Unable to sign up',
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                success:false,

                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const signOut = async () => {
        try {
            await apiSignOut()
        } finally {
            handleSignOut()
            navigatorRef.current?.navigate(appConfig.unAuthenticatedEntryPath)
        }
    }
    const oAuthSignIn = (
        callback: (payload: OauthSignInCallbackPayload) => void,
    ) => {
        callback({
            onSignIn: handleSignIn,
            redirect,
        })
    }

    return (
        <AuthContext.Provider
            value={{
                authenticated,
                user,
                signIn,
                signUp,
                signOut,
                oAuthSignIn,
                forgotPasswordHandler,
            }}
        >
            {children}
            <IsolatedNavigator ref={navigatorRef} />
        </AuthContext.Provider>
    )
}

IsolatedNavigator.displayName = 'IsolatedNavigator'

export default AuthProvider
