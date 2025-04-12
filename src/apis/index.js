import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

//khu vực trả về front end 

// Boards
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  //axios sẽ trả về kết quả qua property là data
  return response.data
}

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  //axios sẽ trả về kết quả qua property là data
  return response.data
}

export const moveCardToDifferentColumnAPI = async ( updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
  //axios sẽ trả về kết quả qua property là data
  return response.data
}

//Columns
export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  //axios sẽ trả về kết quả qua property là data
  return response.data
}


export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  //axios sẽ trả về kết quả qua property là data
  return response.data
}

//Cards
export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  //axios sẽ trả về kết quả qua property là data
  return response.data
}