import Search from "../components/search/Search"
import React from 'react'
import CuisineType from '../components/CuisineType'
import PageTitle from '../components/PageTitle';
import '../scss/styles';
import LoadingComponent from "../components/LoadingComponent";

const Explore = () => {

  return (
    <div className='explore container'>
        <LoadingComponent/>
        <div className="header"> 
          <PageTitle pageTitle="Explore"/> 
          <Search />
        </div>
        <div>
            <CuisineType/>
            <CuisineType/>
            <CuisineType/>
        </div>
    </div>
  )
}

export default Explore