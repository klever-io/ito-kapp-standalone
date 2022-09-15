import { useEffect, useState } from 'react';
import Header from 'components/Header';
import Copy from 'components/Copy';

import { Container } from 'pages/styles';
import {
  MainContent,
  AddressContainer,
  AddressContent,
  ButtonITOPage,
} from './styles';
import { Link } from 'react-router-dom';
import { parseAddress } from 'utils';
import { useWidth } from 'contexts/width';

const Login: React.FC = () => {
  const width = useWidth();
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    const address = await window.kleverWeb.getWalletAddress();

    if (address.length > 0) {
      setWalletAddress(address);
    }
  };

  useEffect(() => {
    connectWallet();
  }, [walletAddress]);

  return (
    <>
      <Container>
        <Header>Access your account</Header>
        <MainContent>
          {walletAddress.length > 0 ? (
            <>
              <span>Wallet connected!</span>
              <AddressContainer>
                <AddressContent>
                  <span>
                    {width.isMobile
                      ? parseAddress(walletAddress, 25)
                      : walletAddress}
                  </span>
                </AddressContent>
                <Copy data={walletAddress} info="Address" />
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
