import { useEffect, useState } from 'react'
import { Chip } from '@mui/material'
import CloudOffIcon from '@mui/icons-material/CloudOff'
import { useTranslation } from 'react-i18next'

export function OfflineBadge() {
  const { t } = useTranslation()
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
      icon={<CloudOffIcon />}
      label={t('offline')}
      color="warning"
      size="small"
      sx={{ ml: 2 }}
    />
  )
}
