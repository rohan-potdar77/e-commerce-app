import { Link as MuiLink } from '@mui/material';
import { Fragment, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutReset } from '../redux/slices/filter';
import { inValidateUser } from '../redux/slices/storage';
import { RootState } from '../redux/store';
import { APP_USERS } from '../shared/constants';

const Unauthorized = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userType, isValid } = useSelector(
        (state: RootState) => state.storage
    );

    const showBackButton = useMemo(
        () =>
            (userType === APP_USERS.ADMINISTRATOR ||
                userType === APP_USERS.USER) &&
            isValid,
        [userType, isValid]
    );

    useEffect(() => {
        if (!showBackButton) {
            dispatch(logoutReset());
            dispatch(inValidateUser());
            navigate('/login', { replace: true });
        }
    }, [showBackButton, dispatch, navigate]);

    return (
        <Fragment>
            <h2>You're not authorized to access this page!</h2>
            {showBackButton && (
                <MuiLink
                    component="button"
                    underline="hover"
                    fontSize="1rem"
                    onClick={() => navigate(-1)}
                    style={{ display: 'block', textAlign: 'center' }}
                >
                    Back
                </MuiLink>
            )}
        </Fragment>
    );
};

export default Unauthorized;
