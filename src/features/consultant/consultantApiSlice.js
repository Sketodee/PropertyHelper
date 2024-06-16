import { apiSlice } from "../../app/api/apiSlice";

export const consultantApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllConsultant: builder.mutation({
            query: credentials => {
                const {PageNumber} = credentials;
                const queryParams = new URLSearchParams({ PageNumber}).toString();

                return {
                    url: `/Consultant/GetAllConsultants?${queryParams}`,
                    method: 'GET',
                    credentials: 'include'
                }
            }, 
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    // const {data} = await queryFulfilled
                } catch (error) {
                    console.log(error)
                }
            }
        }), 

        getAllConsultantByFilter : builder.mutation({
            query: credentials => {
                const {queryParam, PageNumber} = credentials
                const queryParams = new URLSearchParams({queryParam, PageNumber}).toString();
                return {
                    url: `/Consultant/GetAllConsultantsByFilter?${queryParams}`,
                    method: 'GET',
                    credentials: 'include'
                }
            },
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
    useGetAllConsultantMutation,
    useGetAllConsultantByFilterMutation
} = consultantApiSlice