import { useEffect } from 'react';
import Header from 'components/Header';
import { Container } from 'pages/styles';
import { useNavigate } from 'react-router-dom';

const ITOList: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.kleverWeb.address) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <Container>
        <Header>ITOs</Header>
      </Container>
    </>
  );
};

export default ITOList;
