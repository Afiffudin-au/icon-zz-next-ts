import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface iconState {
  value: number
  status: 'idle' | 'loading' | 'failed'
  parametersApi: {
    query: string
  }
  tokenBlocks: {
    token: string
    tokenAccepted: boolean
  }
  TotalBlocks: {
    iconTotals: number
  }
  iconSearchBlocks: {
    loading: boolean
    dataIcons: any
  }
  iconPackBlocks: {
    dataPacks: any,
    loading: boolean,
  },
  iconDetailBlocks : {
    dataIconDetails : any,
    loading : boolean
  },
  iconPackDetailBlocks : {
    dataPackDetails : any,
    loading : boolean
  }
}

const initialState: iconState = {
  value: 0,
  status: 'loading',
  parametersApi: {
    query: '',
  },
  tokenBlocks: {
    token: '',
    tokenAccepted: false,
  },
  TotalBlocks: {
    iconTotals: 0,
  },
  iconSearchBlocks: {
    dataIcons: [],
    loading: false,
  },
  iconPackBlocks: {
    dataPacks: [],
    loading: false,
  },
  iconDetailBlocks : {
    dataIconDetails : [],
    loading : false
  },
  iconPackDetailBlocks : {
    dataPackDetails : [],
    loading : false
  }
}

export const iconSlice = createSlice({
  name: 'icon',
  initialState,
  reducers: {
    addParameter: (state, action) => {
      state.parametersApi.query = action.payload.query
    },
    addToken: (state, action) => {
      state.tokenBlocks.token = action.payload.token
      if (action.payload.token) {
        state.tokenBlocks.tokenAccepted = true
      }
    },
    addIconTotal: (state, action) => {
      state.TotalBlocks.iconTotals = action.payload.iconTotals
    },
    addIconResult: (state, action) => {
      state.iconSearchBlocks.loading = action.payload.loading
      state.iconSearchBlocks.dataIcons = action.payload.dataIcons || []
    },
    addPackResult : (state,action)=>{
      state.iconPackBlocks.dataPacks = action.payload.dataPacks || []
      state.iconPackBlocks.loading = action.payload.loading
    },
    addIconDetail : (state,action)=>{
      state.iconDetailBlocks.dataIconDetails = action.payload.dataIcons || []
      state.iconDetailBlocks.loading = action.payload.loading
    },
    addPackDetail : (state,action)=>{
      state.iconPackDetailBlocks.dataPackDetails = action.payload.dataPacks || []
      state.iconPackDetailBlocks.loading = action.payload.loading 
    }
  },
})

export const {
  addToken,
  addIconTotal,
  addIconResult,
  addParameter,
  addPackResult,
  addIconDetail,
  addPackDetail
} = iconSlice.actions

export const selectCount = (state: RootState) => state.icons.value
export const selectTokenBlocks = (state: RootState) => state.icons.tokenBlocks
export const selectTotalBlocks = (state: RootState) => state.icons.TotalBlocks
export const selectIconSearchBlocks = (state: RootState) =>
  state.icons.iconSearchBlocks
export const selectParameter = (state: RootState) => state.icons.parametersApi
export const selectIconPackBlocks = (state:RootState) => state.icons.iconPackBlocks
export const selectIconDetailBlocks = (state:RootState) => state.icons.iconDetailBlocks
export const selectIconPackDetailBlocks = (state:RootState) => state.icons.iconPackDetailBlocks
export default iconSlice.reducer
