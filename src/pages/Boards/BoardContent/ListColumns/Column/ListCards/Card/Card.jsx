import AttachmentIcon from '@mui/icons-material/Attachment'
import CommentIcon from '@mui/icons-material/Comment'
import GroupIcon from '@mui/icons-material/Group'
import { Button } from '@mui/material'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
function Card({ temporaryHideMedia }) {
  if (temporaryHideMedia) {
    return (
      <MuiCard sx={{
        cursor:'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 2)',
        //tắt overflow đi để hiện thanh scroll bar
        overflow:'unset'
      }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { p : 1.5 } }}>
          <Typography >card test 01</Typography>
        </CardContent>
      </MuiCard>
    )
  }
  return (
    <MuiCard sx={{
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
    </MuiCard>
  )
}
export default Card