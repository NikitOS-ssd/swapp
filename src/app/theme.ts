import { createTheme, ThemeOptions } from '@mui/material/styles'

export function buildTheme(mode: 'light' | 'dark') {
  const common: ThemeOptions = {
    palette: {
      mode,
      primary: { main: mode === 'dark' ? '#f44336' : '#1976d2' },
      secondary: { main: '#7c3aed' },
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'].join(','),
      h4: { fontWeight: 700 },
      h5: { fontWeight: 700 },
    },
    components: {
      MuiPaper: {
        defaultProps: { elevation: 1 },
        styleOverrides: { root: { borderRadius: 12 } },
      },
      MuiButton: {
        styleOverrides: { root: { borderRadius: 10, textTransform: 'none', fontWeight: 600 } },
      },
    },
  }
  return createTheme(common)
}
