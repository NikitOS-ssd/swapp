
import { Box } from '@mui/material'
import { PersonCard } from './PersonCard'
import { PersonListItem } from '@/api/swapi'

export function PeopleGrid({ items }: { items: PersonListItem[] }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: 2,
      }}
    >
      {items.map(p => (
        <Box key={p.url}>
          <PersonCard name={p.name} url={p.url} />
        </Box>
      ))}
    </Box>
  )
}
