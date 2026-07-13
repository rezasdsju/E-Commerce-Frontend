import { useEffect, useState } from "react";

function App() {
  const [messege, setMessege] = useState('')

  useEffect(()=> {
    fetch("http://127.0.0.1:8000/api/")
    .then(response => response.json())
    .then(data=>setMessege(data.messege))
    .catch(error => console.error('Error fetching messege:', error)
    );
  }, []);

  return (
    <div>
      <h1>Messege from backend</h1>
      <p>{messege || 'Loading...'}</p>
    </div>
  )
}
export default App;