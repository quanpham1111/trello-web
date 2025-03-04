import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
function BoardContent({ board }) {
  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  //Yêu cầu chuột di chuyển 10px mới kích hoạt event
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  //nhấn giữ khoảng 250 mili giây và dung sai cảm ứng
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  //const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])
  //Cùng 1 thời điểm chỉ có 1 phần tử đang được kéo(column hoặc card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setactiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])
  //Trigger khi bắt đầu kéo{Drag} một phần tử
  const handleDragStart = (event) => {
    console.log('handleDragStart', event)
    setActiveDragItemId(event?.active?.id)
    setactiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN )
    setActiveDragItemData(event?.active?.data?.current)
  }
  //Trigger khi kết thúc hành động kéo{Drag} 1 phần tử => hành động thả{Drop}
  const handleDragEnd = (event) => {
    console.log('handleDragEnd: ', event)
    const { active, over } = event

    //kiểm tra nếu không tồn tại over(kéo linh tinh chỗ này chỗ kia thì return luôn tránh lỗi)
    if (!over) return

    //Nếu vị trí sau khi kéo thả khác với vịt trí ban đầu
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
    //khi thả drag ra sẽ trả về null để giữ chỗ khi thêm data mới vào
    setActiveDragItemId(null)
    setactiveDragItemType(null)
    setActiveDragItemData(null)
  }
  //Animation khi thả ra thì phần giữ chỗ vẫn giữ chứ không bị mất ngang
  const customdropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd = {handleDragEnd}
      sensors={sensors}>
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width:'100%',
        //Using String literal to call the variable from theme.js
        height: (theme) => theme.trello.boardContentHeight,
        p:'10px 0'
      }}>
        <ListColumns columns={orderedColumns}/>
        <DragOverlay dropAnimation={customdropAnimation}>
          {(!activeDragItemType) && null}
          {/* Phần giữ chỗ khi kéo sẽ xuất hiện Column mờ*/}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {/* Phần giữ chỗ khi kéo sẽ xuất hiện Card mờ*/}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
