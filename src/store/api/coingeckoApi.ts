import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const coingeckoApiSlice = createApi({
  reducerPath: 'coingeckoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coingecko.com/api/v3' }),
  tagTypes: ['CoinGecko'],
  endpoints: builder => ({
    getCoins: builder.query({
      query: () => '/coins',
      providesTags: ['CoinGecko']
    })
    // createHero: builder.mutation({
    //   query: hero => ({
    //     url: '/heroes',
    //     method: 'POST',
    //     body: hero
    //   }),
    //   invalidatesTags: ['CoinGecko']
    // }),
    // deleteHero: builder.mutation({
    //   query: id => ({
    //     url: `/heroes/${id}`,
    //     method: 'DELETE'
    //   }),
    //   invalidatesTags: ['CoinGecko']
    // })
  })
});
