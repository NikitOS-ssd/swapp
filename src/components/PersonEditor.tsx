import { useEffect, useMemo, useState } from 'react'
import {
  Box, Stack, TextField, MenuItem, Button, Snackbar, Alert, Divider, Typography, Chip
} from '@mui/material'
import type { PersonDetails } from '@/api/swapi'
import { usePeopleEdits, mergeWithEdits } from '@/store/peopleEdits'

type Props = {
  id: string
  apiData: PersonDetails
}

const genders = ['male', 'female', 'n/a', 'hermaphrodite', 'none', 'unknown']

export function PersonEditor({ id, apiData }: Props) {
  const saved = usePeopleEdits((s) => s.saved[id])
  const saveEdits = usePeopleEdits((s) => s.saveEdits)
  const clearEdits = usePeopleEdits((s) => s.clearEdits)

  const merged = useMemo(() => mergeWithEdits(apiData, saved), [apiData, saved])

  // Локальный стейт формы (не сохраняется автоматически)
  const [form, setForm] = useState({
    name: merged.name,
    height: merged.height,
    mass: merged.mass,
    hair_color: merged.hair_color,
    skin_color: merged.skin_color,
    eye_color: merged.eye_color,
    birth_year: merged.birth_year,
    gender: merged.gender,
  })

  useEffect(() => {
    // если поменялся источник (например, после обновления saved), обновим форму
    setForm({
      name: merged.name,
      height: merged.height,
      mass: merged.mass,
      hair_color: merged.hair_color,
      skin_color: merged.skin_color,
      eye_color: merged.eye_color,
      birth_year: merged.birth_year,
      gender: merged.gender,
    })
  }, [merged])

  const [toast, setToast] = useState<string | null>(null)

  const handle = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  const onSaveLocal = () => {
    saveEdits(id, form)
    setToast('Изменения сохранены локально')
  }

  const onResetToApi = () => {
    clearEdits(id)
    setToast('Локальные изменения сброшены')
  }

  const hasLocal = Boolean(saved)

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5">{merged.name}</Typography>
        {hasLocal && <Chip label="Сохранено локально" color="secondary" size="small" />}
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <Stack spacing={2}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField fullWidth label="Имя" value={form.name} onChange={handle('name')} />
          <TextField fullWidth select label="Пол" value={form.gender} onChange={handle('gender')}>
            {genders.map((g) => (
              <MenuItem key={g} value={g}>{g}</MenuItem>
            ))}
          </TextField>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField fullWidth label="Год рождения" value={form.birth_year} onChange={handle('birth_year')} />
          <TextField fullWidth label="Рост" value={form.height} onChange={handle('height')} />
          <TextField fullWidth label="Масса" value={form.mass} onChange={handle('mass')} />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField fullWidth label="Цвет волос" value={form.hair_color} onChange={handle('hair_color')} />
          <TextField fullWidth label="Цвет глаз" value={form.eye_color} onChange={handle('eye_color')} />
          <TextField fullWidth label="Цвет кожи" value={form.skin_color} onChange={handle('skin_color')} />
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={1}>
          <Button variant="outlined" onClick={onResetToApi} disabled={!hasLocal}>
            Сбросить правки
          </Button>
          <Button variant="contained" onClick={onSaveLocal}>
            Сохранить локально
          </Button>
        </Stack>
      </Stack>

      <Snackbar
        open={!!toast}
        autoHideDuration={2000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setToast(null)} variant="filled">
          {toast}
        </Alert>
      </Snackbar>
    </Box>
  )
}
