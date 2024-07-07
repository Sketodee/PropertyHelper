import { apiSlice } from "../../app/api/apiSlice";

export const consultantGroupApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllConsultantGroup: builder.mutation({
            query: credentials => {
                const {PageNumber} = credentials;
                const queryParams = new URLSearchParams({ PageNumber}).toString();
                return {
                    url: `/ConsultantGroup/GetAllConsultantGroup?${queryParams}`, 
                    method: 'GET', 
                    credential: 'include',
                    // body: {...credentials}, 
                }
            },
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                } catch (error) {
                    console.log(error)
                }
            }
        }), 

        getAllConsultantGroupByFilter : builder.mutation({
            query: credentials => {
                const {Id, queryParam, PageNumber} = credentials
                const queryParams = new URLSearchParams({Id, queryParam, PageNumber}).toString();
                return {
                    url: `/ConsultantGroup/GetConsultantGroupByFilter?${queryParams}`,
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

        getMembersOfConsultantGroup: builder.mutation({
            query: credentials => {
                const {groupId, PageNumber} = credentials
                const queryParams = new URLSearchParams({groupId, PageNumber}).toString();
                return {
                    url: `/ConsultantGroup/GetMembersOfConsultantGroup?${queryParams}`,
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
    useGetAllConsultantGroupMutation, 
    useGetAllConsultantGroupByFilterMutation, 
    useGetMembersOfConsultantGroupMutation
} = consultantGroupApiSlice