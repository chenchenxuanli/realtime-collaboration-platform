import { useState, useCallback } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { register } from '../services/authApi';
import styles from './RegisterPage.module.css';

const MIN_PASSWORD_LENGTH = 6;

function validateEmail(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) return 'Please enter a valid email address';
  return undefined;
}

function validatePassword(value: string): string | undefined {
  if (!value) return 'Password is required';
  if (value.length < MIN_PASSWORD_LENGTH)
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  return undefined;
}

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [backendError, setBackendError] = useState<string | null>(null);

  const runValidation = useCallback(() => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrors({ email: emailError, password: passwordError });
    return !emailError && !passwordError;
  }, [email, password]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setBackendError(null);
      setSuccessMessage(null);
      if (!runValidation()) return;

      setLoading(true);
      try {
        const res = await register({
          email: email.trim(),
          password,
          displayName: displayName.trim() || undefined,
        });
        setSuccessMessage(
          res.data
            ? `Account created. Welcome${res.data.displayName ? `, ${res.data.displayName}` : ''}!`
            : 'Registration successful.'
        );
        setEmail('');
        setPassword('');
        setDisplayName('');
        setErrors({});
      } catch (err) {
        setBackendError(err instanceof Error ? err.message : 'Registration failed.');
      } finally {
        setLoading(false);
      }
    },
    [email, password, displayName, runValidation]
  );

  return (
    <div className={styles.page}>
      <Card as="section" className={styles.card}>
        <h1 className={styles.title}>Create your account</h1>
        <p className={styles.subtitle}>
          Join the realtime collaboration platform.
        </p>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setErrors((prev) => ({ ...prev, email: validateEmail(email) }))}
            error={errors.email}
            autoComplete="email"
            disabled={loading}
          />
          <Input
            type="password"
            label="Password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() =>
              setErrors((prev) => ({ ...prev, password: validatePassword(password) }))
            }
            error={errors.password}
            autoComplete="new-password"
            disabled={loading}
            minLength={MIN_PASSWORD_LENGTH}
          />
          <Input
            type="text"
            label="Display name (optional)"
            placeholder="How you'll appear to others"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            autoComplete="name"
            disabled={loading}
            maxLength={255}
          />

          {backendError && (
            <p className={styles.backendError} role="alert">
              {backendError}
            </p>
          )}
          {successMessage && (
            <p className={styles.successMessage} role="status">
              {successMessage}
            </p>
          )}

          <Button
            type="submit"
            loading={loading}
            className={styles.submitButton}
          >
            Create account
          </Button>
        </form>
      </Card>
    </div>
  );
}
