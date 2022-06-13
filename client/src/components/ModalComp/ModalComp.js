import React from 'react'
import ProductCard from '../ProductCard'

const ModalComp = props => {

    const data={ 
        name:'',
        owner:'',
        data:'',
        price:'',
        comment:''
    }

    return (
        <div className='modal'>
            <div className='modal-content'>
                <div className='modal-body'>
                    <ProductCard data={data} setShow = {props.setShow} isPost />
                </div>
            </div>
        </div>
    )
}
export default ModalComp