import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PokemonDetail } from './pages/PokemonDetail';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <header className="app-header">
        <h1>Pokedex</h1>
      </header>
      <Routes>
        {/* Ruta para la página principal */}
        <Route path="/" element={<Home />} />

        {/* Ruta para el detalle (Nota el :name, es un parámetro dinámico) */}
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App