
import Card from './Card/Card'
import Box from '@mui/material/Box'

function ListCards() {
  return (
    <Box sx={{
      //padding và margin cho thanh scroll bar và nội dung
      p: '0 5px',
      m: '0 5px',
      display:'flex',
      flexDirection:'column',
      gap: 1,
      //ẩn thánh scroll ngang
      overflowX: 'hidden',
      //tự auto scroll khi list card vượt max height
      overflowY:'auto',
      //tính chiều cao cho phần list card
      maxHeight: (theme) => `calc(
      ${theme.trello.boardContentHeight} - 
      ${theme.spacing(5)} - 
      ${theme.trello.columnHeaderHeight} -
      ${theme.trello.columnFooterHeight}
      )`,
      //Css cho thanh scroll bar
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#ced0da',
        borderRadius:'8px'
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor : 'white'
      }
    }}>
      {/* Card 1 */}
      <Card />
      <Card temporaryHideMedia />
    </Box> )
}

export default ListCards