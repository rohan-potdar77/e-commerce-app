import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    resetCategoryFilter,
    toggleDisableCategoryFilter,
    updateCategoryFilter,
} from '../redux/slices/filter';
import { RootState } from '../redux/store';
import { Categories } from '../shared/constants';

const categories = [
    'Electronic',
    'Cloth',
    'Furniture',
    'Toy',
    'Mobile',
    'TV',
    'Sport',
    'Computer',
    'Utensil',
    'Other',
    'Shoe',
];

const CategoryFilter = () => {
    const dispatch = useDispatch();

    const { category, isDisabled } = useSelector(
        (state: RootState) => state.filter.categoryFilter
    );

    const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) =>
        dispatch(updateCategoryFilter(event.target.value as Categories));

    const handleChange = () => dispatch(toggleDisableCategoryFilter());

    const clearFilter = () => dispatch(resetCategoryFilter());

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
                    <FormLabel>Category Filter</FormLabel>
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

            <Box display="flex" flexWrap="wrap">
                <RadioGroup
                    row
                    value={category}
                    onChange={handleCategoryChange}
                >
                    {categories?.map(category => (
                        <FormControlLabel
                            key={category}
                            value={category}
                            control={<Radio disabled={isDisabled} />}
                            label={category}
                            sx={{ marginRight: 2, marginBottom: 1 }}
                        />
                    ))}
                </RadioGroup>
            </Box>
        </Box>
    );
};

export default CategoryFilter;
