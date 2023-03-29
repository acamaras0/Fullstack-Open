import New from "./components/New";
import List from "./components/AnecdoteList";
import Filter from "./components/Filter";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <List />
      <h2>create new</h2>
      <New />
    </div>
  );
};

export default App;
