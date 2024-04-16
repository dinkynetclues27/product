import logo from './logo.svg';
import './App.css';
import UploadFile from './uploadfile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Fetchproduct from './fetchproduct';
import ExportFile from './exportfile';
import MainComponent from './home';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    
    <BrowserRouter>
    <div>
 
      <Routes>
        <Route path="/uploadfile" element={<UploadFile />} />
        <Route path="/productfetch" element={<Fetchproduct />} />
        <Route path="/exportfile" element={<ExportFile/>} />
        <Route path="/" element={<MainComponent/>} />
      </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
