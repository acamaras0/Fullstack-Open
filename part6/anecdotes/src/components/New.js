import { useDispatch } from "react-redux";
import { createNew } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const New = () => {
  const dispatch = useDispatch();

  const addNew = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createNew(content));
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
