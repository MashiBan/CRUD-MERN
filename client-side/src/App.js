import './App.css';
import { Route, Routes } from "react-router-dom";
import Layout from './Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './Context/userContext';
import CreatePost from './pages/CreatePost';

function App() {
  return (
      <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<HomePage />}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/create' element={<CreatePost/>}/>
        {/* <Route path='/post/:id' element={} */}
        </Route>
      </Routes>
      </UserContextProvider>
  );
}

export default App;