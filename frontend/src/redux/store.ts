import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage';
import loading from './slices/loading';
import notification from './slices/notification';
import storage from './slices/storage';
import general from './slices/general';
import filter from './slices/filter';

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: storageSession,
  whitelist: ['storage', 'filter'],
};

const rootReducer = combineReducers({
  storage,
  notification,
  loading,
  general,
  filter
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
