import { useParams, Link as RouterLink } from 'react-router-dom'
import { Box, Typography, Paper, Stack, Skeleton, Alert, Button } from '@mui/material'
import { usePerson } from '@/api/hooks'
import { PersonEditor } from '@/components/PersonEditor'

export function PersonPage() {
  const { id = '' } = useParams()
  const { data, isLoading, isError, error } = usePerson(id)

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <Button component={RouterLink} to="/" variant="outlined">Назад</Button>
        <Typography variant="h4">Персонаж #{id}</Typography>
      </Stack>

      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {(error as Error)?.message || 'Не удалось загрузить персонажа'}
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
