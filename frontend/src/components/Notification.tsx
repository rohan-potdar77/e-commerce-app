import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert/Alert';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar/Snackbar';
import { memo, SyntheticEvent, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearNotification } from '../redux/slices/notification';
import { RootState } from '../redux/store';

const Notification = () => {
	const dispatch = useDispatch();

	const notification = useSelector((state: RootState) => state.notification);

	const handleClose = useCallback(
		(_event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
			if (reason === 'clickaway') return;
			dispatch(clearNotification());
		},
		[dispatch]
	);

	const action = useMemo(
		() => (
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		),
		[handleClose]
	);

	return (
		<Snackbar
			anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			open={notification.show}
			autoHideDuration={4000}
			TransitionComponent={props => <Slide {...props} direction="left" />}
			action={action}
			onClose={handleClose}
		>
			<Alert
				onClose={handleClose}
				severity={notification.severity}
				variant="standard"
			>
				{notification.message}
			</Alert>
		</Snackbar>
	);
};

export default memo(Notification);
