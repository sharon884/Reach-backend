export const API_ROUTES = {
    AUTH: {
        SIGNUP: "/signup",
        
        LOGIN: "/login",
        
        REFRESH: "/refresh",
        
        VERIFY_OTP: "/verify-otp",
        
        RESEND_OTP: "/resend-otp",
        
        LOGOUT: "/logout",
        
        FORGOT_PASSWORD: "/forgot-password",
        
        VERIFY_PASSWORD_RESET_OTP: "/verify-password-reset-otp",
        
        RESET_PASSWORD: "/reset-password",
        
        GOOGLE: "/google",
   
    },


    ADMIN: {
        LOGIN: "/login",

        USERS: "/users",
        
        USER_STATUS: "/users/:userId/status",
        
        LOGOUT: "/logout",
    },

    CATALOG: {
        CATEGORY_CONFIGURATION_DRAFTS: "/category-configurations/drafts",

        CATEGORY_CONFIGURATION_CATEGORY: "/category-configurations/drafts/:draftId/category",

        CATEGORY_CONFIGURATION_CORE_FIELDS: "/category-configurations/drafts/:draftId/core-fields",

        CATEGORY_CONFIGURATION_PROPERTIES: "/category-configurations/drafts/:draftId/properties",

        CATEGORY_CONFIGURATION_PUBLISH: "/category-configurations/drafts/:draftId/publish",

        CATEGORY_CONFIGURATION_DRAFT: "/category-configurations/drafts/:draftId",

        CATEGORIES: "/categories",
    },
} as const;