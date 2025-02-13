import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
function BoardContent({ board }) {
  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  //Yêu cầu chuột di chuyển 10px mới kích hoạt event
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  //nhấn giữ khoảng 250 mili giây và dung sai cảm ứng
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  //const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])
  const handleDragEnd = (event) => {
    console.log('handleDragEnd: ', event)
    const { active, over } = event

    //kiểm tra nếu không tồn tại over(kéo linh tinh chỗ này chỗ kia thì return luôn tránh lỗi)
    if (!over) return

    //Nếu vị trị sau khi kéo thả khác với vịt trí ban đầu
    if ( active.id !== over.id) {
      //lấy vị trí cũ (từ active)
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      //lấy vị trí mới (từ over)
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)
      const dndOrderedColumns = arrayMove (orderedColumns, oldIndex, newIndex)
      //2 console log này để sau này dùng để gọi Api lấy dữ liệu
      //const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
      //console.log('DndOrderedColumnsIds:', dndOrderedColumnsIds)
      //console.log('DndOrderedColumns:', dndOrderedColumns)

      //Cập nhật lai State
      setOrderedColumns(dndOrderedColumns)
    }
  }
  return (
    <DndContext onDragEnd = {handleDragEnd} sensors={sensors}>
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width:'100%',
        //Using String literal to call the variable from theme.js
        height: (theme) => theme.trello.boardContentHeight,
        p:'10px 0'
      }}>
        <ListColumns columns={orderedColumns}/>
      </Box>
    </DndContext>
  )
}

export default BoardContent
