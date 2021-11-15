// import NavBar from "./components/layout/navbar";
// import Routers from "./router";
// function App() {
//   return (
//     <>
//       <NavBar/>
//       <Routers/>
//     </>
//   );
// }

// export default App;


import React from "react";
import NavBar from './components/layout/navbar'
import {BrowserRouter} from 'react-router-dom';
import Routers from './router'

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
      <Routers/>
    </>
  );
}

export default App;
