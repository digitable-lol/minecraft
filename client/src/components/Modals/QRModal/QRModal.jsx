import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Image } from 'react-bootstrap'
import { URL } from '../../../App'
import './index.scss'

const QRModal = ({ id, deleteQRAndCloseModal }) => {


    const [QRUrl, setQRUrl] = useState()

    useEffect(() => {
     axios.get(`${URL}/api/things/getQr/${id}`).then((res) =>{
        if(res){
            setQRUrl(res.data)
        }
      })
    }, [])

    console.log('rerender2')


    return (
        <div className='modal' onClick={deleteQRAndCloseModal}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <div className='modal-body'>
                    {QRUrl && <Image width={400} src={`${URL}/${QRUrl}`} />}
                </div>
            </div>
        </div>
    )
}

export default React.memo(QRModal)
