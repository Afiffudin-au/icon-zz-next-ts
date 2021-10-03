import axios from 'axios';
import { useAppDispatch } from '../../redux/app/hooks';
import { addPackDetail } from '../../redux/features/icon/iconSlice';
export const useGetIconPackDetail = ()=>{
  const dispatch = useAppDispatch()
  const getIconPackDetail = (id:number, token:Required<string>)=>{
    dispatch(addPackDetail({
      loading : true
    }))
    axios({
      method : 'get',
      headers : {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      url : `https://api.flaticon.com/v2/item/pack/${id}`,
    }).then(res=>{
      dispatch(addPackDetail({
        loading : false,
        dataPacks : res.data
      }))
    }).catch(err=>{
      dispatch(addPackDetail({
        loading : false
      }))
      alert(err)
    })
  }
  return{
    getIconPackDetail
  }
}