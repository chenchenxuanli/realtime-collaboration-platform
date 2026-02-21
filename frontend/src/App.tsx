import { useEffect, useState } from 'react';
import RegisterPage from './pages/RegisterPage';
import styles from './App.module.css';

function BackendStatus() {
  const [status, setStatus] = useState<string>('…');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: { status?: string }) => setStatus(data.status ?? 'unknown'))
      .catch(() => {
        setError('Backend unreachable');
        setStatus('error');
      });
  }, []);

  return (
    <span className={styles.backendStatus}>
      Backend: {error ? <span className={styles.backendError}>{error}</span> : status}
    </span>
  );
}

export default function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.logo}>Realtime Collaboration</h1>
        <BackendStatus />
      </header>
      <main className={styles.main}>
        <RegisterPage />
      </main>
    </div>
  );
}
