import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100vh;
  background: #f7f9fc;
  color: #1f2937;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    sans-serif;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
`;

const Main = styled.main`
  margin: 0 auto;
  max-width: 960px;
  padding: 2rem 1.5rem;
`;

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Wrapper>
      <Header>
        <strong>Test Case Service</strong>
        <Nav>
          <NavLink to="/">Главная</NavLink>
          <NavLink to="/login">Вход</NavLink>
          <NavLink to="/register">Регистрация</NavLink>
        </Nav>
      </Header>
      <Main>{children}</Main>
    </Wrapper>
  );
};
