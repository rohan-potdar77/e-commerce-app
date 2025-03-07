import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CartIcon from './CartIcon';
import FilterIcon from './FilterIcon';
import ProfileIcon from './ProfileIcon';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	width: '100%',
	border: '1px solid black',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	width: '100%',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		[theme.breakpoints.up('sm')]: {
			width: '20ch',
			'&:focus': { width: '30ch' },
		},
	},
}));

const StyledBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'flex-end',
	width: '40%',
	alignItems: 'center',
	[theme.breakpoints.up('sm')]: {
		columnGap: '10px',
	},
}));

const Header = () => {
	return (
		<AppBar color="default" position="static" sx={{ marginBottom: 2 }}>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography
					component="div"
					variant="h6"
					noWrap
					sx={{ display: { xs: 'none', sm: 'block' } }}
				>
					E-Commerce Application
				</Typography>
				<Search>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
						placeholder="Search…"
						inputProps={{ 'aria-label': 'search' }}
					/>
				</Search>
				<StyledBox>
					<FilterIcon />
					<CartIcon />
					<ProfileIcon />
				</StyledBox>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
