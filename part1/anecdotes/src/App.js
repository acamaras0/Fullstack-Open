import { useState } from "react";

const Button = ({ handleClick, value }) => {
  return (
    <>
      <button onClick={handleClick}>{value}</button>
    </>
  );
};

const refreshVote = (votes, index) => {
  let Array = [...votes]
  let element = Array[index]
  element = element + 1
  Array[index] = element
  return Array
};

const VotesText = ({ votes }) => <div>has {votes} votes</div>

const MostVoted = ({ix, anecdote, value }) => {
  if (value > 0) return <div>{anecdote[ix]}</div>
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(7).fill(0))
  let maxVotes = Math.max(...votes)
  let Index = votes.indexOf(maxVotes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <VotesText votes={votes[selected]} />
      <Button
        handleClick={() => setVotes(refreshVote(votes, selected))}
        value="vote"
      />
      <Button
        handleClick={() => setSelected(Math.floor(Math.random() * 7))}
        value="next anecdote"
      />
      <h2>Anecdote with most votes</h2>
      <MostVoted value={maxVotes} arr={votes} ix={Index} anecdote={anecdotes} />
      <p>has {maxVotes} votes</p>
    </div>
  )
}

export default App;