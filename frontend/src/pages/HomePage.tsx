import { useState } from 'react';
import styled from 'styled-components';
import { AuthUser } from '../types';

const Container = styled.section`
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 32px;
`;

const NameForm = styled.form`
  margin-top: 16px;
  display: flex;
  gap: 12px;
`;

const Input = styled.input`
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
`;

const Button = styled.button`
  border: 0;
  border-radius: 8px;
  background: #2563eb;
  color: #ffffff;
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
`;

type HomePageProps = {
  user: AuthUser | null;
  onNameChange: (name: string) => void;
};

export const HomePage = ({ user, onNameChange }: HomePageProps) => {
  const [nameInput, setNameInput] = useState(user?.name ?? '');

  if (!user) {
    return (
      <Container>
        <h1>Главная страница</h1>
        <p>Для продолжения перейдите в авторизацию или регистрацию в шапке.</p>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Главная страница</h1>
      <p>Добро пожаловать, {user.name}.</p>
      <p>После авторизации вы можете ввести имя:</p>
      <NameForm
        onSubmit={(event) => {
          event.preventDefault();
          onNameChange(nameInput);
        }}
      >
        <Input
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
          placeholder="Введите имя"
        />
        <Button type="submit">Сохранить имя</Button>
      </NameForm>
    </Container>
  );
};
