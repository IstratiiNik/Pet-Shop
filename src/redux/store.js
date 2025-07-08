import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { petReducer } from "./petSlice";

// Persist config for pet slice
const petPersistConfig = {
  key: "pet",
  storage,
  whitelist: ["categories", "products"],
};

// Create persisted reducer
const persistedReducer = persistReducer(petPersistConfig, petReducer);

// Configure Redux store
export const store = configureStore({
  reducer: {
    pet: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create persistor for store
export const persisto = persistStore(store);
