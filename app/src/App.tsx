import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateComponent from './components/CreateComponent';
import ReadComponent from './components/ReadComponent';
import LoginComponent from './components/LoginComponent';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/login" element={<LoginComponent />} />
          <Route path="/create" element={<CreateComponent />} />
          <Route path="/read" element={<ReadComponent />} />
          <Route path="/" element={<LoginComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;