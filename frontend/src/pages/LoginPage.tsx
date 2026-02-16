import styled from 'styled-components';

const Container = styled.section`
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 2rem;
`;

export const LoginPage = () => {
  return (
    <Container>
      <h1>Авторизация</h1>
      <p>Пустая страница для будущей формы входа.</p>
    </Container>
  );
};
