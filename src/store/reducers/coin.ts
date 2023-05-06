import { createSlice } from '@reduxjs/toolkit';
import { ActionType } from '@store/models/IActionType';

const initialState = {};

const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    deleteItem: (state, action: ActionType) => {},
    clearItem: state => {}
  }
});

export const { deleteItem, clearItem } = cartReducer.actions;

export default cartReducer.reducer;
