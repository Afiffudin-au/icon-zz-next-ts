import axios from 'axios'
import { saveAs } from 'file-saver'
export const useGetDownloadIcon = ()=>{
  const getDownloadIcon = (token:Required<string>,id:Required<number>,iconName = 'icon-default',size = '32',format = 'png')=>{
    console.log(format)
    axios({
      method : 'get',
      headers : {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      responseType : 'blob',
      url : `https://api.flaticon.com/v2/item/icon/download/${id}`,
      params : {
        format : format,
        size : size
      }
    }).then(res=>{
      saveAs(res.data, iconName)
    }).catch(err=>{
      alert(err)
    })
  }
  return{
    getDownloadIcon
  }
}