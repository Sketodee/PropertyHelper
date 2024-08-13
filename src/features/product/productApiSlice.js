import { apiSlice } from "../../app/api/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllProduct: builder.mutation({
            query: credentials => {
                const {PageNumber} = credentials;
                const queryParams = new URLSearchParams({ PageNumber}).toString();

                return {
                    url: `/Product/GetAllProducts?${queryParams}`,
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

        getAllProductByFilter: builder.mutation({
            query: credentials => {
                const {Id, Name, PageNumber} = credentials
                const queryParams = new URLSearchParams({Id, Name, PageNumber}).toString();
                return {
                    url: `/Product/GetAllProductsByFilter?${queryParams}`,
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

        addProduct : builder.mutation({
            query : credentials => ({
                url: '/Product/Create',
                method: 'POST', 
                credentials: 'include', 
                body : {...credentials}
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
    useGetAllProductMutation, 
    useGetAllProductByFilterMutation, 
    useAddProductMutation
} = productApiSlice