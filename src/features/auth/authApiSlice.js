import { apiSlice } from "../../app/api/apiSlice";
import { setCredentials, logOut } from "./authSlice";

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


        refresh: builder.mutation({
            query: () => ({
                url: '/Auth/GetRefreshToken', 
                method: 'GET',
                credentials: 'include', 
            }), 
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                    const refToken = data?.data
                    dispatch(setCredentials({accessToken: refToken}))
                } catch (error) {
                    console.log(error)
                }
            }
        }), 


        getuser : builder.mutation({
            query: () => ({
                url: '/Auth/GetLoggedInUser', 
                method: 'GET',
                credentials: 'include', 
            }), 
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                    const persistUser = data?.data?.fullName
                    dispatch(setCredentials({user: persistUser}))
                } catch (error) {
                    console.log(error)
                }
            }
        }), 


        logout : builder.mutation({
            query: () => ({
                url: '/Auth/Logout', 
                method: 'POST',
                credentials: 'include', 
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    await queryFulfilled
                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (error) {
                    console.log(error)
                }
            }
        }), 

        getAllAdmins : builder.mutation({
            query: () => ({
                url: '/Auth/GetAllAdmins', 
                method: 'GET',
                credentials: 'include', 
            }), 
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    // const {data} = await queryFulfilled
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
})

export const {
    useLoginMutation,
    useRefreshMutation, 
    useGetuserMutation, 
    useGetAllAdminsMutation
} = authApiSlice