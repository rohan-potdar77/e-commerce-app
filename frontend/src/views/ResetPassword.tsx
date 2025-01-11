import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import Container from '@mui/material/Container/Container';
import Grid2 from '@mui/material/Grid2/Grid2';
import styled from '@mui/material/styles/styled';
import TextField from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography/Typography';
import { FormEvent, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AxiosError, postRequest } from '../api/api';
import { setNotification } from '../redux/slices/notification';
import { ResponseDataStructure } from '../shared/constants';

interface ResetPasswordData {
    newPassword: string | null;
    otp: string | null;
}

const StyledBox = styled(Box)(() => ({
    boxShadow: '4px 4px 14px rgb(100, 100, 100)',
    padding: '2rem',
    gap: '1.3rem',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
}));

const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState<string | null>(null);

    const handleSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const formData = new FormData(event.currentTarget);
            const data: ResetPasswordData = { newPassword: null, otp: null };

            data.newPassword = formData.get('newPassword') as string;
            data.otp = formData.get('otp') as string;

            const reTypePassword = formData.get('reTypePassword') as string;

            if (reTypePassword !== data.newPassword)
                return setError('Password do not match!');
            else setError(null);

            postRequest('/api/public/password/reset', data)
                .then(response => {
                    if (response.status === 200) {
                        navigate('/reset-password');
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
        },
        [dispatch, navigate]
    );

    return (
        <Container maxWidth="xl">
            <form onSubmit={handleSubmit}>
                <Grid2
                    container
                    height="100vh"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid2 size={{ xs: 12, sm: 4 }}>
                        <StyledBox>
                            <Typography variant="h6" color="#808080">
                                Password reset
                            </Typography>

                            <TextField
                                autoFocus
                                required
                                size="small"
                                label="New password"
                                autoComplete="password"
                                name="newPassword"
                                type="password"
                                placeholder="New password..."
                            />

                            <TextField
                                required
                                size="small"
                                label="Re-Type password"
                                autoComplete="password"
                                name="reTypePassword"
                                type="password"
                                placeholder="Retype new password..."
                                error={Boolean(error)}
                                helperText={error}
                            />

                            <Typography variant="body2" color="#808080">
                                Enter the OTP sent to your mail:
                            </Typography>

                            <TextField
                                required
                                size="small"
                                label="OTP"
                                autoComplete="otp"
                                name="otp"
                                type="text"
                                placeholder="Enter OTP..."
                            />

                            <Button type="submit" variant="contained">
                                Submit
                            </Button>
                        </StyledBox>
                    </Grid2>
                </Grid2>
            </form>
        </Container>
    );
};

export default ResetPassword;
