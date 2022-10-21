import React from 'react'
import CuisineType from '../components/CuisineType'
import PageTitle from '../components/PageTitle';
import '../scss/styles';


const Explore = () => {
  return (
    <div className='explore container'>
        <PageTitle pageTitle="Explore"/>
        <div>
            <CuisineType/>
            <CuisineType/>
            <CuisineType/>
        </div>
    </div>
  )
}

export default Explore