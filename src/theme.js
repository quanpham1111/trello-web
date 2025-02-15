//yarrn import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
const APP_BAR_HEIGHT ='58px'
const BOARD_BAR_HEIGHT ='60px'
const BOARD_CONTENT_HEIGHT = `calc( 100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT} )`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'
// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT
  },
  components: {
    //Style cho thanh Scroll bar cho đẹp hơn
    MuiCssBaseline: {
      styleOverrides: {
        '*::-webkit-scrollbar': {
          width:'8px',
          height:'6px'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#dcdde1',
          borderRadius:'8px'
        },
        '*::-webkit-scrollbar-thumb:hover': {
          backgroundColor : 'white'
        }
      }
    },
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'none',
          borderWidth:'0.5px',
          '&:hover': {
            borderWidth:'2px'
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        // Name of the slot
        root:{
          // Some CSS
          //color: theme.palette.primary.main,
          '&.MuiTypography-body1': { fontSize: '0.875rem' }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: {
          fontSize:'0.875rem', //color: theme.palette.primary.main,
          //'.MuiOutlinedInput-notchedOutline':{
          // borderColor: theme.palette.primary.light
          // }
          '& fieldset': { borderWidth:'0.5px !important' },
          '&:hover fieldset': { borderWidth:'2px !important' },
          //giữ trạng thái tô đậm viền khi không hover
          '&.Mui-focused fieldset': { borderWidth:'2px !important' }
        }
      }
    }
  },
  colorSchemes: {
    /* light: {
      palette: {
        primary: teal,
        secondary: deepOrange
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange
      }
    }*/
  }
  // ...other properties
})
export default theme