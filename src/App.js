import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import ClaimForm from './Components/ClaimForm';
import Footer from './Components/Footer';
import SearchForm from './Components/SearchForm';
import OpenClaimsTable from './Components/OpenClaimsTable';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/new-claim" element = {<ClaimForm />} />  
        <Route path="/search" element = {<SearchForm />} />
        <Route path="/open-claims" element = {<OpenClaimsTable />} />  
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
