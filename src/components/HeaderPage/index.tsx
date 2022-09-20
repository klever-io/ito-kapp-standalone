import { Container } from './styles';

interface IHeaderPage {
  children: React.ReactNode;
}

const HeaderPage: React.FC<IHeaderPage> = ({ children }) => {
  return (
    <Container>
      <span>{children}</span>
      <div />
    </Container>
  );
};

export default HeaderPage;
