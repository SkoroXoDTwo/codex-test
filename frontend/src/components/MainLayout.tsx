import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthUser } from '../types';

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
  padding: 16px 24px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
`;

const Nav = styled.nav`
  display: flex;
  gap: 16px;
`;

const NavLink = styled(Link)`
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
`;

const Main = styled.main`
  margin: 0 auto;
  max-width: 960px;
  padding: 32px 24px;
`;

const UserName = styled.span`
  font-size: 14px;
  color: #111827;
`;

type MainLayoutProps = PropsWithChildren & {
  user: AuthUser | null;
};

export const MainLayout = ({ children, user }: MainLayoutProps) => {
  return (
    <Wrapper>
      <Header>
        <strong>Test Case Service</strong>
        <Nav>
          <NavLink to="/">Главная</NavLink>
          <NavLink to="/login">Авторизация</NavLink>
          <NavLink to="/register">Регистрация</NavLink>
          {user ? <UserName>Вы вошли как: {user.name}</UserName> : null}
        </Nav>
      </Header>
      <Main>{children}</Main>
    </Wrapper>
  );
};
