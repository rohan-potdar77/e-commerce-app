import { FC, Fragment } from 'react';

interface ErrorFallbackProps {
    error: Error | null;
}

const ErrorFallback: FC<ErrorFallbackProps> = ({ error }) => {
    return (
        <Fragment>
            <h2>Something went wrong.. Please try again later..!</h2>
            <h3>{error?.name}</h3>
            <h4>{error?.message}</h4>
            <p>{error?.stack}</p>
        </Fragment>
    );
};

export default ErrorFallback;
