import React from 'react'
import PropTypes from 'prop-types'

const PageTitle = ({pageTitle}) => {
  return (
    <h1 className='page_title'> {pageTitle}</h1>
  )
}

PageTitle.propTypes = {
    pageTitle: PropTypes.string
}

export default PageTitle;