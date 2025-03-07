import { Link as MuiLink } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

const NotFound = () => {
	const navigate = useNavigate();
	const handleBack = () => navigate(-1);
	return (
		<Fragment>
			<h2>Page not found!</h2>
			<MuiLink
				component="button"
				underline="hover"
				fontSize="1rem"
				onClick={handleBack}
			>
				Back
			</MuiLink>
		</Fragment>
	);
};

export default NotFound;
