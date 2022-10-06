import React from 'react';
import { Container, LateralContainer, Content, CloseIcon } from './styles';

interface IAlert {
  closeAlert: () => any;
  children: React.ReactNode;
}

const Alert: React.FC<IAlert> = ({ children, closeAlert }) => {
  return (
    <Container>
      <LateralContainer />
      <Content>
        <div>
          <span>{children}</span>
        </div>
        <CloseIcon size={23} onClick={() => closeAlert()} />
      </Content>
    </Container>
  );
};

export default Alert;
