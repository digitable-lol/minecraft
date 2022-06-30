import axios from "axios"
import fileDownload from "js-file-download"
import { API } from "../module/urlConsts"

export const downloadQR = (id) => {
    axios.get(`${API.QR.Download}${id}`, { responseType: 'arraybuffer' })
    .then((res)=> {
      fileDownload(res.data, `${new Date()}.png`)
      axios.delete(API.QR.Delete)
    })
  }