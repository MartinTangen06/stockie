import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { SideNav } from './components/navigation/sideNav.tsx'
import { TopNav } from './components/navigation/topNav.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TopNav />
      <SideNav />
      <div className="ml-40">
        <App />
      </div>
    </BrowserRouter>
  </StrictMode>,
)
