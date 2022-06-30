import React from 'react'
import Footer from '../Layout/FooterComp/FooterComp'
import NavbarComp from "./Navbar"

const Layout = (props) => {
  return (
    <div className="App">
      <NavbarComp 
            handleShowFilter={props.handleShowFilter}
            getCards={props.getCards} 
            setSearchString={props.setSearchString} 
            searchString={props.searchString} 
        />
        {props.children}
      <Footer/>
    </div>
  )
}

export default Layout