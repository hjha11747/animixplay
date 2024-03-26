
import './App.css';
import AnimeItem from './components/AnimeItem';
import HomePage from './components/HomePage';
import Popular from './components/Popular';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/anime" element={<AnimeItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
