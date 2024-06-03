import { configureStore, combineReducers } from "@reduxjs/toolkit";
import ContestantsReducer from "./ContestantsSlice";
import videoReducer from "./videoSlice";
import AdminReducer from "./AdminSlice";
import deadlineReducer from "./Deadline";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: ContestantsReducer,
  video: videoReducer,
  admin: AdminReducer,
  deadline: deadlineReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
