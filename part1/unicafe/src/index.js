import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad;
  let average = (good - bad) / all;
  let positive = good / all;
  return all !== 0 ? (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={positive} />
      </tbody>
    </table>
  ) : (
    <>No feedback given</>
  );
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ value, setValue, name }) => {
  const handleClick = (value, setValue) => {
    setValue(value + 1);
  };

  return <button onClick={() => handleClick(value, setValue)}>{name}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>give feedback</h2>
      <Button value={good} setValue={setGood} name="good" />
      <Button value={neutral} setValue={setNeutral} name="neutral" />
      <Button value={bad} setValue={setBad} name="bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
