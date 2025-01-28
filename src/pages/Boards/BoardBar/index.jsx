import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import LockPersonIcon from '@mui/icons-material/LockPerson'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { Tooltip } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
function BoardBar() {
  //Custom Menu Blocks
  const Menu_Styled = {
    color: 'white',
    bgcolor: 'transparent',
    boder:'none',
    paddingX: '5px',
    borderRadius: '5px',
    '.MuiSvgIcon-root':{
      color: 'white'
    },
    '&:hover':{
      bgcolor: 'primary.50'
    } }
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems:'center',
      justifyContent:'space-between',
      gap: 2,
      paddingX: 2,
      overflowX:'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      borderBottom: '1px solid white'
    }}
    >
      <Box sx={{
        display: 'flex',
        alignItems:'center',
        gap: 2
      }}>
        {/* Dashboard Block */}
        <Chip
          sx={Menu_Styled}
          icon={<DashboardIcon />}
          label="Nguyen Quan"
          onClick = {() => {}}
        />
        {/* Private Block */}
        <Chip
          sx={Menu_Styled}
          icon={<LockPersonIcon />}
          label="Public Private Workspaces"
          onClick = {() => {}}
        />
        {/* Add to Drive Block */}
        <Chip
          sx={Menu_Styled}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          onClick = {() => {}}
        />
        {/* Automation Block */}
        <Chip
          sx={Menu_Styled}
          icon={<ElectricBoltIcon />}
          label="Automation"
          onClick = {() => {}}
        />
        {/* Filters Block */}
        <Chip
          sx={Menu_Styled}
          icon={<FilterListIcon />}
          label="Filters"
          onClick = {() => {}}
        />
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems:'center',
        gap: 2
      }}>
        <Button
          variant="outlined"
          startIcon= {<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover':{
              borderColor: 'white'
            }
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={5}
          total={8}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: '34px',
              height: '34px',
              fontSize: 16,
              border: 'none'
            } }}
        >
          <Tooltip>
            <Avatar alt="Remy Sharp" src='https://p16-sign-sg.tiktokcdn.com/aweme/1080x1080/tos-alisg-avt-0068/28c4ef651842f2f840b6ecf66f607672.jpeg?lk3s=a5d48078&nonce=34895&refresh_token=e5fd70d655c070d582bb903cf7d76318&x-expires=1738083600&x-signature=5HvnC1sJql7gOD6DwO7LJbtrzvU%3D&shp=a5d48078&shcp=81f88b70s' />
          </Tooltip>
          <Tooltip>
            <Avatar alt="Remy Sharp" src='https://kenh14cdn.com/203336854389633024/2024/9/26/img2240-1727338462507599549809-1727350509184-17273505093931611744024.jpg' />
          </Tooltip>
          <Tooltip>
            <Avatar alt="Remy Sharp" src='https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj' />
          </Tooltip>
          <Tooltip>
            <Avatar alt="Remy Sharp" src='https://yt3.googleusercontent.com/Scnb6zniVBsy8eT2v01XP8xUN_DhlSuDie_ohDbfkpUkPhkl4DzP6PYzrnqPhnJ7HsktuYTjP1Y=s900-c-k-c0x00ffffff-no-rj' />
          </Tooltip>
          <Tooltip>
            <Avatar alt="Remy Sharp" src='https://i.scdn.co/image/ab6761610000e5eb0e62e694576ab6f8e56db3d8' />
          </Tooltip>
        </AvatarGroup></Box>
    </Box>
  )
}

export default BoardBar
