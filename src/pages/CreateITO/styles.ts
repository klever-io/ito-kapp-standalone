import styled from 'styled-components';

export const FormContainer = styled.div`
  background-color: rgb(34, 35, 69);
  padding: 1rem 2rem;
  border-radius: 1rem;

  display: grid;
  grid-template-columns: repeat(2, minmax(50px, 1fr));
  grid-gap: 1rem;
`;
