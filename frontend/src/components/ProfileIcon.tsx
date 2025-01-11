import Logout from '@mui/icons-material/Logout';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Fragment, memo, MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startLoading, stopLoading } from '../redux/slices/loading';
import { inValidateUser } from '../redux/slices/storage';
import { setNotification } from '../redux/slices/notification';
import { logoutReset } from '../redux/slices/filter';
import { AxiosError, postRequest } from '../api/api';
import { ResponseDataStructure } from '../shared/constants';

const ProfileIcon = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSubmit = () => {
        setAnchorEl(null);
        dispatch(startLoading());
        postRequest('/api/private/sign-out', undefined)
            .then(response => {
                if (response.status === 204) {
                    dispatch(inValidateUser());
                    dispatch(logoutReset());
                    navigate('/login', { replace: true });
                    dispatch(
                        setNotification({
                            message: 'You have been logged out!',
                            severity: 'info',
                        })
                    );
                }
            })
            .catch((error: AxiosError<ResponseDataStructure>) => {
                dispatch(
                    setNotification({
                        message: error.response?.data.message,
                        severity: 'info',
                    })
                );
            })
            .finally(() => {
                dispatch(stopLoading());
            });
    };

    return (
        <Fragment>
            <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar sx={{ width: 30, height: 30 }} />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={() => setAnchorEl(null)}
                onClick={() => setAnchorEl(null)}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => setAnchorEl(null)}>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => setAnchorEl(null)}>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleSubmit}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Fragment>
    );
};

export default memo(ProfileIcon);
