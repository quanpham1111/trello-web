import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI, updateBoardDetailsAPI, updateColumnDetailsAPI, moveCardToDifferentColumnAPI } from '~/apis'
import {generatePlaceholderCard} from '~/utils/formatters'
import { isEmpty } from 'lodash'
import Box from '@mui/material/Box'
import { mapOrder } from '~/utils/sorts'
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material'
function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '67f3a6bbbbd2eb0f3e24641f'
    //call API
    fetchBoardDetailsAPI(boardId).then(board => {
      //board.column = mapOrder(board.columns, board?.columnOrderIds, '_id')
      //khi F5 trang web thì cần xử lý vấn đề kéo thả vào 1 column rỗng
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } //else {
          //column.card = mapOrder(column.cards, column?.cardOrderIds, '_id')
       // }
      })
      console.log('full board', board)
      setBoard(board)
    })
  }, [])
  //function để gọi api tạo mới column và set lại dữ liệu state board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    //khi tạo column mới chưa có card, cần xử lý lại vấn đề kéo thả vào 1 colmn rỗng
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]
    console.log('createdColumn', createdColumn)

    //cập nhật lại state board
    //tự làm đúng lại phía front end thay vì gọi lại api (thay vì gọi lại fetchBoard )
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  //function để gọi api tạo mới card và set lại dữ liệu state board
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    console.log('createdColumn', createdCard)

    //cập nhật lại state board mỗi lần thêm mới
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }

  //Func này có nhiệm vụ gọi API và xử lý khi kéo thả Column xong xuôi
  const moveColumns = (dndOrderedColumns) => {
    //update chuẩn dữ liệu state board
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    //gọi api update board
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds})
  }

  const moveCardIntheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    console.log('Id client',columnId);
    //update chuẩn dữ liệu state board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)

    //Gọi API update Column
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns ) => {
    console.log('currentCardId',currentCardId)
    console.log('prevColumnId',prevColumnId);
    console.log('nextColumnId',nextColumnId);
    console.log('dndOrderedColumns',dndOrderedColumns);

    //update chuẩn dữ liệu state board
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    //Gọi API xử lý bacnkend
    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds: dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    })
  }
  if (!board) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap : 2,
        width: '100vw',
        height: '100vh'
      }}>
        <CircularProgress />
        <Typography>Loading Board</Typography>
      </Box>
    )
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn = {createNewColumn}
        createNewCard = {createNewCard}
        moveColumns= {moveColumns}
        moveCardIntheSameColumn={moveCardIntheSameColumn}
        moveCardToDifferentColumn= {moveCardToDifferentColumn}
      />
    </Container>
  )
}

export default Board
