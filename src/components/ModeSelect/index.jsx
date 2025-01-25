import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import Box from '@mui/material/Box'
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
    <Box>
      <FormControl size='small' >
        <InputLabel id="label-select-dark-light-mode">
            Mode
        </InputLabel>
        <Select
          labelId="label-select-dark-light-mode"
          id="select-dark-light-mode"
          value={mode}
          onChange={handleChange}
          label="Mode"
        >
          <MenuItem value="light">
            <Box style={{ display: 'flex', alignItems: 'center', gap: '8xp' }}>
              <LightModeIcon fontSize="small" />Light
            </Box>
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
    </Box>
  )
}

export default ModeSelect
