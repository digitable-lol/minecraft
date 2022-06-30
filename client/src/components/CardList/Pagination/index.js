import React from 'react'
import { Pagination } from 'react-bootstrap'
import './Pagination.scss'


export default function PaginationComp({ setPageNum, pageNum, totalPages }) {
    return (
        <Pagination className='pagination'>
            <Pagination.First onClick={() => setPageNum(1)} />
            <Pagination.Prev disabled={pageNum - 1 <= 1} onClick={() => setPageNum(pageNum - 1)} />
            {pageNum - 2 >= 1 && <><Pagination.Item onClick={() => setPageNum(1)}>{1}</Pagination.Item>
                <Pagination.Ellipsis />
            </>
            }
            {pageNum - 2 >= 2 && <Pagination.Item onClick={() => setPageNum(pageNum - 2)}>{pageNum - 2}</Pagination.Item>}

            {pageNum - 1 > 0 && <Pagination.Item onClick={() => setPageNum(pageNum - 1)}>{pageNum - 1}</Pagination.Item>}
            <Pagination.Item active>{pageNum}</Pagination.Item>
            {totalPages - pageNum > 1 && <Pagination.Item onClick={() => setPageNum(pageNum + 1)}>{pageNum + 1}</Pagination.Item>}
            {totalPages - pageNum > 2 && <Pagination.Item onClick={() => setPageNum(pageNum + 2)}>{pageNum + 2}</Pagination.Item>}

            {totalPages - pageNum >= 1 && <>
                {totalPages - pageNum >= 2 && <Pagination.Ellipsis />}
                <Pagination.Item onClick={() => setPageNum(totalPages)}>{totalPages}</Pagination.Item>
                <Pagination.Next onClick={() => setPageNum(pageNum + 1)} />
                <Pagination.Last onClick={() => setPageNum(totalPages)} />
            </>}
        </Pagination>

    )
}

