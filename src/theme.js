import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
import { BorderColor } from '@mui/icons-material'
import { colors } from '@mui/material'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight:'58px',
    boardBarHeight:'58px'
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'none'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        // Name of the slot
        root:({ theme }) => {
          // Some CSS
          return {
            color: theme.palette.primary.main,
            fontSize: '0.875rem'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => {
          // Some CSS
          return {
            color: theme.palette.primary.main,
            fontSize:'0.875rem',
            '.MuiOutlinedInput-notchedOutline':{
              borderColor: theme.palette.primary.light
            }
          }
        }
      }
    }
  },
  colorSchemes: {
    light: {
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
    }
  }
  // ...other properties
})
export default theme