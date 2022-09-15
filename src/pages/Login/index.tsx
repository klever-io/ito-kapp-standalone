import { useEffect, useState } from 'react';
import Header from 'components/Header';
import { Container } from 'pages/styles';
import { MainContent, AddressContainer, ButtonITOPage } from './styles';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    const address = await window.kleverWeb.getWalletAddress();

    if (address.length > 0) {
      setWalletAddress(address);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <>
      <Container>
        <Header>Access your account</Header>
        <MainContent>
          {walletAddress.length > 0 ? (
            <>
              <span>Wallet connected!</span>
              <AddressContainer>
                <span>{walletAddress}</span>
              </AddressContainer>
              <Link to="/ito">
                <ButtonITOPage>
                  <span>ITO Page</span>
                </ButtonITOPage>
              </Link>
            </>
          ) : (
            <span>
              Connect your wallet with Klever Extension. Make sure it is
              installed in your browser.
            </span>
          )}
        </MainContent>
      </Container>
    </>
  );
};
export default Login;
