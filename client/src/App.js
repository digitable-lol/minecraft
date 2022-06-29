import 'bootstrap/dist/css/bootstrap.min.css';
import CardList from './components/CardList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar/';
import PostProductModal from './components/Modals/PostProductModal';
import Layout from './components/Layout/Layout';
import { getUsers } from './services/user.service';

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
    if (filter.isFiltered) {
      axios.get(`${URL}/api/things?PageNumber=${pageNum}&PageSize=6&searchstr=${searchString ?? ""}&quantity=${filter.quantity}&priceLow=${filter.priceLow}&priceHigh=${filter.priceHigh}&photoBill=${filter.photoBill}&minDate=${filter.minDate}&maxDate=${filter.maxDate}&userid=${filter.userId}`)
        .then(res => {
          const cards = res.data.data;
          setCards(cards)
          setTotalPages(res.data.totalPages)
          window.scrollTo(0, 0)
        })
    }
    else if (searchString) {
      axios.get(`${URL}/api/things?PageNumber=${pageNum}&PageSize=6&searchstr=${searchString}`)
        .then(res => {
          const cards = res.data.data;
          setCards(cards)
          setTotalPages(res.data.totalPages)
          window.scrollTo(0, 0)
        })
    }
    else {
      axios.get(`${URL}/api/things?PageNumber=${pageNum}&PageSize=6`)
        .then(res => {
          const cards = res.data.data;
          setCards(cards)
          setTotalPages(res.data.totalPages)
          window.scrollTo(0, 0)
        })
    }
  }

  const getAndSetUserList = () => {
    getUsers().then((res) => { setUsersList(res.data) })
  }

  useEffect(() => {
    if (filter.isFiltered) {
      getCards()
    }
  }, [filter.isFiltered])


  useEffect(() => {
    if (filter.isFiltered || searchString) {
      setPageNum(1)
    }
  }, [searchString, filter.isFiltered])

  useEffect(() => {
    getAndSetUserList()
  }, [])

  return (
    <>
      <Layout
        handleShowFilter={handleShowFilter}
        getCards={getCards}
        setSearchString={setSearchString}
        searchString={searchString}
      >
        <Sidebar
          usersList={usersList}
          handleShowFilter={handleShowFilter}
          setShow={setShow}
          isDeleting={isDeleting}
          setIsDeleting={setIsDeleting}
          filter={filter} setFilter={setFilter}
          getCards={getCards}
          handleCloseFilter={handleCloseFilter}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          getAndSetUserList={getAndSetUserList}
        />
        <CardList
          usersList={usersList}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          isDeleting={isDeleting}
          getCards={getCards}
          cards={cards}
          pageNum={pageNum}
          setPageNum={setPageNum}
        />
      </Layout>
      {show && <PostProductModal setShow={setShow} getCards={getCards} usersList={usersList} />}
    </>
  );
}

export default App;