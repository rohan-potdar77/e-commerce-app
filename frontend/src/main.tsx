import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { store } from './redux/store.ts';
import { theme } from './shared/theme.ts';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	</StrictMode>
);
