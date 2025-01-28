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
      <FormControl size='small' sx={{
        '& .MuiOutlinedInput-root':{
          'fieldset':{
            borderColor: 'white'
          }
        }
      }} >
        <InputLabel
          id="label-select-dark-light-mode"
          sx={{
            color: 'white',
            '&.Mui-focused':{
              color:'white'
            }
          }}
        >
            Mode
        </InputLabel>
        <Select
          labelId="label-select-dark-light-mode"
          id="select-dark-light-mode"
          value={mode}
          onChange={handleChange}
          label="Mode"
          sx={{
            color:'white',
            '&.MuiOutlinedInput-notchedOutline':{
              borderColor: 'white'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white'
            },
            '.MuiSvgIcon-root':{
              color: 'white'
            }
          }}
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
