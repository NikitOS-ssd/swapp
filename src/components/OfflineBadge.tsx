import { useEffect, useState } from 'react'
import { Chip } from '@mui/material'
import CloudOffIcon from '@mui/icons-material/CloudOff'

export function OfflineBadge() {
  const [online, setOnline] = useState(navigator.onLine)
  useEffect(() => {
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])
  if (online) return null
  return (
    <Chip
      icon= {< CloudOffIcon />}
label = "Вы офлайн"
color = "warning"
size = "small"
sx = {{ ml: 2 }}
    />
  )
}
