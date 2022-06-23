import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarComp } from './components/NavbarComp/NavbarComp';
import GridComp from './components/GridComp/GridComp';
import { useEffect, useState } from 'react';
import ModalComp from './components/ModalComp/ModalComp';
import axios from 'axios';
import SidebarComp from './components/SidebarComp/SidebarComp';
// import { setCards } from './store/redusers/cardsReducer';
import Footer from './components/FooterComp/FooterComp';

export const URL = "https://localhost:5001"

function App() {

  const [show, setShow] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [cards, setCards] = useState([])
  const [searchString, setSearchString] = useState()
  const [pageNum, setPageNum] = useState(1)
  const [totalPages, setTotalPages] = useState(0)


  const [filter, setFilter] = useState({
    quantity: '',
    priceLow: 1,
    priceHigh: 1000000,
    photoBill: '',
    minDate: '',
    maxDate: '',
    isFiltered: false,
    userId: '',
})

  const [usersList, setUsersList] = useState([])
  

  const [showFilter, setShowFilter] = useState(false);

  const handleCloseFilter = () => setShowFilter(false);
  const handleShowFilter = () => setShowFilter(true);

  function getCards() {

    
    if(filter.isFiltered){
      axios.get(`${URL}/api/things?PageNumber=${pageNum}&PageSize=6&searchstr=${searchString ?? ""}&quantity=${filter.quantity}&priceLow=${filter.priceLow}&priceHigh=${filter.priceHigh}&photoBill=${filter.photoBill}&minDate=${filter.minDate}&maxDate=${filter.maxDate}&userid=${filter.userId}`)
      .then(res => {
          const cards = res.data.data;
          setCards(cards)
          setTotalPages(res.data.totalPages)
          window.scrollTo(0,0)
        })
    }
    else if (searchString){
      axios.get(`${URL}/api/things?PageNumber=${pageNum}&PageSize=6&searchstr=${searchString}`)
        .then(res => {
            const cards = res.data.data;
            setCards(cards)
            setTotalPages(res.data.totalPages)
            window.scrollTo(0,0)
          })
    }
    else{
      axios.get(`${URL}/api/things?PageNumber=${pageNum}&PageSize=6`)
        .then(res => {
            const cards = res.data.data;
            setCards(cards)
            setTotalPages(res.data.totalPages)
            window.scrollTo(0,0)
        })
    }
  }

  useEffect(() => {
    if(filter.isFiltered){
      getCards()
    }
  }, [filter.isFiltered])


  useEffect(() => {
    if(filter.isFiltered || searchString){
      setPageNum(1)
    }
  }, [searchString, filter.isFiltered])

  useEffect(() => {
    axios.get(`${URL}/api/users`).then((res)=> {setUsersList(res.data)})
  }, [])


  return (
    <div className="App">
      <SidebarComp usersList={usersList} handleShowFilter={handleShowFilter} setShow={setShow} isDeleting={isDeleting} setIsDeleting={setIsDeleting} filter={filter} setFilter={setFilter} getCards={getCards} handleCloseFilter={handleCloseFilter} showFilter={showFilter} setShowFilter={setShowFilter}/>
      <NavbarComp handleShowFilter={handleShowFilter} getCards={getCards} setSearchString={setSearchString} searchString={searchString} />
      {show && <ModalComp setShow={setShow} getCards={getCards} usersList={usersList} />} 
      <GridComp usersList={usersList} totalPages={totalPages} setTotalPages={setTotalPages} isDeleting={isDeleting} getCards={getCards} cards={cards} pageNum={pageNum} setPageNum={setPageNum}/>
      <Footer/>
    </div>
  );
}

export default App;