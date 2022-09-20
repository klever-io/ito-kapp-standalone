import React from 'react';
import HeaderPage from 'components/HeaderPage';
import { Container } from 'pages/styles';
import Input from 'components/Input';
import { FormContainer } from './styles';

const CreateITO: React.FC = () => {
  return (
    <>
      <Container>
        <HeaderPage>Create ITO</HeaderPage>
        <FormContainer>
          <Input label="Address" />
          <Input label="Address" type="number" />
          <Input label="Address" type="checkbox" />
        </FormContainer>
      </Container>
    </>
  );
};

export default CreateITO;
