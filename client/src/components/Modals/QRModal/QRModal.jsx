import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Image } from 'react-bootstrap'
import { URL } from '../../../App'
import './index.scss'

const NewUserModal = ({ setQRShow, id }) => {

    const [QRUrl, setQRUrl] = useState('')

    // useEffect( async () => {
    //   const res = axios.get(`${URL}/things/getQr/${id}`)
    //   console.log(res)
    //   setQRUrl(res)
    // }, [])
    

    return (
        <div className='modal' onClick={()=>setQRShow(false)}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <div className='modal-body'>
                    <Image src={QRUrl} />
                </div>
            </div>
        </div>
    )
}

export default NewUserModal