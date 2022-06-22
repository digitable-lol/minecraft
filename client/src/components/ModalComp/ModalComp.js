import React from 'react'
import ProductCard from '../ProductCard'
import './index.scss'

const ModalComp = ({setShow, getCards}) => {

    const data={ 
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
                    <ProductCard data={data} isPost setShow={setShow} getCards={getCards}/>
                </div>
            </div>
        </div>
    )
}
export default ModalComp