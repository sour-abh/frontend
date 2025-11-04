import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from './AuthSlice'

const authPersistConfig = {
  key: "auth",
  storage: storage, // Always assign storage for web
  whitelist: ["user", "token", "isLoggedIn"],
};
const rootReducer=combineReducers({
    auth:persistReducer(authPersistConfig,authReducer)
})

export const makeStore=()=>{

    return configureStore({
        reducer:rootReducer,
                middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
              serializableCheck: {
                ignoredActions: [
                  FLUSH,
                  REHYDRATE,
                  PAUSE,
                  PERSIST,
                  PURGE,
                  REGISTER,
                ],
              },
            }),

    })

}
export const store=makeStore()
export const persistor=persistStore(store)
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];