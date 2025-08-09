import { Routes, Route, Navigate } from 'react-router-dom'
import { PeopleListPage } from '@/pages/PeopleListPage'
import { PersonPage } from '@/pages/PersonPage'
import { Layout } from '@/components/Layout'
import { ScrollToTop } from '@/components/ScrollToTop'

export function AppRouter() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PeopleListPage />} />
        <Route path="/person/:id" element={<PersonPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
