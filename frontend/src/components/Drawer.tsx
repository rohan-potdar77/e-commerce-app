import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDrawer } from '../redux/slices/general';
import { RootState } from '../redux/store';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';

const Drawer = () => {
    const dispatch = useDispatch();

    const general = useSelector((state: RootState) => state.general);

    return (
        <SwipeableDrawer
            anchor={general.filterDrawerAnchor}
            open={general.filterDrawerState}
            onClose={() => dispatch(toggleDrawer())}
            onOpen={() => dispatch(toggleDrawer())}
        >
            <List>
                <ListItem sx={{ paddingY: 2, justifyContent: 'center' }}>
                    <PriceFilter />
                </ListItem>
                <Divider />
                <ListItem sx={{ paddingY: 2, justifyContent: 'center' }}>
                    <CategoryFilter />
                </ListItem>
            </List>
        </SwipeableDrawer>
    );
};

export default memo(Drawer);
