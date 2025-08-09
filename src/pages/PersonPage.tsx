import { useParams, Link as RouterLink } from 'react-router-dom'
import { Box, Typography, Paper, Stack, Skeleton, Alert, Button } from '@mui/material'
import { usePerson } from '@/api/hooks'
import { PersonEditor } from '@/components/PersonEditor'
import { useTranslation } from 'react-i18next'

export function PersonPage() {
  const { t } = useTranslation()
  const { id = '' } = useParams()
  const { data, isLoading, isError, error } = usePerson(id)

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <Button component={RouterLink} to="/" variant="outlined">{t('person.back')}</Button>
        <Typography variant="h4">{t('person.title', { id })}</Typography>
      </Stack>

      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {(error as Error)?.message || t('person.loadError')}
        </Alert>
      )}

      {isLoading ? (
        <Stack spacing={2}>
          <Skeleton variant="text" height={42} width="40%" />
          <Skeleton variant="rounded" height={220} />
        </Stack>
      ) : data ? (
        <Paper sx={{ p: 3 }}>
          <PersonEditor id={id} apiData={data} />
        </Paper>
      ) : null}
    </Box>
  )
}
