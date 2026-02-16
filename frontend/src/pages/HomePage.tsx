import styled from 'styled-components';

const Container = styled.section`
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 2rem;
`;

export const HomePage = () => {
  return (
    <Container>
      <h1>Главная страница</h1>
      <p>Здесь позже будет дашборд и список тест-кейсов.</p>
    </Container>
  );
};
