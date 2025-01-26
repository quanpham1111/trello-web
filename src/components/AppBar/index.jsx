import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect'
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
function AppBar() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems:'center',
      justifyContent:'space-between',
      overflowX:'auto',
      paddingX: 2
    }}>
      <Box sx={{
        display: 'flex',
        alignItems:'center',
        gap: 2
      }}>
        <AppsIcon sx={{ color:'primary.main' }} />
        <Box sx={{
          display: 'flex',
          alignItems:'center',
          gap: 0.5
        }}>
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox fontSize='small'
            sx={{ color:'primary.main' }}
          />
          <Typography
            varian="span"
            sx={{ fontSize:'1.2rem',
              fontWeight:'Bold',
              color:'primary.main' }}>
            Trello
          </Typography>
        </Box>
        {/* sử dụng default breakpoint để responsive thanh app bar bên trái */}
        <Box sx={{ display:{ xs: 'none', md: 'flex', gap: 1 } }}>
          <Workspaces />
          <Recent />
          <Started />
          <Templates />
          <Button variant="outlined" startIcon={<LibraryAddIcon />}>Create</Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex',
        alignItems:'center',
        gap: 2 }}>
        <TextField id="outlined-search" label="Search..." type="search"size='small' sx={{ minWidth:'120px' }} />
        <ModeSelect />
        <Tooltip
          title="Notification">
          <Badge
            color="secondary"
            variant="dot"
            sx={{
              cursor:'pointer'
            }}>
            <NotificationsNoneIcon
              sx={{
                color:'primary.main'
              }}
            />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor:'pointer', color:'primary.main' }}/>
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar
