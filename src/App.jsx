import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useColorScheme } from '@mui/material/styles'
function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
  // setAge(event.target.value);
    const selectedMode = event.target.value
    setMode(selectedMode)
  }

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
        <Select
          labelId="label-select-dark-light-mode"
          id="select-dark-light-mode"
          value={mode}
          onChange={handleChange}
          label="Mode"
        >
          <MenuItem value="light">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8xp' }}>
              <LightModeIcon fontSize="small" />Light
            </div>
          </MenuItem>
          <MenuItem value="dark">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DarkModeIcon fontSize='small' />Dark
            </Box>
          </MenuItem>
          <MenuItem value="system">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SettingsBrightnessIcon fontSize='small' />System
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
function App() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh'}}>
      <Box sx={{
        backgroundColor: 'primary.light',
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems:'center'
      }}>
        <ModeSelect />
      </Box>
      <Box sx={{
        backgroundColor: 'primary.dark',
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems:'center'
      }}
      >
        Board Bar
      </Box>
      <Box sx={{
        backgroundColor: 'primary.main',
        width:'100%',
        height: (theme) => `calc( 100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight} )`,
        display:'flex',
        alignItems:'center'
      }}>
      Board Content
      </Box>
    </Container>
  )
}

export default App
