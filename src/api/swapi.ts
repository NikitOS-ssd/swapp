const BASE_URL = 'https://swapi.py4e.com/api'

export type SwapiListResponse<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export type PersonListItem = {
  name: string
  url: string
}

export type PersonDetails = {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
}

export function extractIdFromUrl(url: string) {
  const match = url.match(/\/(\d+)\/?$/)
  return match ? match[1] : ''
}

export async function fetchPeople(page: number, search: string) {
  const params = new URLSearchParams()
  if (page > 1) params.set('page', String(page))
  if (search.trim()) params.set('search', search.trim())

  const res = await fetch(`${BASE_URL}/people/?${params.toString()}`)
  if (!res.ok) throw new Error('Failed to fetch people')
  const data = (await res.json()) as SwapiListResponse<PersonListItem>
  return data
}

export async function fetchPerson(id: string) {
  const res = await fetch(`${BASE_URL}/people/${id}/`)
  if (!res.ok) throw new Error('Failed to fetch person')
  const data = (await res.json()) as PersonDetails
  return data
}
