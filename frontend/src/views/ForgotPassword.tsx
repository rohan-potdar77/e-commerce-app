import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import Container from '@mui/material/Container/Container';
import Grid2 from '@mui/material/Grid2/Grid2';
import styled from '@mui/material/styles/styled';
import TextField from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography/Typography';
import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AxiosError, postRequest } from '../api/api';
import { setNotification } from '../redux/slices/notification';
import { ResponseDataStructure } from '../shared/constants';

interface EmailOtpData {
    email: string | null;
}

const StyledBox = styled(Box)(() => ({
    boxShadow: '4px 4px 14px rgb(100, 100, 100)',
    padding: '2rem',
    width: '65%',
    height: '250px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '2rem',
}));

const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data: EmailOtpData = { email: null };
        data.email = formData.get('email') as string;

        postRequest('/api/public/password/forgot', data)
            .then(response => {
                if (response.status === 200) {
                    navigate('/reset-password', { replace: true });
                } else {
                    dispatch(
                        setNotification({
                            message: response.statusText,
                            severity: 'warning',
                        })
                    );
                }
            })
            .catch((error: AxiosError<ResponseDataStructure>) =>
                dispatch(
                    setNotification({
                        message:
                            error.response?.data.message ??
                            'Something went wrong!',
                        severity: 'error',
                    })
                )
            );
    };

    return (
        <Container maxWidth="xl">
            <form onSubmit={handleSubmit}>
                <Grid2
                    container
                    height="100vh"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid2
                        size={{ xs: 12, sm: 6 }}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <StyledBox>
                            <Typography variant="h6" color="#808080">
                                Your registered e-mail
                            </Typography>

                            <TextField
                                autoFocus
                                required
                                size="small"
                                label="Email"
                                autoComplete="email"
                                name="email"
                                type="email"
                                placeholder="example@xyz.com"
                            />

                            <Button type="submit" variant="contained">
                                Send OTP
                            </Button>
                        </StyledBox>
                    </Grid2>
                </Grid2>
            </form>
        </Container>
    );
};

export default ForgotPassword;
