import axios from 'axios'
import { useAppDispatch } from '../../redux/app/hooks'
import { addToken } from '../../redux/features/icon/iconSlice'

const useGetAccessToken = () => {
  const dispatch = useAppDispatch()
  const getAccessToken = () => {
    axios({
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data',
      Accept: 'application/json',},
      url: 'https://api.flaticon.com/v2/app/authentication',
      params: {
        apikey: process.env.REACT_APP_API_KEY,
      },
    })
      .then((res) => {
        dispatch(
          addToken({
            token: res.data.data.token,
          })
        )
      })
      .catch((err) => {
        alert(err)
      })
  }
  return {
    getAccessToken,
  }
}
export default useGetAccessToken
