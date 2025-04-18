import { useState } from 'react'
import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import SvgIcon from '@mui/material/SvgIcon'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Templates from './Menus/Templates'
import Started from './Menus/Started'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menus/Profiles'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import InputAdornment from '@mui/material/InputAdornment'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
function AppBar() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems:'center',
      justifyContent:'space-between',
      overflowX:'auto',
      paddingX: 2,
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
    }}>
      <Box sx={{
        display: 'flex',
        alignItems:'center',
        gap: 2
      }}>
        <AppsIcon sx={{ color:'white' }} />
        <Box sx={{
          display: 'flex',
          alignItems:'center',
          gap: 0.5
        }}>
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox fontSize='small'
            sx={{ color:'white' }}
          />
          <Typography
            varian="span"
            sx={{ fontSize:'1.2rem',
              fontWeight:'Bold',
              color:'white' }}>
            Trello
          </Typography>
        </Box>
        {/* sử dụng default breakpoint để responsive thanh app bar bên trái */}
        <Box sx={{ display:{ xs: 'none', md: 'flex', gap: 1 } }}>
          <Workspaces />
          <Recent />
          <Started />
          <Templates />
          <Button
            sx={{
              color:'white',
              border:'none'
            }}
            variant="outlined"
            startIcon={<LibraryAddIcon />}>
            Create
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex',
        alignItems:'center',
        gap: 2 }}>
        <TextField
          id="outlined-search"
          label="Search..."
          type="text"
          size='small'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }} />
              </InputAdornment>
            ),
            //dấu X để xóa ký tự trong Text Field
            endAdornment: (
              <InputAdornment position= "end">
                <CloseIcon
                  fontSize="small"
                  sx={{
                    color: searchValue ? 'white' :'transparent',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSearchValue('')}
                />
              </InputAdornment>
            )
          }
          }
          sx={{
            minWidth:'120px',
            maxWidth:'170px',
            '& label': {
              color:'white'
            },
            '& input': {
              color:'white'
            },
            '& label.Mui-focused': {
              color:'white'
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset':{
                borderColor:'white'
              },
              '&:hover fieldset':{
                borderColor:'white'
              },
              '&.Mui-focused fieldset':{
                borderColor:'white'
              }
            }
          }} />
        <ModeSelect />
        <Tooltip
          title="Notification">
          <Badge
            color="warning"
            variant="dot"
            sx={{
              cursor:'pointer'
            }}>
            <NotificationsNoneIcon
              sx={{
                color:'white'
              }}
            />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor:'pointer', color:'white' }}/>
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar
