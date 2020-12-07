import React from "react";
//import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { displayNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdote";

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

const AnecdoteList = (props) => {
  //const dispatch = useDispatch();
  const anecdotes = props.anecdotes;
  const filter = props.filter;
  //console.log(filter);
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
          handleClick={async () => {
            const updatedAnecdote = await anecdoteService.update(anecdote.id, {
              ...anecdote,
              votes: anecdote.votes + 1,
            });
            props.voteAnecdote(updatedAnecdote);
            const message = `You voted for "${anecdote.content}"`;
            props.displayNotification(message, 5000);
          }}
        />
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  voteAnecdote,
  displayNotification,
};

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdotes;
