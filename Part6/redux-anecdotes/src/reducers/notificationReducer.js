import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    hideNotification(state, action) {
      return "";
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const notifications = (text, time) => {
  return (dispatch) => {
    dispatch(showNotification(text));
    setTimeout(() => {
      dispatch(hideNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
