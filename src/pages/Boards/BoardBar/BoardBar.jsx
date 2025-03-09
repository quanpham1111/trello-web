import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import { Tooltip } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import { capitalizeFirstLetter } from '~/utils/formatters'
function BoardBar({ board }) {
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
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
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
          label={board?.title}
          onClick = {() => {}}
        />
        {/* Private Block */}
        <Chip
          sx={Menu_Styled}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
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
              border: 'none',
              color: 'white',
              cursor:'pointer',
              '&:first-of-type': { bgcolor:'#a4b0be' }
            } }}
        >
          <Tooltip>
            <Avatar alt="Remy Sharp" src='https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.6435-9/161493629_2916914605221175_6977347449840896729_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHbELpLG212SPq_Azz7JwOzK0n8ylyr20krSfzKXKvbSZcj8cjLPdNBCsbiFGkYcA5gpr8QKr3xZJ2ZklE1dZiD&_nc_ohc=QrPB40eyBn4Q7kNvgGoWKap&_nc_oc=AdigArDR_uctGgLo8aleW4SA1zdCDtCm9xcs-VVAyAUJU0pL2ogqwhvUqJBvZii1-KA&_nc_zt=23&_nc_ht=scontent.fsgn2-3.fna&_nc_gid=AiBNUu7MOmF7I_lUXzK1p_f&oh=00_AYA77yROs_VNYQzUDYEXaT8weoen8bWasHB4kwnbAUNP9w&oe=67EFEFAA' />
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
