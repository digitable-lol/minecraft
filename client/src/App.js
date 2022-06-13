import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarComp } from './components/NavbarComp/NavbarComp';
import GridComp from './components/GridComp/GridComp';


function App() {

  return (
    <div className="App">
      <NavbarComp />
      <GridComp />
    </div>
  );
}

export default App;