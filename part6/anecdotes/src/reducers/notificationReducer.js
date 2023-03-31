import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    handleNotification(state, action) {
      return action.payload;
    },
  },
});

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch(handleNotification(notification));
    setTimeout(() => {
      dispatch(handleNotification(""));
    }, time * 1000);
  };
};

export const { handleNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
