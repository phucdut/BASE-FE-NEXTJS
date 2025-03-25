// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const fetchUserProfile = createAsyncThunk(
//   "user/fetchProfile",
//   async (_, { rejectWithValue }) => {
//     try {
//       const result = await userApiRequest.getProfile();
//       return result.payload;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const logoutUser = createAsyncThunk(
//   "user/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       await authApiRequest.logoutFromNextClientToNextServer();
//       return null;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// interface UserState {
//   account: UserResType | null;
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// const initialState: UserState = {
//   account: null,
//   status: "idle",
//   error: null,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     updatePhoneNumber(state, action) {
//       if (state.account) {
//         state.account.phone_number = action.payload;
//       }
//     },
//     updateDisplayName(state, action) {
//       if (state.account) {
//         state.account.display_name = action.payload; // Cập nhật tên
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserProfile.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchUserProfile.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.account = action.payload;
//       })
//       .addCase(fetchUserProfile.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message || null;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.account = null;
//         state.status = "idle";
//         state.error = null;
//       });
//   },
// });

// export const { updatePhoneNumber, updateDisplayName } = userSlice.actions;

// export default userSlice.reducer;
