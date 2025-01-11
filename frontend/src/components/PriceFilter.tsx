import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel/FormLabel';
import Slider from '@mui/material/Slider';
import { Mark } from '@mui/material/Slider/useSlider.types';
import { memo, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    resetPriceFilter,
    toggleDisablePriceFilter,
    updatePriceFilter,
} from '../redux/slices/filter';
import { RootState } from '../redux/store';
import { FilterConfig } from '../shared/constants';

const generateMarks = () => {
    const marks: Mark[] = [];
    for (let i = 0; i <= FilterConfig.MAX_PRICE; i += FilterConfig.INTERVAL) {
        marks.push({ value: i, label: i.toString() });
    }
    marks.push({
        value: FilterConfig.MAX_PRICE,
        label: FilterConfig.MAX_PRICE.toString(),
    });
    return marks;
};

const PriceFilter = () => {
    const dispatch = useDispatch();

    const { minPrice, maxPrice, isDisabled } = useSelector(
        (state: RootState) => state.filter.priceFilter
    );

    const handleSliderChangeCommitted = (
        _event: Event | SyntheticEvent<Element, Event>,
        values: number | number[]
    ) => {
        if (Array.isArray(values))
            dispatch(
                updatePriceFilter({ minPrice: values[0], maxPrice: values[1] })
            );
    };

    const handleChange = () => dispatch(toggleDisablePriceFilter());

    const clearFilter = () => dispatch(resetPriceFilter());

    return (
        <Box
            display="flex"
            flexDirection="column"
            flexGrow={1}
            paddingX={3}
            rowGap={4}
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Box display="flex" alignItems="center" gap={2}>
                    <FormLabel>Price Filter</FormLabel>
                    <Checkbox
                        checked={!isDisabled}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Box>
                <Button
                    disabled={isDisabled}
                    size="small"
                    variant="outlined"
                    onClick={clearFilter}
                >
                    Clear
                </Button>
            </Box>

            <Box>
                <Slider
                    disabled={isDisabled}
                    disableSwap
                    valueLabelDisplay="auto"
                    min={FilterConfig.MIN_PRICE}
                    max={FilterConfig.MAX_PRICE}
                    value={[minPrice, maxPrice]}
                    onChangeCommitted={handleSliderChangeCommitted}
                    marks={generateMarks()}
                />
            </Box>
        </Box>
    );
};

export default memo(PriceFilter);
