import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarComp } from './components/NavbarComp/NavbarComp';
import GridComp from './components/GridComp/GridComp';
import { useState } from 'react';
import ModalComp from './components/ModalComp/ModalComp';



function App() {

  const [show, setShow] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <div className="App">
      <NavbarComp setShow={setShow} isDeleting={isDeleting} setIsDeleting={setIsDeleting} />
      <GridComp isDeleting={isDeleting}/>
      {show && <ModalComp setShow={setShow} />}
    </div>
  );
}

export default App;