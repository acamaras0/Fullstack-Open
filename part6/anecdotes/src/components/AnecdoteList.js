import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";

const List = () => {
  const anecdotes = useSelector((state) => state.anecdotes);

  const filter = useSelector((state) => state.filter);

  const filteredAnecdotes =
    filter !== null
      ? anecdotes.filter((anecdote) => anecdote.content.includes(filter))
      : anecdotes;

  const sortedAnecdotes = [...filteredAnecdotes].sort(
    (a, b) => b.votes - a.votes
  );

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(addVote(id));
  };
  return (
    <div>
      {sortedAnecdotes?.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
