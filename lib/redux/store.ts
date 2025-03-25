// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // mặc định dùng localStorage

// import userReducer from "../redux/features/userSlice";

// // Cấu hình persist
// const persistConfig = {
//   key: "root", // Tên key trong localStorage
//   storage, // Sử dụng localStorage
//   whitelist: ["user", "organization", "role"], // Chỉ persist các slice này, bỏ location nếu không cần
// };

// // Kết hợp các reducer
// const rootReducer = combineReducers({
//   user: userReducer,
// });

// // Áp dụng persistReducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Tạo store
// export const makeStore = () => {
//   return configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: {
//           // Bỏ qua kiểm tra serializable cho các action của redux-persist
//           ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
//         },
//       }),
//   });
// };

// // Export các type
// export type AppStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];

// // Tạo store instance và persistor
// export const store = makeStore();
// export const persistor = persistStore(store);
