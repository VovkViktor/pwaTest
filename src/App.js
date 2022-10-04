import { useEffect, useState } from "react";

import img from "./assets/images/365.png";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/")
      .then((response) => response.json())
      .then((users) => setUsers(users));
  }, []);

  return (
    <div className="App">
      <img src={img} alt="logo" />
      <br />
      <br />
      <div>
        <video
          src="https://d2b69vqehwu7js.cloudfront.net/media/companyvideo/3edcc160-8119-4539-872c-57095054b79c/97f9230e-0928-4747-8859-a977d9b0819a.mp4"
          autoPlay
          controls
          loop
          width="400"
          height="300"
          playsInline
        />
      </div>
      <br />
      <br />
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}

export default App;
