import { Card, CardActionArea, CardContent, Typography, Avatar, Stack } from '@mui/material'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { extractIdFromUrl } from '@/api/swapi'

type Props = { name: string; url: string }

export function PersonCard({ name, url }: Props) {
  const id = useMemo(() => extractIdFromUrl(url), [url])
  const initials = name
    .split(' ')
    .map(p => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <Card elevation={2} sx={{ borderRadius: 3 }}>
      <CardActionArea component={Link} to={`/person/${id}`}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ width: 44, height: 44 }}>{initials}</Avatar>
            <Typography variant="subtitle1" fontWeight={600}>
              {name}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
