import axios from 'axios'
import { useAppDispatch } from '../../redux/app/hooks'
import { addIconDetail } from '../../redux/features/icon/iconSlice'
const useGetIconDetail=  ()=>{
  const dispatch = useAppDispatch()
  const getIconDetail =  (id:number,token:Required<string>)=>{
    dispatch(addIconDetail({
      loading : true
    }))
    axios({
      method : 'get',
      headers : {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      url : `https://api.flaticon.com/v2/item/icon/${id}`,
    }).then(res=>{
      dispatch(addIconDetail({
        loading : false,
        dataIcons : res.data
      }))
    }).catch(err=>{
      dispatch(addIconDetail({
        loading : false
      }))
      alert(err)
    })
  }
  return{
    getIconDetail
  }
}
export default useGetIconDetail