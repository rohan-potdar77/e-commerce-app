import { FC, memo, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { APP_USERS } from '../shared/constants';
import Unauthorized from './Unauthorized';

interface AuthenticationProps {
	children: ReactNode;
	accessTo: APP_USERS | null;
}

const Authenticate: FC<AuthenticationProps> = ({ children, accessTo }) => {
	const userType = useSelector((state: RootState) => state.storage.userType);
	return userType === accessTo ? <>{children}</> : <Unauthorized />;
};

export default memo(Authenticate);
