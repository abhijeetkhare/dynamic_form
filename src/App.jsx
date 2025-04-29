import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import DynamicForm from './components/DynamicForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/form" element={<DynamicForm />} />
      </Routes>
    </Router>
  );
}

export default App;
