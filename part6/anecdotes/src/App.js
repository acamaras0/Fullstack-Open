import New from "./components/New";
import List from "./components/AnecdoteList";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <List />
      <h2>create new</h2>
      <New />
    </div>
  );
};

export default App;
