import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PersonDetails } from '@/api/swapi'

export type EditableFields = Pick<
  PersonDetails,
  | 'name'
  | 'height'
  | 'mass'
  | 'hair_color'
  | 'skin_color'
  | 'eye_color'
  | 'birth_year'
  | 'gender'
>

type PeopleEditsState = {
  saved: Record<string, EditableFields>
  saveEdits: (id: string, data: EditableFields) => void
  clearEdits: (id: string) => void
}

export const usePeopleEdits = create<PeopleEditsState>()(
  persist(
    (set) => ({
      saved: {},
      saveEdits: (id, data) =>
        set((s) => ({ saved: { ...s.saved, [id]: data } })),
      clearEdits: (id) =>
        set((s) => {
          const next = { ...s.saved }
          delete next[id]
          return { saved: next }
        }),
    }),
    { name: 'people-edits-v1' }
  )
)

export function mergeWithEdits(api: PersonDetails, local?: EditableFields): PersonDetails {
  if (!local) return api
  return { ...api, ...local }
}
