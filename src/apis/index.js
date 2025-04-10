import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

//khu vực trả về front end 

// Boards
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  //axios sẽ trả về kết quả qua property là data
  return response.data
}

//Columns
export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  //axios sẽ trả về kết quả qua property là data
  return response.data
}

//Cards
export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  //axios sẽ trả về kết quả qua property là data
  return response.data
}