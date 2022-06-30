import 'bootstrap/dist/css/bootstrap.min.css';
import CardList from './components/CardList';
import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar/';
import PostProductModal from './components/Modals/PostProductModal';
import Layout from './components/Layout/Layout';
import { getUsers } from './services/user.service';
import { getAllProducts, getProductsFromSearch, getProductsWithFilters } from './services/card.service';


function App() {

  const [show, setShow] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [cardsList, setCardsList] = useState([])
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

  const setCardListData = (cards, totalPagesParam) => {
    setCardsList(cards)
    setTotalPages(totalPagesParam)
  }

  function getCards() {
    if (filter.isFiltered) {
      getProductsWithFilters(pageNum, searchString, filter)
        .then(res => {
          setCardListData(res.data, res.totalPages)
          window.scrollTo(0, 0)
        })
    }
    else if (searchString) {
      getProductsFromSearch(pageNum, searchString)
        .then(res => {
          setCardListData(res.data, res.totalPages)
          window.scrollTo(0, 0)
        })
    }
    else {
      getAllProducts(pageNum)
        .then(res => {
          setCardListData(res.data, res.totalPages)
            window.scrollTo(0, 0)
          })
    }
  }

  const getAndSetUserList = () => {
    getUsers()
    .then((res) => { setUsersList(res.data) })
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
          cards={cardsList}
          pageNum={pageNum}
          setPageNum={setPageNum}
        />
      </Layout>
      {show && <PostProductModal setShow={setShow} getCards={getCards} usersList={usersList} />}
    </>
  );
}

export default App;