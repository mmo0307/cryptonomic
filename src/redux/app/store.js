import { binanceApiSlice } from '@api/binanceApi';
import { configureStore } from '@reduxjs/toolkit';

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
    [binanceApiSlice.reducerPath]: binanceApiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(binanceApiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production'
});
