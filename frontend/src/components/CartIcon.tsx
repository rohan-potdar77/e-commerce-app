import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton/IconButton';
import { memo } from 'react';
import { Link } from 'react-router-dom';

const CartIcon = () => {
    return (
        <IconButton
            component={Link}
            to="/user/cart"
            color="primary"
            size="medium"
        >
            <Badge badgeContent={1} color="error">
                <ShoppingCartTwoToneIcon />
            </Badge>
        </IconButton>
    );
};

export default memo(CartIcon);
