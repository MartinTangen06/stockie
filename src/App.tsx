import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { StockPage } from './pages/stockPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stock/:symbol" element={<StockPage />} />
    </Routes>
  )
}

export default App
