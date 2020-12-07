const initialState = "";

const getId = () => (100000 * Math.random()).toFixed(0);

var notificationID = "";

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return action.data.message;
    case "REMOVE_NOTIFICATION":
      return initialState;
    default:
      return state;
  }
};

export const newNotification = (message) => {
  return {
    type: "NEW_NOTIFICATION",
    data: { id: getId(), message },
  };
};

export const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION",
  };
};

export const displayNotification = (message, timeout) => {
  return (dispatch) => {
    const action = newNotification(message);

    dispatch(action);
    clearTimeout(notificationID);
    notificationID = setTimeout(() => {
      dispatch(removeNotification());
    }, timeout);
  };
};

export default notificationReducer;
