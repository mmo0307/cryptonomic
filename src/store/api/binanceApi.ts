import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const binanceApiSlice = createApi({
  reducerPath: 'binanceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Coins'],
  endpoints: builder => ({
    getHeroes: builder.query({
      query: () => '/heroes',
      providesTags: ['Coins']
    }),
    createHero: builder.mutation({
      query: hero => ({
        url: '/heroes',
        method: 'POST',
        body: hero
      }),
      invalidatesTags: ['Coins']
    }),
    deleteHero: builder.mutation({
      query: id => ({
        url: `/heroes/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Coins']
    })
  })
});

export const {
  useGetHeroesQuery,
  useCreateHeroMutation,
  useDeleteHeroMutation
} = binanceApiSlice;
