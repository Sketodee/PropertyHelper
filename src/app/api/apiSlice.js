import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl : 'https://localhost:44350/api/v1/', //this is the backend  url
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token
        if(token) {
            headers.set("authorization", `Bearer ${token}`)
            // headers.set("Content-Type", `application/json`)
        }
        return headers
    }
}
)

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if(result?.error?.status === 401) {
        console.log('sending refresh token')
        //send refresh token to get new access token
        const refreshResult = await baseQuery('/Auth/GetRefreshToken', api, extraOptions) //the refresh here is the endpoint that refresh token on the backend 
        if(refreshResult?.data?.data) {
            const user = api.getState().auth.user
            //store the new token
            api.dispatch(setCredentials({accessToken: refreshResult.data.data, user}))
            //retry the original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
            console.log("you've been logged out")
        }
    }
    return result 
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth, 
    endpoints: builder => ({})
})