import { useDispatch } from "react-redux";
import { createNew } from "../reducers/anecdoteReducer";

const New = () => {
  const dispatch = useDispatch();

  const addNew = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createNew(content));
  };

  return (
    <form onSubmit={addNew}>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
  );
};

export default New;
