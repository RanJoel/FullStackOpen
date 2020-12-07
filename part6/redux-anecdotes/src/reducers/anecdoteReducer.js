import anecdoteService from "../services/anecdote";

const anecdoteReducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "INIT_ANECDOTES":
      return action.data;
    case "NEW_ANECDOTE":
      return state.concat(action.data);
    case "VOTE":
      const id = action.data.id;
      const anecdoteToChange = state.find((n) => n.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    default:
      return state;
  }
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    console.log(anecdotes);
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export const createAnecdote = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "NEW_ANECDOTE",
      data,
    });
  };
};

export const voteAnecdote = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "VOTE",
      data,
    });
  };
};

export default anecdoteReducer;
