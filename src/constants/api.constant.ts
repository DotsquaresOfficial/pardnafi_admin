
import { baseUrl } from "./BaseUrl";
export const TOKEN_TYPE = 'Bearer '
export const REQUEST_HEADER_AUTH_KEY = 'Authorization'
export const TOKEN_NAME_IN_STORAGE = 'token'


export const loginApi: string = baseUrl + "/auth/login";
export const forgotPasswordApi: string = baseUrl + "/auth/forgot-password";

// ================dashboard =======================
export const getDashboardDataApi: string = baseUrl + "/admin/get-dashboard-data";


// ===============image upload =====================
export const uploadImageApi: string = baseUrl + "/upload/upload";

// ===============image upload =====================

// ====================users ===============================

export const getAllUsersApi: string = baseUrl + "/user/get-all-users";
export const updateUsersApi: string = baseUrl + "/user/update-user-details";
export const searchQueryUsersApi: string = baseUrl + "/user/query-users";
export const getUsersByIdApi: string = baseUrl + "/user/get-user-by-id";
export const updateUserStatusApi: string = baseUrl + "/user/update-user-status";


// ====================users ===============================


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

// =================content page api ==================
export const getContactUsDataApi: string = baseUrl + "/contact/get-all-tickets";
export const searchQueryContactUsApi: string = baseUrl + "/contact/query-contact-us";
// =================content page api==================


// ============================ group======================
export const groupCreateApi: string = baseUrl + "/group/create-group";
export const getAllGroupApi: string = baseUrl + "/group/get-all-groups";
export const searchQueryGroupApi: string = baseUrl + "/group/query-group";
export const updateGroupApi: string = baseUrl + "/group/update-group";
export const getGroupByIdApi: string = baseUrl + "/group/get-group-by-id";












const config: string | null = localStorage.getItem("token");

export default config;

