import { Link as MuiLink } from '@mui/material';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import Container from '@mui/material/Container/Container';
import Grid2 from '@mui/material/Grid2/Grid2';
import styled from '@mui/material/styles/styled';
import TextField from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography/Typography';
import { FormEvent, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError, postRequest } from '../api/api';
import { startLoading, stopLoading } from '../redux/slices/loading';
import { setNotification } from '../redux/slices/notification';
import { validateUser } from '../redux/slices/storage';
import { RootState } from '../redux/store';
import { APP_USERS, ResponseDataStructure } from '../shared/constants';

interface LoginCredential {
    userName: string | null;
    password: string | null;
}

const StyledBox = styled(Box)(({ theme }) => ({
    boxShadow: '4px 4px 14px rgb(100, 100, 100)',
    width: '65%',
    padding: '3rem',
    gap: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
        width: '80%',
    },
}));

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userType, isValid } = useSelector(
        (state: RootState) => state.storage
    );

    const handleSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const formData = new FormData(event.currentTarget);
            const data: LoginCredential = { userName: null, password: null };

            data.userName = formData.get('userName') as string;
            data.password = formData.get('password') as string;

            dispatch(startLoading());

            postRequest('/api/public/sign-in', data)
                .then(response => {
                    if (response.status === 200) {
                        dispatch(validateUser(response.data.data));
                        dispatch(
                            setNotification({
                                message: 'Login successful!',
                                severity: 'success',
                            })
                        );
                    }
                })
                .catch((error: AxiosError<ResponseDataStructure>) => {
                    dispatch(
                        setNotification({
                            message:
                                error.response?.data.message ??
                                'Something went wrong!',
                            severity: 'error',
                        })
                    );
                })
                .finally(() => dispatch(stopLoading()));
        },
        [dispatch]
    );

    useEffect(() => {
        if (userType === APP_USERS.ADMINISTRATOR && isValid) {
            navigate('/administrator/home', { replace: true });
        } else if (userType === APP_USERS.USER && isValid) {
            navigate('/user/home', { replace: true });
        }
    }, [navigate, userType, isValid]);

    return (
        <Container maxWidth="xl">
            <form onSubmit={handleSubmit}>
                <Grid2 container height="100vh">
                    <Grid2 size={{ xs: 12, md: 6 }}></Grid2>

                    <Grid2
                        size={{ xs: 12, md: 6 }}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <StyledBox>
                            <Typography variant="h6" color="#808080">
                                Login
                            </Typography>

                            <TextField
                                autoFocus
                                required
                                size="small"
                                label="Username"
                                autoComplete="username"
                                name="userName"
                                type="text"
                                placeholder="user123..."
                            />

                            <TextField
                                required
                                size="small"
                                label="Password"
                                autoComplete="password"
                                name="password"
                                type="password"
                                placeholder="xyz#6438..."
                            />

                            <MuiLink
                                component={Link}
                                to="/forgot-password"
                                underline="hover"
                                fontSize="0.85rem"
                                alignSelf="end"
                            >
                                Forgot password?
                            </MuiLink>

                            <Button
                                size="medium"
                                variant="contained"
                                type="submit"
                            >
                                Login
                            </Button>
                        </StyledBox>
                    </Grid2>
                </Grid2>
            </form>
        </Container>
    );
};

export default Login;
