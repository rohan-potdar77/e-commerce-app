import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import Grid2 from '@mui/material/Grid2/Grid2';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError, AxiosResponse, getRequest } from '../api/api';
import { setProductData } from '../redux/slices/general';
import { startLoading, stopLoading } from '../redux/slices/loading';
import { setNotification } from '../redux/slices/notification';
import { RootState } from '../redux/store';
import { Product, ResponseDataStructure } from '../shared/constants';

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}

interface ProductCardProps {
	product: Product;
}

const ExpandMore = styled((props: ExpandMoreProps) => (
	<IconButton {...props} />
))(({ theme }) => ({
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
	variants: [
		{
			props: ({ expand }) => !expand,
			style: {
				transform: 'rotate(0deg)',
			},
		},
		{
			props: ({ expand }) => !!expand,
			style: {
				transform: 'rotate(180deg)',
			},
		},
	],
}));

const ProductCard: FC<ProductCardProps> = ({ product }) => {
	const [expanded, setExpanded] = useState<boolean>(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Box display="flex" justifyContent="center">
			<Card
				sx={{
					width: '90%',
					// height: '420px',
					boxShadow: '1px 1px 4px 0px gray',
				}}
			>
				<CardHeader
					avatar={
						<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
							{product.productName.charAt(0)}
						</Avatar>
					}
					action={
						<IconButton aria-label="settings">
							<MoreVertIcon />
						</IconButton>
					}
					title="Shrimp and Chorizo Paella"
					subheader="September 14, 2016"
				/>

				<CardMedia
					component="img"
					height="194"
					image="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600"
					alt="green iguana"
					loading="lazy"
				/>

				<CardContent>
					<Typography
						variant="body2"
						sx={{ color: 'text.secondary' }}
					>
						{product.productDescription}
					</Typography>
				</CardContent>

				<CardActions disableSpacing>
					<IconButton aria-label="add to favorites">
						<FavoriteIcon />
					</IconButton>
					<IconButton aria-label="share">
						<ShareIcon />
					</IconButton>
					<ExpandMore
						expand={expanded}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</ExpandMore>
				</CardActions>

				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<CardContent>
						<Typography sx={{ marginBottom: 2 }}>
							Method:
						</Typography>
						<Typography sx={{ marginBottom: 2 }}>
							Heat 1/2 cup of the broth in a pot until simmering,
							add saffron and set aside for 10 minutes.
						</Typography>
						<Typography sx={{ marginBottom: 2 }}>
							Heat oil in a (14- to 16-inch) paella pan or a
							large, deep skillet over medium-high heat. Add
							chicken, shrimp and chorizo, and cook, stirring
							occasionally until lightly browned, 6 to 8 minutes.
							Transfer shrimp to a large plate and set aside,
							leaving chicken and chorizo in the pan. Add
							pimentón, bay leaves, garlic, tomatoes, onion, salt
							and pepper, and cook, stirring often until thickened
							and fragrant, about 10 minutes. Add saffron broth
							and remaining 4 1/2 cups chicken broth; bring to a
							boil.
						</Typography>
						<Typography sx={{ marginBottom: 2 }}>
							Add rice and stir very gently to distribute. Top
							with artichokes and peppers, and cook without
							stirring, until most of the liquid is absorbed, 15
							to 18 minutes. Reduce heat to medium-low, add
							reserved shrimp and mussels, tucking them down into
							the rice, and cook again without stirring, until
							mussels have opened and rice is just tender, 5 to 7
							minutes more. (Discard any mussels that don&apos;t
							open.)
						</Typography>
						<Typography>
							Set aside off of the heat to let rest for 10
							minutes, and then serve.
						</Typography>
					</CardContent>
				</Collapse>
			</Card>
		</Box>
	);
};

const Products = () => {
	const dispatch = useDispatch();

	const { filter, general } = useSelector((state: RootState) => ({
		filter: state.filter,
		general: state.general,
	}));

	useEffect(() => {
		dispatch(startLoading());

		getRequest('/api/private/product', {
			params: {
				category: filter.categoryFilter.category,
				minPrice: filter.priceFilter.minPrice,
				maxPrice: filter.priceFilter.maxPrice,
				page: 1,
				limit: 10,
			},
		})
			.then((response: AxiosResponse<ResponseDataStructure>) => {
				if (response.status === 200) {
					dispatch(setProductData(response.data.data as Product[]));
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
	}, [
		dispatch,
		filter.categoryFilter.category,
		filter.priceFilter.maxPrice,
		filter.priceFilter.minPrice,
	]);

	return (
		<Grid2 container paddingY={2} rowGap={3}>
			{general.products.map(product => (
				<Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product._id}>
					<ProductCard product={product} />
				</Grid2>
			))}
		</Grid2>
	);
};

export default Products;
