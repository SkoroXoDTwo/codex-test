import { useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AuthUser } from './types';

const AUTH_STORAGE_KEY = 'auth-user';

const getInitialUser = (): AuthUser | null => {
  const userJson = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!userJson) {
    return null;
  }

  try {
    return JSON.parse(userJson) as AuthUser;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

export const App = () => {
  const [user, setUser] = useState<AuthUser | null>(getInitialUser);

  const onAuthSuccess = (nextUser: AuthUser) => {
    setUser(nextUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
  };

  const onNameChange = (nextName: string) => {
    if (!user || !nextName.trim()) {
      return;
    }

    const nextUser = {
      ...user,
      name: nextName.trim(),
    };

    setUser(nextUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
  };

  const layoutUser = useMemo(() => user, [user]);

  return (
    <MainLayout user={layoutUser}>
      <Routes>
        <Route path="/" element={<HomePage user={user} onNameChange={onNameChange} />} />
        <Route path="/login" element={<LoginPage onAuthSuccess={onAuthSuccess} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  );
};
