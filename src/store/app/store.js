import { configureStore } from '@reduxjs/toolkit';
import { enviroment } from '@shared/enviroment';
import { binanceApiSlice, coinGeckoApiSlice } from '@store/api';

// const stringMiddleware = store => next => action => {
//   if (typeof action === 'string') {
//     return next({
//       type: action
//     });
//   }
//   return next(action);
// };

export default configureStore({
  reducer: {
    [binanceApiSlice.reducerPath]: binanceApiSlice.reducer,
    [coinGeckoApiSlice.reducerPath]: coinGeckoApiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      binanceApiSlice.middleware,
      coinGeckoApiSlice.middleware
    ),
  devTools: enviroment.development
});
