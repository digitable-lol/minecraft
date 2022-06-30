import React from 'react'
import './index.scss'
import PostProcuctCard from './PostProductCard/PostProductCard'

const PostProductModal = ({setShow, getCards, usersList}) => {

    return (
        <div className='modal' onClick={()=>setShow(false)}>
            <div className='modal-content' onClick={(e)=>e.stopPropagation()}>
                <div className='modal-body'>
                    <PostProcuctCard usersList={usersList} setShow={setShow} getCards={getCards}/>
                </div>
            </div>
        </div>
    )
}
export default PostProductModal