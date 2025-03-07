import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Anchor, CartItem, Product } from '../../shared/constants';

interface General {
	filterDrawerAnchor?: Anchor;
	filterDrawerState: boolean;
	cart: CartItem[];
	products: Product[];
}

const initialState: General = {
	filterDrawerAnchor: 'bottom',
	filterDrawerState: false,
	cart: [],
	products: [],
};

const general = createSlice({
	name: 'general',
	initialState,
	reducers: {
		toggleDrawer: state => {
			state.filterDrawerState = !state.filterDrawerState;
		},
		setCartData: (state, action: PayloadAction<CartItem[]>) => {
			state.cart = action.payload;
		},
		setProductData: (state, action: PayloadAction<Product[]>) => {
			state.products = action.payload;
		},
	},
});

export const { toggleDrawer, setCartData, setProductData } = general.actions;

export default general.reducer;
