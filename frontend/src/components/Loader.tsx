import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import styled from '@mui/material/styles/styled';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
	color: '#fff',
	zIndex: theme.zIndex.drawer + 1,
}));

const Loader = () => {
	const isLoading = useSelector(
		(state: RootState) => state.loading.isLoading
	);
	return (
		<StyledBackdrop open={isLoading}>
			<CircularProgress color="inherit" />
		</StyledBackdrop>
	);
};

export default Loader;
