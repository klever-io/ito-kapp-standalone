import styled from 'styled-components';

export const PackItem = styled.div`
  background-color: #222345;
  padding: 1rem 0.5rem;

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
