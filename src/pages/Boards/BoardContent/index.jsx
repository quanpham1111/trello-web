import AddCardIcon from '@mui/icons-material/AddCard'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Cloud from '@mui/icons-material/Cloud'
import CommentIcon from '@mui/icons-material/Comment'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import GroupIcon from '@mui/icons-material/Group'
import { Button, Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import React from 'react'
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'
function BoardContent() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box sx={{
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      width:'100%',
      //Using String literal to call the variable from theme.js
      height: (theme) => theme.trello.boardContentHeight,
      p:'10px 0'
    }}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height:'100%',
        display:'flex',
        overflowX:'auto',
        overflowY:'hidden',
        '&::-webkit-scrollbar-track':{
          m:2
        }
      }}>
        <Box sx={{
          minWidth:'300px',
          maxWidth: '300px',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333640' : '#ebecf0'),
          ml: 2,
          borderRadius:'6px',
          height:'fit-content',
          //tính chiều cao cho phần box column
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}>
          {/*Box Column Header*/}
          <Box sx={{
            height: COLUMN_HEADER_HEIGHT,
            p: 2,
            display:'flex',
            alignItems:'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant='h6' sx={{
              cursor:'pointer',
              fontWeight:'bold',
              fontSize: '1rem'
            }}>
              Column Title
            </Typography>
            <Box>
              <Tooltip title="More option">
                <ExpandMoreIcon
                  sx={{ color: 'text.primary', cursor:'pointer' }}
                  id="basic-column-dropdown"
                  aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                />
              </Tooltip>
              <Menu
                id="basic-menu-workspaces"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown'
                }}
              >
                <MenuItem>
                  <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentCopyIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentPasteIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><DeleteForeverIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/* Box List Card */}
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
            ${COLUMN_HEADER_HEIGHT} -
            ${COLUMN_FOOTER_HEIGHT}
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
            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 2)',
              //tắt overflow đi để hiện thanh scroll bar
              overflow:'unset'
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://cdn.tgdd.vn//GameApp/-1//cach-su-dung-phan-mem-trello-quan-ly-cong-viec-hieu-qua-de-dang-thumb-800x450.jpg"
                title="green iguana"
              />
              <CardContent sx={{ p: 1.5, '&:last-child': { p : 1.5 } }}>
                <Typography >Nguyen Quan</Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }} >
                <Button size="small" startIcon={<GroupIcon />}>20</Button>
                <Button size="small" startIcon={<CommentIcon />}>20</Button>
                <Button size="small" startIcon={<AttachmentIcon />}>20</Button>
              </CardActions>
            </Card>
            {/* Card 01 */}
            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 2)',
              //tắt overflow đi để hiện thanh scroll bar
              overflow:'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p : 1.5 } }}>
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 2)',
              //tắt overflow đi để hiện thanh scroll bar
              overflow:'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p : 1.5 } }}>
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 2)',
              //tắt overflow đi để hiện thanh scroll bar
              overflow:'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p : 1.5 } }}>
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 2)',
              //tắt overflow đi để hiện thanh scroll bar
              overflow:'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p : 1.5 } }}>
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 2)',
              //tắt overflow đi để hiện thanh scroll bar
              overflow:'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p : 1.5 } }}>
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 2)',
              //tắt overflow đi để hiện thanh scroll bar
              overflow:'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p : 1.5 } }}>
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
          </Box>
          {/* Box Column Footer */}
          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p:2,
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between'
          }}>
            <Button startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor:'pointer' }} />
            </Tooltip>
          </Box>
        </Box>
        <Box sx={{
          minWidth:'300px',
          maxWidth: '300px',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333640' : '#ebecf0'),
          ml: 2,
          borderRadius:'6px',
          height:'fit-content',
          //tính chiều cao cho phần box column
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}>
          {/*Box Column Header*/}
          <Box sx={{
            height: COLUMN_HEADER_HEIGHT,
            p: 2,
            display:'flex',
            alignItems:'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant='h6' sx={{
              cursor:'pointer',
              fontWeight:'bold',
              fontSize: '1rem'
            }}>
              Column Title
            </Typography>
            <Box>
              <Tooltip title="More option">
                <ExpandMoreIcon
                  sx={{ color: 'text.primary', cursor:'pointer' }}
                  id="basic-column-dropdown"
                  aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                />
              </Tooltip>
              <Menu
                id="basic-menu-workspaces"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown'
                }}
              >
                <MenuItem>
                  <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentCopyIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentPasteIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><DeleteForeverIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/* Box List Card */}
          <Box sx={{
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
            ${COLUMN_HEADER_HEIGHT} -
            ${COLUMN_FOOTER_HEIGHT}
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
            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 2)',
              //tắt overflow đi để hiện thanh scroll bar
              overflow:'unset'
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://cdn.tgdd.vn//GameApp/-1//cach-su-dung-phan-mem-trello-quan-ly-cong-viec-hieu-qua-de-dang-thumb-800x450.jpg"
                title="green iguana"
              />
              <CardContent sx={{ p: 1.5, '&:last-child': { p : 1.5 } }}>
                <Typography >Nguyen Quan</Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }} >
                <Button size="small" startIcon={<GroupIcon />}>20</Button>
                <Button size="small" startIcon={<CommentIcon />}>20</Button>
                <Button size="small" startIcon={<AttachmentIcon />}>20</Button>
              </CardActions>
            </Card>
            {/* Card 01 */}
            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 2)',
              //tắt overflow đi để hiện thanh scroll bar
              overflow:'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p : 1.5 } }}>
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 2)',
              //tắt overflow đi để hiện thanh scroll bar
              overflow:'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p : 1.5 } }}>
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
          </Box>
          {/* Box Column Footer */}
          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p:2,
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between'
          }}>
            <Button startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor:'pointer' }} />
            </Tooltip>
          </Box>
        </Box>
      </Box>
      {/*Box Column*/}
    </Box>)
}

export default BoardContent
