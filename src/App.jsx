import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { KicksProvider } from './context/KicksContext'
import Navbar from './components/NavBar'
import Home from './pages/Home'
import Shop from './pages/Shop'
import AdminPortal from './pages/AdminPortal'

function App() {
  return (
    <KicksProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Navbar />
          <main className="page-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/admin" element={<AdminPortal />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </KicksProvider>
  )
}

export default App
