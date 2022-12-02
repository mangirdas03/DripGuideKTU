import React, { useContext, useEffect, useState } from 'react';
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import User from './pages/User'
import Home from './pages/Home'
import './App.css';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate
} from "react-router-dom";
import Item from './pages/Item';
import Add from './pages/Add';
import Pending from './pages/Pending';
import Review from './pages/Review';
import PBrowse from './pages/Browse';
import Brands from './pages/Brands';
import Brand from './pages/Brand';
import AddBrand from './pages/AddBrand';
import EditBrand from './pages/EditBrand';
import Edit from './pages/Edit';
import useLocalStorage from 'use-local-storage'
import Users from './pages/Users';
import { SERVER_URL } from './components/Links';

function App() {
  const [name, setName] = useState("");
  const [role, setRole] = useState(false);
  const [mail, setMail] = useState("");
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  useEffect( () =>{
      (
        async () => {
            const response = await fetch(SERVER_URL + '/user', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });
            if(response.status === 200){
              const content = await response.json();
              setName(content.name);
              setRole(content.role);
              setMail(content.email);
            }
        }
      )();
  });


 function RequireAuth({ children, redirectTo }:{children:any, redirectTo: any}) {
  if(!name)
    return <Navigate to={redirectTo}/>;
  return children;
  }

  function RequireAdmin({ children, redirectTo }:{children:any, redirectTo: any}) {
    if(!name && !role)
      return <Navigate to={redirectTo}/>;
    return children;
  }

  function UnauthorizedOnly({ children, redirectTo }:{children:any, redirectTo: any}) {
    if(!name && !role)
      return children
    return <Navigate to={redirectTo}/>;
  }


  return (
    <div className="App" data-theme={theme}>
      <BrowserRouter>
        <Navbar name={name} setName={setName} role={role} setRole={setRole} theme={theme} setTheme={setTheme}/>
        <div className='container-main'>

          <Routes>
          <Route path="/" element={<Home name={name}/>} />
            {/* <Route path="/login" element={<Login setName={setName}/>}/> */}
            {/* <Route path="/register" element={<Register/>} /> */}
            <Route path="/register" element={
              <UnauthorizedOnly redirectTo="/">
                <Register/>
              </UnauthorizedOnly>
            }/>
            <Route path="/login" element={
              <UnauthorizedOnly redirectTo="/">
                <Login setName={setName}/>
              </UnauthorizedOnly>
            }/>
            <Route path="/user" element={
              <RequireAuth redirectTo="/">
                <User name={name} role={role} mail={mail}/>
              </RequireAuth>
            }/>
            <Route path="/brands" element={<Brands role={role} name={name}/>} />
            <Route path="/brands/:id" element={<Brand role={role} name={name} />} />
            <Route path="/brands/add" element={
              <RequireAdmin redirectTo="/">
                <AddBrand name={name} role={role}/>
              </RequireAdmin>
            }/>
            <Route path="/brands/edit/:id" element={
              <RequireAdmin redirectTo="/">
                <EditBrand name={name} role={role}/>
              </RequireAdmin>
            }/>
            <Route path="/browse" element={<PBrowse name={name}/>} />
            <Route path="/browse/all" element={<PBrowse name={name}/>} />
            <Route path="/browse/filter=:query" element={<PBrowse name={name}/>} />
            <Route path="/browse/item/:id" element={<Item role={role} name={name} />} />
            <Route path="/add" element={
              <RequireAuth redirectTo="/">
                <Add name={name} role={role}/>
              </RequireAuth>
            }/>
            <Route path="/browse/edit/:id" element={
              <RequireAdmin redirectTo="/">
                <Edit name={name}/>
              </RequireAdmin>
            }/>
            <Route path="/pending" element={
              <RequireAdmin redirectTo="/">
                <Pending name={name} role={role}/>
              </RequireAdmin>
            } />
            <Route path="/pending/item/:id" element={
              <RequireAdmin redirectTo="/">
                <Review match={name}/>
              </RequireAdmin>
            } />

            <Route path="/users" element={
              <RequireAdmin redirectTo="/">
                <Users name={name} role={role}/>
              </RequireAdmin>
            } />

          </Routes>
          </div>
      </BrowserRouter>

      <div className='footer'>
        <a href='https://ktu.edu/' target="_blank" className="footer-left"><strong>&copy; 2022 KTU</strong></a>
        <div className="footer-center">
          <a href='https://www.google.com/' target="_blank" className="fa fa-google"></a>
          <a href='https://www.facebook.com/' target="_blank" className="fa fa-facebook"></a>
          <a href='https://www.instagram.com/' target="_blank" className="fa fa-instagram"></a>
          <a href='https://twitter.com/' target="_blank" className="fa fa-twitter"></a>
        </div>
        <p className="footer-right"><strong>Mangirdas Šakėnas</strong></p>
      </div>
    </div>
  );
}

export default App;
