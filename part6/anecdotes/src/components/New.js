import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import anecdoteService from "../service/anecdotes";

const New = () => {
  const dispatch = useDispatch();

  const addNew = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
    dispatch(setNotification(`You created "${content}"`, 5));
  };

  return (
    <form onSubmit={addNew}>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
  );
};

export default New;
