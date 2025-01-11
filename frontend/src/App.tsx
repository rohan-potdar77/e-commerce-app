import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/Loader';
import Notification from './components/Notification';
import Routes from './components/Routes';

const App = () => {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <Suspense fallback={<Loader />}>
                    <Routes />
                    <Loader />
                    <Notification />
                </Suspense>
            </ErrorBoundary>
        </BrowserRouter>
    );
};

export default App;
