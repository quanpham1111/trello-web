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
  defaultDropAnimationSideEffects,
  closestCorners,
  closestCenter,
  pointerWithin,
  rectIntersection,
  getFirstCollision
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState, useCallback, useRef } from 'react'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'
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
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  //Điểm va chạm cuối cùng (xử lý thuật toán phát hiện va chạm)
  const lastOverId = useRef(null)
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  //hàm tìm Columns theo CardId
  const findColumnByCardId = (cardId) => {
    //tạo ra 1 mảng mới từ Card._id để lấy toàn bộ id, kiểm tra xem mảng đó có chứa{includes} Card Id thì return ra luôn và nếu không có thì trả về undefined
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  //function chung xử lý việc cập nhật lại State trong trường hợp di chuyển Card giữa các Column khác nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns(prevColumns => {
      const overCardIndex = overColumn?.cards?.findIndex( card => card._id === overCardId)

      //logic tính toán "cardIndex mới" từ thư viện dndkit, để tính toán xem thử (cardindex đang nằm trên hay dưới) qua vị trí của Rect
      //Quá đau đầu- nhiều khi muốn từ chối hiểu =))
      let newCardIndex
      const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.length + 1

      //clone mảng OrderedColumnsState cũ ra một cái mới để xử lý data rồi return để cập nhật lại orderedColumnsState mới
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns?.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns?.find(column => column._id === overColumn._id)

      //Column cũ
      if (nextActiveColumn) {
        //xóa card ở cái column active (có thể hiểu là là column cũ, cái lúc mà kéo card ra khỏi nó để sang column khác)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
        //cập nhật lại mảng cardOrderIds để chuẩn dữ liệu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      //Column mới
      if (nextOverColumn) {
        //kiểm tra xem card đang kéo nó có tồn tại ở overColumn chưa, nếu có thì xóa nó đi
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
        //đối với trường hợp drag end thì phải cập nhật lại chuẩn data
        const rebuilt_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId:nextOverColumn._id
        }
        //Tiếp theo là thêm card đang kéo vào overColumn theo vị trí index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuilt_activeDraggingCardData)

        //cập nhật lại mảng cardOrderIds để chuẩn dữ liệu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }

      console.log('nextColumn', nextColumns )
      return nextColumns
    })
  }

  //Trigger khi bắt đầu kéo{Drag} một phần tử
  const handleDragStart = (event) => {
    console.log('handleDragStart', event)
    setActiveDragItemId(event?.active?.id)
    setactiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN )
    setActiveDragItemData(event?.active?.data?.current)

    //nếu là kéo card mới thực hiện hành động set giá trị oldColumnWhenDraggingCard
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }
  //Trigger trong quá trình kéo{Drag} từ Column này sang Column khác
  const handleDragOver = (event) => {
    //Không làm gì thêm nếu đang kéo Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    //Còn nếu kéo Card thì xử lý thêm để có thể kéo card qua lại giữa các Columns
    console.log('handle Drag Over', event)
    const { active, over } = event

    //kiểm tra nếu không tồn tại active hoặc over(kéo linh tinh chỗ này chỗ kia thì return luôn tránh lỗi)
    if (!active || !over) return
    //Khai báo lại tên ID cho rõ nghĩa hơn bằng cách dùng Object Destructuring để lấy Data từ active
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    //overCard: là card đang tương tác trên hoặc dưới so với cái Card được kéo
    const { id: overCardId } = over

    //Tìm 2 cái Columns theo CardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    console.log('activeid', activeColumn)
    console.log('overid', overColumn)
    //Nếu 1 trong 2 column không tồn tại thì trả về null để tránh crash trang web
    if (!activeColumn || !overColumn ) return
    //xử lý logic nếu kéo các card trong chính column đó thì sẽ không có hành động gì xãy ra
    //Nhưng khi kéo sang column khác thì nó sẽ trả ra kết quả
    if (activeColumn._id !== overColumn._id) {
      console.log('Card đã bị kéo sang column khác')
      //Tìm vị trí{index} của overcard sắp được thả trong vị trí activeCard sắp được thả
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
  }
  //Trigger khi kết thúc hành động kéo{Drag} 1 phần tử => hành động thả{Drop}
  const handleDragEnd = (event) => {
    console.log('handleDragEnd: ', event)
    const { active, over } = event

    //kiểm tra nếu không tồn tại over(kéo linh tinh chỗ này chỗ kia thì return luôn tránh lỗi)
    if (!active || !over) return

    //xử lý kéo thả card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {

      //Khai báo lại tên ID cho rõ nghĩa hơn bằng cách dùng Object Destructuring để lấy Data từ active
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      //overCard: là card đang tương tác trên hoặc dưới so với cái Card được kéo
      const { id: overCardId } = over

      //Tìm 2 cái Columns theo CardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)
      //Nếu 1 trong 2 column không tồn tại thì trả về null để tránh crash trang web
      if (!activeColumn || !overColumn ) return
      //Hành động kéo thả card giữa 2 column khác nhau
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        //gọi function chung kéo thả card 
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData,
          getFirstCollision
        )
      } else {
        //Hành động kéo thả card trong cùng 1 cái column

        //lấy vị trí cũ (từ oldColumnWhenDraggingCard)
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
        //lấy vị trí mới (từ over)
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)

        const dndOrderedCards = arrayMove (oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
        console.log('dndOderedCards', dndOrderedCards)
        setOrderedColumns(prevColumns => {
        //clone mảng OrderedColumnsState cũ ra một cái mới để xử lý data rồi return để cập nhật lại orderedColumnsState mới
          const nextColumns = cloneDeep(prevColumns)

          //Tìm tới column mà ta đang thả
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)

          //cập nhật lại 2 giá trị mới là card và cardOrderIds trong targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

          //trả về vịt trí mới chuẩn vị trí
          return nextColumns
        })

      }
    }

    //xử lý kéo thả column trong board content
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      console.log('Hành động keo thả Colum - tạm thời không làm gì')
      //Nếu vị trí sau khi kéo thả khác với vịt trí ban đầu
      if ( active.id !== over.id) {
        //lấy vị trí cũ (từ active)
        const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
        //lấy vị trí mới (từ over)
        const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)
        const dndOrderedColumns = arrayMove (orderedColumns, oldColumnIndex, newColumnIndex)
        //2 console log này để sau này dùng để gọi Api lấy dữ liệu
        //const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
        //console.log('DndOrderedColumnsIds:', dndOrderedColumnsIds)
        //console.log('DndOrderedColumns:', dndOrderedColumns)

        //Cập nhật lai State
        setOrderedColumns(dndOrderedColumns)
      }
    }
    //khi thả drag ra sẽ trả về null để giữ chỗ khi thêm data mới vào
    setActiveDragItemId(null)
    setactiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
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

  //args: arguments : các đối số và tham số
  //custom lại thuật toán phát hiện va chạm
  const collisionDetectionStrategy = useCallback((args) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }

    //Tìm các điểm giao nhau va chạm với con trỏ
    const poiterIntersections = pointerWithin(args)
    const intersections = !!poiterIntersections?.length
      ? poiterIntersections
      : rectIntersection(args)

    let overId = getFirstCollision(intersections, 'id')
    // console.log('overId:', overId)

    if (overId) {
      //fix flickering khi kéo card xong các column khác
      //nếu cá over nó là column thì sẽ tìm đến cái cardId gần nhất bên trong khu vực va chạm đó dựa vào thuật toán phát hiện va chạm

      const checkColumn = orderedColumns.find(column => column._id === overId)
      if (checkColumn) {
        
        overId = closestCenter({
          ...args,
          droppableContainers : args.droppableContainers.filter(container => {
            return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
          })[0] ?.id
        })
      }
      lastOverId.current = overId
      return [{ id: overId }]
    }
    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemType, orderedColumns])
  return (
    //Hành động kéo thả
    <DndContext
      sensors={sensors}
      //thuật toán phát hiện va chạm( nếu không có nó thì card với cover lớn
      // sẽ không kéo qua column khác được do bị conflict giữa card và column),

      //Update video 37( nếu dùng Closest Coners sẽ có bug flickering và sai lệch dữ liệu)
      // chúng ta se dụng closercorners thay vì closercenter
      //collisionDetection={closestCorners}

      //Tự custom nâng cao thuật toán phát hiện va chạm để fix lỗi flickering
      collisionDetection={collisionDetectionStrategy}

      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd = {handleDragEnd}>
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
