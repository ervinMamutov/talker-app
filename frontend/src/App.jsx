import { Button } from '@chakra-ui/react';
import { FaTwitter } from 'react-icons/fa6';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Chat from './pages/Chat';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default App;
