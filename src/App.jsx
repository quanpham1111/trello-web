import Button from '@mui/material/Button'
import HomeIcon from '@mui/icons-material/AccessAlarm';
import Stack from '@mui/material/Stack';
import { pink } from '@mui/material/colors';
function App() {
  return (
    <>
      <div>nguyenquan</div>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Stack direction="row" spacing={3}>
        <HomeIcon />
        <HomeIcon color="primary" />
        <HomeIcon color="secondary" />
        <HomeIcon color="success" />
        <HomeIcon color="action" />
        <HomeIcon color="disabled" />
        <HomeIcon sx={{ color: pink[500] }} />
      </Stack>
    </>
  )
}

export default App
