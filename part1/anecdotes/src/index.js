import React, { useState } from "react";
import ReactDOM from "react-dom";

const RandomButton = ({ setValue }) => {
  const handleClick = (setValue) => {
    let x = Math.floor(Math.random() * 6);
    setValue(x);
  };
  return <button onClick={() => handleClick(setValue)}>next anecdote</button>;
};

const VoteButton = ({ voteArray, selected, setValue }) => {
  const handleClick = (voteArray, selected, setValue) => {
    const copy = [...voteArray];
    copy[selected] += 1;
    setValue(copy);
  };
  return (
    <button onClick={() => handleClick(voteArray, selected, setValue)}>
      vote
    </button>
  );
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(
    Array.apply(null, new Array(6)).map(Number.prototype.valueOf, 0)
  );
  var max = vote[0];
  var maxIndex = 0;
  for (var i = 1; i < vote.length; i++) {
    if (vote[i] > max) {
      maxIndex = i;
      max = vote[i];
    }
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]}
      <br />
      <>has {vote[selected]} votes</>
      <br />
      <VoteButton voteArray={vote} selected={selected} setValue={setVote} />
      <RandomButton setValue={setSelected} />
      <h2>Anecdote with most votes</h2>
      {props.anecdotes[maxIndex]}
      <br />
      <>has {vote[maxIndex]} votes</>
      <br />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
