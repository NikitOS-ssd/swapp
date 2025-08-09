import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'
import { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { OfflineBadge } from './OfflineBadge'
import { LangSwitch } from './LangSwitch'
import { useTheme } from '@mui/material/styles'

export function Layout({ children }: PropsWithChildren) {
  const theme = useTheme()
  const titleColor = theme.palette.mode === 'dark' ? '#000' : '#fff'

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" enableColorOnDark>
        <Toolbar sx={{ gap: 2 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{ textDecoration: 'none' }}
            sx={{ color: titleColor }}
          >
            SWApp
          </Typography>
          <OfflineBadge />
          <Box sx={{ flex: 1 }} />
          <LangSwitch />
          <ThemeToggle />
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 3 }}>{children}</Container>
    </Box>
  )
}
