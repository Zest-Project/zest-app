import React from 'react'
import LogMealComponent from '../components/LogMealComponent'
import PageTitle from '../components/PageTitle'
import UnstyledSelectForm from '../components/UnstyledSelectForm'

const LogMeal = () => {
  return (
    <div>
      <PageTitle pageTitle="Log Meal"/>


      <LogMealComponent />
    </div>
  )
}

export default LogMeal