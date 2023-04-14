import { configureStore } from '@reduxjs/toolkit';
import { enviroment } from '@shared/enviroment';
import { binanceApiSlice } from '@store/api';

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
  devTools: enviroment.development
});
