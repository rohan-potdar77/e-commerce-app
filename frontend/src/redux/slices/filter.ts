import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Categories, FilterConfig } from '../../shared/constants';

interface PriceFilter {
    minPrice: number;
    maxPrice: number;
    isDisabled: boolean;
}

interface CategoryFilter {
    category: Categories | null;
    isDisabled: boolean;
}

interface Filter {
    priceFilter: PriceFilter;
    categoryFilter: CategoryFilter;
}

const initialState: Filter = {
    priceFilter: {
        minPrice: FilterConfig.MIN_PRICE,
        maxPrice: FilterConfig.MAX_PRICE,
        isDisabled: true,
    },
    categoryFilter: {
        category: null,
        isDisabled: true,
    },
};

const filter = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        updatePriceFilter: (
            state,
            action: PayloadAction<Omit<PriceFilter, 'isDisabled'>>
        ) => {
            state.priceFilter.minPrice = action.payload.minPrice;
            state.priceFilter.maxPrice = action.payload.maxPrice;
        },
        resetPriceFilter: state => {
            state.priceFilter.minPrice = initialState.priceFilter.minPrice;
            state.priceFilter.maxPrice = initialState.priceFilter.maxPrice;
        },
        toggleDisablePriceFilter: state => {
            state.priceFilter.isDisabled = !state.priceFilter.isDisabled;
        },
        updateCategoryFilter: (state, action: PayloadAction<Categories>) => {
            state.categoryFilter.category = action.payload;
        },
        resetCategoryFilter: state => {
            state.categoryFilter.category =
                initialState.categoryFilter.category;
        },
        toggleDisableCategoryFilter: state => {
            state.categoryFilter.isDisabled = !state.categoryFilter.isDisabled;
        },
        logoutReset: state => {
            state.categoryFilter.category =
                initialState.categoryFilter.category;
            state.categoryFilter.isDisabled =
                initialState.categoryFilter.isDisabled;
            state.priceFilter.maxPrice = initialState.priceFilter.maxPrice;
            state.priceFilter.minPrice = initialState.priceFilter.minPrice;
            state.priceFilter.isDisabled = initialState.priceFilter.isDisabled;
        },
    },
});

export const {
    updatePriceFilter,
    resetPriceFilter,
    toggleDisablePriceFilter,
    updateCategoryFilter,
    resetCategoryFilter,
    toggleDisableCategoryFilter,
    logoutReset,
} = filter.actions;

export default filter.reducer;
