// // Створюємо API Slice
// import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
// import {APP_ENV} from "../env";
// import {AuthResponse, IUserRegisterRequest, LoginGoogleRequest} from "../pages/auth/types.ts";
//
//
// export const authApi = createApi({
//     reducerPath: 'authApi', // Унікальний шлях для цього API у Redux Store
//     baseQuery: fetchBaseQuery({ baseUrl: `${APP_ENV.REMOTE_BASE_URL}auth` }), // Базовий URL
//     tagTypes: ["AuthUser"], // Додаємо tag для категорій
//     endpoints: (builder) => ({
//
//         registerUser: builder.mutation<void, IUserRegisterRequest>({
//             query: (userRegister) => ({
//                 url: "register",
//                 method: "POST",
//                 body: userRegister,
//             }),
//             //invalidatesTags: ["AuthUser"], // Інвалідовуємо "Category" після створення
//         }),
//         googleLoginUser: builder.mutation<AuthResponse, LoginGoogleRequest>({
//             query: (userGoogle) => ({
//                 url: "google",
//                 method: "POST",
//                 body: userGoogle,
//             }),
//
//         }),
//     }),
// });
//
// // Автоматично згенерований хук
// export const {
//     useRegisterUserMutation,
//     useGoogleLoginUserMutation } = authApi;

// Створюємо API Slice
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {APP_ENV} from "../env";
import {AuthResponse, IUserRegisterRequest, LoginGoogleRequest} from "../pages/auth/types.ts";
import {setCredentials} from "../store/slices/userSlice.ts";


export const authApi = createApi({
    reducerPath: 'authApi', // Унікальний шлях для цього API у Redux Store
    baseQuery: fetchBaseQuery({ baseUrl: `${APP_ENV.REMOTE_BASE_URL}auth` }), // Базовий URL
    tagTypes: ["AuthUser"], // Додаємо tag для категорій
    endpoints: (builder) => ({

        registerUser: builder.mutation<void, IUserRegisterRequest>({
            query: (userRegister) => ({
                url: "register",
                method: "POST",
                body: userRegister,
            }),
            //invalidatesTags: ["AuthUser"], // Інвалідовуємо "Category" після створення
        }),
        googleLoginUser: builder.mutation<AuthResponse, LoginGoogleRequest>({
            query: (userGoogle) => ({
                url: "google",
                method: "POST",
                body: userGoogle,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    console.log("Google auth user", arg);
                    if (result.data && result.data.token) {
                        dispatch(setCredentials({ token: result.data.token }));

                    }
                } catch (error) {
                    console.error('Login failed:', error);
                }
            },
        }),
    }),
});

// Автоматично згенерований хук
export const {
    useRegisterUserMutation,
    useGoogleLoginUserMutation } = authApi;