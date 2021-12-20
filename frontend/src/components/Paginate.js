import React from 'react'
import { Pagination } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'

const Paginate = ({ pages }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageNumber = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : 1

  const pageHandler = (page) => {
    searchParams.set('page', page)
    setSearchParams(searchParams)
  }

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item
            active={pageNumber === x + 1}
            key={x + 1}
            onClick={(e) => pageHandler(e.target.text)}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
