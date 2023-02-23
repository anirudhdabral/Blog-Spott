import './App.css';
import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Components/Header';
import Home from './Components/Home';
import AddBlog from './Components/AddBlog';
import EditBlog from './Components/EditBlog';
import DisplayBlog from './Components/DisplayBlog';
import Login from './Components/Login';
// import HomeContainer from './containers/HomeContainer';

export const GlobalInfo = createContext();

function App() {
  const [madeBy] = useState("This app is made by Anirudh Dabral");
  return (
    <GlobalInfo.Provider value={{ madeBy: madeBy }}>
      <div >
        <Header />
        <Router>
          <Routes>
            <Route index path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/add' element={<AddBlog />} />
            <Route path='/edit/:id' element={<EditBlog />} />
            <Route path='/blog/:id' element={<DisplayBlog />} />
            <Route path='*' element={<Home />} />
          </Routes>
        </Router>
      </div>
    </GlobalInfo.Provider>
  );
}

export default App;




class  extends Component {
  state = {  } 
  render() { 
    return ();
  }
}
 
export default ;