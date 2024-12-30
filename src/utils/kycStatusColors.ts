
export const kycStatusColors: Record<string, string> = {
    NOT_SUBMITTED: 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300', // Gray for not submitted
    PENDING_REVIEW: 'bg-yellow-200 dark:bg-yellow-700 text-gray-900 dark:text-gray-300', // Yellow for pending review
    APPROVED: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900', // Green for approved
    REJECTED: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900', // Red for rejected
};
