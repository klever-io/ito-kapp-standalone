import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FungibleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3rem;
  background-color: #0b0b1e;
  gap: 2rem;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }
`;

export const Content = styled.div`
  width: 50%;

  :first-child {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  @media (max-width: 1200px) {
    width: 90%;
  }
`;

export const AssetName = styled.span`
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const Button = styled.div`
  background-color: ${props => props.theme.primary};
  width: 100%;
  padding: 0.75rem 0rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.3rem;
  cursor: pointer;

  span {
    color: white;
    text-align: center;
    font-size: 0.9rem;
  }
`;

export const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    font-size: 0.9rem;

    :first-child {
      color: ${props => props.theme.primary};
      font-weight: bold;
    }

    :nth-child(2) {
      color: ${props => props.theme.white};
    }
  }
`;

export const PriceRange = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 2rem;
`;

export const PriceRangeTitle = styled.span`
  color: ${props => props.theme.primary};
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  span {
    color: ${props => props.theme.darkText};
  }
`;
