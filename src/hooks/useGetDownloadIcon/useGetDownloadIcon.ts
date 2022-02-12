import axios from 'axios'
import { saveAs } from 'file-saver'
export const useGetDownloadIcon = ()=>{
  const getDownloadIcon = (token:Required<string>,id:Required<number>,iconName = 'icon-default',size = '32',format = 'png')=>{
    axios({
      method : 'get',
      headers : {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      responseType : 'blob',
      url : `https://api.flaticon.com/v2/item/icon/download/${id}/${format}`,
      params : {
        size : size,
      }
    }).then(res=>{
      console.log(res.data)
      saveAs(res.data, iconName)
    }).catch(err=>{
      alert(err)
    })
  }
  return{
    getDownloadIcon
  }
}