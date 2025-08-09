import { PropsWithChildren, useMemo, useState } from 'react'
import { QueryClient, QueryClientProvider, useIsFetching } from '@tanstack/react-query'
import { ThemeProvider, CssBaseline, LinearProgress, Box } from '@mui/material'
import { buildTheme } from './theme'
import { resolveMode, useThemeStore } from '@/store/theme'
import { BrowserRouter } from 'react-router-dom'

function TopLoader() {
  const fetching = useIsFetching()
  if (!fetching) return null
  return (
    <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 2000 }}>
      <LinearProgress />
    </Box>
  )
}

export function AppProviders({ children }: PropsWithChildren) {
  const [client] = useState(() => new QueryClient())
  const pref = useThemeStore((s) => s.mode)
  const mode = resolveMode(pref)
  const theme = useMemo(() => buildTheme(mode), [mode])

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <TopLoader />
          {children}
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}