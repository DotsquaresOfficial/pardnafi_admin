
import { baseUrl } from "./BaseUrl";
export const TOKEN_TYPE = 'Bearer '
export const REQUEST_HEADER_AUTH_KEY = 'Authorization'
export const TOKEN_NAME_IN_STORAGE = 'token'


export const loginApi: string = baseUrl + "/auth/login";
export const forgotPasswordApi: string = baseUrl + "/auth/forgot-password";

// =================faq==================
export const faqApi: string = baseUrl + "/faqs/get-faqs";
export const faqCreateApi: string = baseUrl + "/faqs/create-faqs";
export const getFaqByIdApi: string = baseUrl + "/faqs/get-one";
export const updateFaqApi: string = baseUrl + "/faqs/update-faqs";
export const searchQueryFaqApi: string = baseUrl + "/faqs/query-faqs";
export const removeFaqApi: string = baseUrl + "/faqs/remove-faqs";



// =================faq==================

// =================content page api ==================
export const getAllPageApi: string = baseUrl + "/page/get-all-pages";
export const pageCreateApi: string = baseUrl + "/page/update-content";


// =================content page api==================










const config: string | null = localStorage.getItem("token");

export default config;

