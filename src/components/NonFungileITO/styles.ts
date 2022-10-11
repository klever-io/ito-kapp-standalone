import styled from 'styled-components';

export const Pack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PackItem = styled.div`
  background-color: #222345;
  padding: 3rem 0.5rem 1rem 0.5rem;

  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  border-radius: 0.3rem;
  gap: 0.3rem;

  p {
    text-align: center;
    &:first-child {
      font-size: 0.7rem;
      color: ${props => props.theme.ito.lightpink};
    }
    &:not(:first-child) {
      font-size: 1rem;
    }
    color: white;
  }
`;

export const Cube = styled.img`
  width: 7rem;
  margin-bottom: -3.6rem;
  z-index: 999;

  @media (max-width: 890px) {
    width: 5rem;
  }
`;

export const BuyButton = styled.div`
  background-color: ${props => props.theme.primary};
  padding: 0.35rem 1.4rem;
  border-radius: 0.4rem;
  margin-top: 0.4rem;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  span {
    text-align: center;
    color: ${props => props.theme.white};
    font-weight: bold;
    font-size: 0.8rem;
  }
`;
