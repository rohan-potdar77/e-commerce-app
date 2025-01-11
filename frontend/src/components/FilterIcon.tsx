import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IconButton from '@mui/material/IconButton/IconButton';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { toggleDrawer } from '../redux/slices/general';

const FilterIcon = () => {
    const dispatch = useDispatch();

    const drawerToggler = () => {
        dispatch(toggleDrawer());
    };

    return (
        <IconButton size="medium" color="info" onClick={drawerToggler}>
            <FilterAltIcon />
        </IconButton>
    );
};

export default memo(FilterIcon);
