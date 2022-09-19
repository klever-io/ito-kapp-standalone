import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: grid;
  place-content: center;

  width: 100vw;
  height: 100vh;

  z-index: 10;
  backdrop-filter: brightness(0.3);
`;

export const Image = styled.img`
  border-radius: 0.5rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  max-width: 90vw;

  padding: 2rem;

  height: fit-content;

  border-radius: 1rem;

  background-color: ${props => props.theme.card.background};
`;

export const JSONContent = styled.div`
  height: 30rem;
  overflow: scroll;
`;

export const DetailsRow = styled.pre`
  color: ${props => props.theme.white};
`;

export const Button = styled.div`
  background-color: ${props => props.theme.primary};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 0.7rem 0rem;
  cursor: pointer;
  border-radius: 0.5rem;
`;
