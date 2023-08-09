import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.notification);

  useEffect(() => {
    if (content) {
      const timeout = setTimeout(() => {
        dispatch(hideNotification());
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [content, dispatch]);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    display: content ? "block" : "none",
  };

  return <div style={style}>{content}</div>;
};

export default Notification;
