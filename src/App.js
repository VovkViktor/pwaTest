import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/")
      .then((response) => response.json())
      .then((users) => setUsers(users));
  }, []);

  return (
    <div className="App">
      <img src="./365.png" alt="logo" />
      <br />
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}

export default App;
