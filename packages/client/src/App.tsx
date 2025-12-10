import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [message, setMessage] = useState()
  useEffect(() => {
    fetch('http://localhost:3000/test')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
  }, [])

  return <p>{message}</p>
}

export default App
