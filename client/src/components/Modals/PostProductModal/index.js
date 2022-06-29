import React from 'react'
import './index.scss'
import PostProcuctCard from '../../ProductCard/PostProductCard'

const PostProductModal = ({setShow, getCards, usersList}) => {

    const data = { 
        name:'',
        owner:'',
        data:'',
        price:'',
        comment:''
    }

    return (
        <div className='modal' onClick={()=>setShow(false)}>
            <div className='modal-content' onClick={(e)=>e.stopPropagation()}>
                <div className='modal-body'>
                    <PostProcuctCard data={data} usersList={usersList} setShow={setShow} getCards={getCards}/>
                </div>
            </div>
        </div>
    )
}
export default PostProductModal