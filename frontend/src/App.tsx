import { useEffect, useState } from 'react'

interface HealthResponse {
  status: string
}

export default function App() {
  const [backendStatus, setBackendStatus] = useState<string>('loading...')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/health')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data: HealthResponse) => setBackendStatus(data.status ?? 'unknown'))
      .catch((err) => {
        setError(err.message ?? 'Failed to reach backend')
        setBackendStatus('error')
      })
  }, [])

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Realtime Collaboration Platform</h1>
      <p>
        <strong>Backend status:</strong>{' '}
        {error ? (
          <span style={{ color: 'crimson' }}>{error}</span>
        ) : (
          <span style={{ color: backendStatus === 'ok' ? 'green' : 'inherit' }}>
            {backendStatus}
          </span>
        )}
      </p>
    </main>
  )
}
