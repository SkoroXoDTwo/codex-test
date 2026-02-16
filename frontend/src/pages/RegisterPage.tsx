import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { httpClient } from '../api/httpClient';
import { AuthUser } from '../types';

const Container = styled.section`
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 32px;
`;

const Form = styled.form`
  display: grid;
  gap: 16px;
  max-width: 480px;
`;

const Label = styled.label`
  display: grid;
  gap: 8px;
  font-size: 14px;
`;

const Input = styled.input`
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
`;

const Button = styled.button`
  width: fit-content;
  border: 0;
  border-radius: 8px;
  background: #2563eb;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 16px;
  cursor: pointer;
`;

const Message = styled.p`
  margin: 0;
  font-size: 14px;
`;

type RegisterResponse = {
  message: string;
  user: AuthUser;
};

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await httpClient.post<RegisterResponse>('/auth/register', {
        name,
        login,
        email,
        password,
      });

      setMessage(response.data.message);
      navigate('/login');
    } catch (error) {
      setMessage('Ошибка регистрации. Проверьте данные.');
    }
  };

  return (
    <Container>
      <h1>Регистрация</h1>
      <Form onSubmit={onSubmit}>
        <Label>
          Имя
          <Input value={name} onChange={(event) => setName(event.target.value)} />
        </Label>
        <Label>
          Логин
          <Input value={login} onChange={(event) => setLogin(event.target.value)} />
        </Label>
        <Label>
          Почта
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Label>
        <Label>
          Пароль
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Label>
        <Button type="submit">Зарегистрироваться</Button>
      </Form>
      {message ? <Message>{message}</Message> : null}
    </Container>
  );
};
