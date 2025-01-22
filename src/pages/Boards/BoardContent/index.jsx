import React from 'react'
import Box from '@mui/material/Box'
function BoardContent() {
  return (
    <Box sx={{
      backgroundColor: 'primary.main',
      width:'100%',
      //Using String literal to call the variable from theme.js
      height: (theme) => `calc( 100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight} )`,
      display:'flex',
      alignItems:'center'}}>
          Board Content
    </Box>)
}

export default BoardContent
