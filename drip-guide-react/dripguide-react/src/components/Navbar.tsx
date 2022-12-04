import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { SERVER_URL } from "./Links";

const Navbar = (props: {role: boolean, setRole: (role: boolean) => void, name: string, setName: (name: string) => void, theme: string, setTheme: (theme: string) => void}) => {
  const [suggest, setSuggest] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();


  const switchTheme = () => {
    const newTheme = props.theme === 'light' ? 'dark' : 'light';
    props.setTheme(newTheme);
  }
  const checkBoxState = () => {
    if(props.theme === 'light') return false
    return true
  }
  
  const logout = async () =>{
    localStorage.removeItem('jwt');
    props.setName("")
    props.setRole(false)
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      icon: 'success',
      title: <p>Successfully logged out!</p>,
      showConfirmButton: false,
      showCancelButton: false,
      showCloseButton: false,
      timer: 1200,
      color: 'white',
      background: '#3e4956',
      confirmButtonColor: 'lightblue'
      }).then(() =>{
          navigate('/login');
      });
  }

  const changeHandler = (e : any) => {
    var input = e.target.value;
    setInput(input);
    if(!input.trim().length || e.target.value.length < 3)
    {
      setSuggest([]);
    }
    else
    {
      const getPosts = async () => {
        const res = await fetch(SERVER_URL + `/Posts/Suggestions/${e.target.value}`);
        const data = await res.json();
        setSuggest(data);
      };
      getPosts();
    }
  }

  const ViewDetails = async (post: any) => {
    setSuggest([])
    setInput('');
    navigate('browse/item/' + post.id);
    window.location.reload();
  }

  const SearchFor = async () => {
    setSuggest([])
    if(input.length < 2)
      navigate('/browse/all');
    else
      navigate('/browse/filter=' + input);
    setInput('');
    window.location.reload();
  }
   
    let menu;
    //Not logged in
    if(!props.name){
      menu = (
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
          <li className="nav-item">
            <Link className="nav-link" to="/brands">🏢Brands</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/browse/all">🔥Browse all</Link>
          </li>
        </ul>
      )
    }
    else{
      //if(localStorage.getItem("admin") !="true")
      //if(nm !== true)
      // User logged in
      if(props.role !== true)
      {
        menu = (
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link className="nav-link" to="/brands">🏢Brands</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/browse/all">🔥Browse all</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add">👕New item</Link>
            </li>
          </ul>
        )
      }
      // Admin logged in
      else
      {
        menu = (
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
           
            <li className="nav-item">
              <Link className="nav-link" to="/brands">🏢Brands</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/browse/all">🔥Browse all</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add">👕New item</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pending">📝Submissions</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users">Users</Link>
            </li>
          </ul>
        )
      }
    }
    let right;
    // Not logged in
    if(!props.name){
      right = (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
        </ul>
      )
      // Logged in
    }else{
      right = (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/user">👤 User</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" onClick={logout} to="/login">Logout</Link>
          </li>
        </ul>
      )
    }

    return (
            <nav className="navbar navbar-expand-xl navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand-container" href="/"><img className="navbar-brand" src={'/dglogo.png'}/></a> 
          {/* <img src={window.location.origin + '/yourPathHere.jpg'} /> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
          <form className="d-flex" onSubmit={SearchFor}>
              <input onChange={changeHandler} value={input} className="form-control me-2" type="search" placeholder="Search for drip" aria-label="Search"/>
              
              <div className="dropdown-search">
                {
                  suggest.map((post, key) => {
                      return(
                        <div key={key} className="dropdown-search-item" onClick={() => ViewDetails(post)}>
                            <div className="dropdown-search-image-container">
                                <img className="dropdown-search-image" alt="" src={post.image}></img>
                            </div>
                            <div className="dropdown-search-text">
                              {post.title}</div>
                          </div>
                      )})
                }
                </div>
              <button className="search-button" type="submit">🔎</button>
              {/* <button id="search-button" className="btn btn-outline-success" onClick={SearchFor}>Search</button> */}
            </form>

            {menu}
            <div className="darkmode-switch">
              <input type="checkbox" className="checkbox" id="checkbox" onClick={switchTheme} defaultChecked={checkBoxState()}></input>
                <label htmlFor="checkbox" className="label">
                  <div className="moon">🌙</div>
                  <div className="sun">☀️</div>
                  <div className='cover'></div>
              </label>
            </div>
              
            {right}
          </div>
        </div>
      </nav>
    );
};

export default Navbar;
