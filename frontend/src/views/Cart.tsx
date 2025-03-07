import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid2 from '@mui/material/Grid2/Grid2';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError, AxiosResponse, getRequest } from '../api/api';
import { setCartData } from '../redux/slices/general';
import { setNotification } from '../redux/slices/notification';
import { RootState } from '../redux/store';
import { CartItem, ResponseDataStructure } from '../shared/constants';
import { startLoading, stopLoading } from '../redux/slices/loading';

interface CartProps {
	item: CartItem;
}

const CartItemCard: FC<CartProps> = ({ item }) => {
	return (
		<Card sx={{ width: '90%', boxShadow: '4px 4px 16px 1px gray' }}>
			<CardActionArea>
				<CardMedia
					component="img"
					height="170"
					image="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600"
					alt="green iguana"
					loading="lazy"
				/>
				<CardContent sx={{ height: 130 }}>
					<Typography gutterBottom variant="h6" component="h6">
						{item.product.productName}
					</Typography>
					<Typography variant="body1" color="textPrimary">
						{item.product.productBrand}
					</Typography>
					<Typography variant="body2" color="textSecondary">
						{item.product.productDescription}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					height: 50,
				}}
			>
				<Button
					size="small"
					color="primary"
					variant="text"
					startIcon={<AddIcon />}
				>
					Add
				</Button>
				<Button
					size="small"
					color="primary"
					variant="text"
					startIcon={<RemoveIcon />}
				>
					Remove
				</Button>
			</CardActions>
		</Card>
	);
};

const Cart = () => {
	const dispatch = useDispatch();
	const { cart } = useSelector((state: RootState) => state.general);

	useEffect(() => {
		dispatch(startLoading());

		getRequest('/api/private/cart-item')
			.then((response: AxiosResponse<ResponseDataStructure>) => {
				if (response.status === 200) {
					dispatch(setCartData(response.data.data as CartItem[]));
				}
			})
			.catch((error: AxiosError<ResponseDataStructure>) => {
				dispatch(
					setNotification({
						message: error.response?.data.message,
						severity: 'error',
					})
				);
			})
			.finally(() => dispatch(stopLoading()));
	}, [dispatch]);

	return (
		<Grid2 container paddingY={2} rowGap={3}>
			{cart?.map(item => (
				<Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item._id}>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
					>
						<CartItemCard item={item} />
					</Box>
				</Grid2>
			))}
		</Grid2>
	);
};

export default Cart;
