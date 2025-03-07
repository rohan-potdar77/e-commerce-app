import { Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

const Website = () => {
	return (
		<Fragment>
			<h3>Website</h3>
			<MuiLink
				component={Link}
				to={'/login'}
				underline="hover"
				fontSize="0.85rem"
			>
				Login
			</MuiLink>
		</Fragment>
	);
};

export default Website;
