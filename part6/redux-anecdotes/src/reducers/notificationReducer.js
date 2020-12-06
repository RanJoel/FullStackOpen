const initialState = "";

const getId = () => (100000 * Math.random()).toFixed(0);

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

export const removeNotification = (id) => {
  return {
    type: "REMOVE_NOTIFICATION",
    id,
  };
};

export const displayNotification = (message, timeout, level = "") => {
  return (dispatch) => {
    const action = newNotification(message, level);
    const id = action.data.id;

    dispatch(action);

    setTimeout(() => {
      dispatch(removeNotification(id));
    }, timeout);
  };
};

export default notificationReducer;
