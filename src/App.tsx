import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import { PokemonDetail } from './pages/PokemonDetail';
import { Comparador } from './pages/Comparador';

function App() {
  return (
    <Router>
      <nav style={{ backgroundColor: '#2c2c2a', color: '#ececed', padding: '20px' }} className="shadow-md">
        
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          
          <Link 
            to="/" 
            style={{ fontSize: '36px' }} 
            className="font-bold uppercase tracking-wider hover:scale-105 transition-transform"
          >
            Pokédex
          </Link>
          <div className="flex gap-6 font-semibold text-lg">
            <Link to="/" className="hover:text-yellow-400 transition-colors">Inicio</Link>
            <Link to="/comparar" className="hover:text-yellow-400 transition-colors">Comparador</Link>
          </div>

        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
        <Route path="/comparar" element={<Comparador />} />
      </Routes>
    </Router>
  );
}

export default App;