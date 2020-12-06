import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  newNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  console.log(filter);
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);
  const anecdotesToShow = sortedAnecdotes.filter((a) => {
    if (filter === "") return true;
    return a.content.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotesToShow.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(voteAnecdote(anecdote.id));
            const message = `You voted for "${anecdote.content}"`;
            dispatch(newNotification(message));
            setTimeout(() => {
              dispatch(removeNotification(anecdote.id));
            }, 5000);
          }}
        />
      ))}
    </>
  );
};

export default AnecdoteList;
