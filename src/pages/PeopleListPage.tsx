import { Box, Typography, Paper, Pagination, Stack, Alert, Skeleton } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { usePeople } from '@/api/hooks'
import { SearchBar } from '@/components/SearchBar'
import { PeopleGrid } from '@/components/PeopleGrid'
import { useDebounce } from '@/hooks/useDebounce'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const PAGE_SIZE = 10 // у SWAPI по умолчанию 10

export function PeopleListPage() {
  const { t } = useTranslation()
  const [params, setParams] = useSearchParams()
  const initialQuery = params.get('query') ?? ''

  const [query, setQuery] = useState(initialQuery)
  const debounced = useDebounce(query, 400)

  useEffect(() => {
    const next = new URLSearchParams(params)
    next.set('page', '1')
    if (debounced) next.set('query', debounced)
    else next.delete('query')
    setParams(next, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  const page = useMemo(() => {
    const p = Number(params.get('page') ?? '1')
    return Number.isFinite(p) && p > 0 ? p : 1
  }, [params])

  const apiQuery = params.get('query') ?? ''
  const { data, isLoading, isFetching, isError, error } = usePeople(page, apiQuery)
  const total = data?.count ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  const handlePage = (_: unknown, value: number) => {
    const next = new URLSearchParams(params)
    next.set('page', String(value))
    if (apiQuery) next.set('query', apiQuery)
    else next.delete('query')
    setParams(next, { replace: false })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{t('people.title')}</Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <SearchBar value={query} onChange={setQuery} placeholder={t('people.searchPlaceholder')} />
      </Paper>

      {data && (
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {t('people.found', { count: data.count })}
          </Typography>
          {isFetching && <Typography variant="caption" color="text.secondary">{t('people.updating')}</Typography>}
        </Stack>
      )}

      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {(error as Error)?.message || t('people.loadError')}
        </Alert>
      )}

      {isLoading ? (
        <Stack spacing={2}>
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} variant="rounded" height={88} />
          ))}
        </Stack>
      ) : (
        <>
          {data && data.results.length > 0 ? (
            <>
              <PeopleGrid items={data.results} />
              <Stack alignItems="center" mt={3} spacing={1}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePage}
                  shape="rounded"
                  color="primary"
                />
                {isFetching && <Typography variant="caption">{t('people.updating')}</Typography>}
              </Stack>
            </>
          ) : (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography>{t('people.empty')}</Typography>
            </Paper>
          )}
        </>
      )}
    </Box>
  )
}
