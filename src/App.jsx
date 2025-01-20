import Button from '@mui/material/Button'
import HomeIcon from '@mui/icons-material/AccessAlarm'
import Stack from '@mui/material/Stack'
import { pink } from '@mui/material/colors'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useColorScheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <DarkModeIcon fontSize='small' />Dark
            </div>
          </MenuItem>
          <MenuItem value="system">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <SettingsBrightnessIcon fontSize='small' />System
            </div>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  //With this Hook: Getting system value with Light or Dark mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)')
  console.log('prefersDarkMode', prefersDarkMode)
  console.log('prefersLightMode', prefersLightMode)

  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  )
}
function App() {
  return (
    <>
      <ModeSelect />
      <hr />
      <ModeToggle />
      <div>nguyenquan</div>
      <Button variant="text">Text</Button>
      <Button variant="contained" color='success'>Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Stack direction="row" spacing={3}>
        <HomeIcon />
        <HomeIcon color="primary" />
        <HomeIcon color="secondary" />
        <HomeIcon color="success" />
        <HomeIcon color="action" />
        <HomeIcon color="disabled" />
        <HomeIcon color="disabled" />
        <HomeIcon sx={{ color: pink[500] }} />
      </Stack>
    </>
  )
}

export default App
