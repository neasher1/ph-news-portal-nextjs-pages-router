import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    endpoints: (builder) => ({
        getAllNewses: builder.query({
            query: () => `/news`,
        }),
        getNewsesById: builder.query({
            query: (id) => ({ url: `news/${id}` }),
        }),
    }),
})

export const { useGetAllNewsesQuery, useGetNewsesByIdQuery } = apiSlice