import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from './redux/slice/todo';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  console.log(state);

  if (state.todo.isLoading) {
    return (
      <h1>Loading...</h1>
    )
  }
  if (state.todo.isError) {
    return (
      <h1>Something went wrong!</h1>
    )
  }
  return (
    <div className="App">
      <button onClick={e => dispatch(fetchTodos())}>Fetch Todos</button>
      {state.todo.data?.map((todo, index) =>
        <li key={index}>{todo.title}</li>
      )}
    </div>
  );
}

export default App;
