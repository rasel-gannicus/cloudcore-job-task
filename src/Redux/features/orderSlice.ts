import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
    loading: boolean;
    success: boolean;
    error: string | null;
    message: string | null;
}

const initialState: OrderState = {
    loading: false,
    success: false,
    error: null,
    message: null
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setOrderSuccess: (state, action: PayloadAction<string>) => {
            state.success = true;
            state.message = action.payload;
            state.error = null;
            state.loading = false;
        },
        setOrderError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.success = false;
            state.message = null;
            state.loading = false;
        },
        resetOrder: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
            state.message = null;
        }
    }
});

export const { setOrderLoading, setOrderSuccess, setOrderError, resetOrder } = orderSlice.actions;
export default orderSlice.reducer;