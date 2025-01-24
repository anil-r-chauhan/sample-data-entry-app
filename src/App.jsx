import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UsersDataTable from './pages/UsersDataTable';
import UserDetailsPage from './pages/UserDetailsPage';
import NoPageFound from './pages/NoPageFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsersDataTable />} />
        <Route path="/users" element={<UsersDataTable />} />
        <Route path="/userdetails/:id" element={<UserDetailsPage />} />
        <Route path="/*" element={<NoPageFound />} />
      </Routes>
    </Router>
  );
}

export default App;
