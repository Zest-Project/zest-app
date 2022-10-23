import React from 'react'
import CreateNewAccountComponent from '../components/CreateNewAccountComponent'
import PageTitle from '../components/PageTitle'

const CreateNewAccount = () => {
  return (
    <div>
        <PageTitle pageTitle="Create New Account"/>
        <CreateNewAccountComponent />
    </div>
  )
}

export default CreateNewAccount