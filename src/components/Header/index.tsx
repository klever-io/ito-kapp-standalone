import { Container } from './styles';

interface IHeader {
  children: React.ReactNode;
}

const Header: React.FC<IHeader> = ({ children }) => {
  return (
    <Container>
      <span>{children}</span>
      <div />
    </Container>
  );
};

export default Header;
