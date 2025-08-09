import { useQuery } from '@tanstack/react-query'
import { fetchPeople, fetchPerson } from './swapi'

export function usePeople(page: number, search: string) {
  return useQuery({
    queryKey: ['people', { page, search }],
    queryFn: () => fetchPeople(page, search),
    // TODO: fix this
    // keepPreviousData: true,
    staleTime: 60_000,
  })
}

export function usePerson(id: string) {
  return useQuery({
    queryKey: ['person', id],
    queryFn: () => fetchPerson(id),
    enabled: !!id,
    staleTime: 60_000,
  })
}
