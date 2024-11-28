import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// Componentes de las páginas
function HomePage() {
  return (
    <div>
      <h1>¡Hola Mundo!</h1>
    </div>
  );
}

function ShippingsPage() {
  return (
    <div>
      <h1>Página de Envíos</h1>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        <header>
          <nav>
            <ul>
              {/* Links de navegación */}
              <li>
                <Link to="/">Página Principal</Link>
              </li>
              <li>
                <Link to="/shippings">Envíos</Link>
              </li>
            </ul>
          </nav>
        </header>

        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>

        <h1>Vite + React</h1>

        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>

        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>

        {/* Definición de las rutas */}
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Página principal */}
          <Route path="/shippings" element={<ShippingsPage />} /> {/* Página de envíos */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
