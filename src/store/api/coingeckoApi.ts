import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const coinGeckoApiSlice = createApi({
  reducerPath: 'coinGeckoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coingecko.com/api/v3' }),
  // tagTypes: ['CoinGecko'],
  endpoints: builder => ({
    getCoins: builder.query({
      query: arg => ({
        url: `/coins/markets`, //?vs_currency=usd&order=market_cap_desc&per_page=100
        params: { ...arg }
      })
      // providesTags: ['CoinGecko']
    }),
    getCoin: builder.query({
      query: ({ id, market_data, community_data }) => ({
        url: `/coins/${id}?market_data=${market_data}&community_data=${community_data}`
      })
      // providesTags: ['CoinGecko']
    }),
    getMarketChart: builder.query({
      query: ({ id, currency, days }) => ({
        url: `/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
      })
      // providesTags: ['CoinGecko']
    })
    // createHero: builder.mutation({
    //   query: (hero, _limit) => ({
    //     url: '/heroes',
    //     method: 'POST',
    // params: {
    //  limit: _limit
    // }
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

export const { useGetCoinsQuery, useGetCoinQuery, useGetMarketChartQuery } =
  coinGeckoApiSlice;
