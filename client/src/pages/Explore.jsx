import Search from "../components/Search"
import React from 'react'
import CuisineType from '../components/CuisineType'
import PageTitle from '../components/PageTitle';
import '../scss/styles';
import LoadingComponent from "../components/LoadingComponent";

const Explore = () => {

  return (
    <div className='explore container'>
        <LoadingComponent/>
        <PageTitle pageTitle="Explore"/> 
        <Search />
        <div>
            <CuisineType/>
            <CuisineType/>
            <CuisineType/>
        </div>
    </div>
  )
}

export default Explore