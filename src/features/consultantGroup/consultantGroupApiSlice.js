import { apiSlice } from "../../app/api/apiSlice";

export const consultantGroupApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllConsultantGroup: builder.mutation({
            query: credentials => {
                return {
                    url: `/ConsultantGroup/GetAllConsultantGroup`, 
                    method: 'GET', 
                    credential: 'include',
                    body: {...credentials}, 
                }
            },
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
})

export const {
    useGetAllConsultantGroupMutation
} = consultantGroupApiSlice