import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/Auth/Login', 
                method: 'POST',
                credentials: 'include', 
                body: {...credentials}, 
            })
        }), 
        test: builder.mutation({
            query: () => ({
                url: '/Auth/GetRefreshToken', 
                method: 'GET',
                credentials: 'include', 
                // body: {...credentials}, 
            })
        }), 
    })
})

export const {
    useLoginMutation,
    useTestMutation
} = authApiSlice