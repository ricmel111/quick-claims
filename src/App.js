import './App.css';
import Navbar from './Components/Navbar';
import ClaimForm from './Components/ClaimForm';
import Footer from './Components/Footer';
import SearchForm from './Components/SearchForm';
import OpenClaimsTable from './Components/OpenClaimsTable';

function App() {
  return (
    <div>
      <Navbar />
      <ClaimForm />
      <OpenClaimsTable />
      <SearchForm />
      <Footer />
    </div>
  );
}

export default App;
