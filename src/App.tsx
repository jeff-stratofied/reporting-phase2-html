import AppShell from './components/AppShell'
import ReportingPage from './pages/ReportingPage'
import { UserProvider } from './context/UserContext'

export default function App() {
  return (
    <UserProvider>
      <AppShell>
        <ReportingPage />
      </AppShell>
    </UserProvider>
  )
}
