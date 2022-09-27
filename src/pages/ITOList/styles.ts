import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  padding: 0rem 1rem;
`;

export const SideList = styled.div`
  width: 30rem;
  height: 70vh;
  overflow: scroll;
  padding: 0rem 1rem;
`;

export const AssetsList = styled.div`
  gap: 0.7rem;
  display: flex;
  flex-direction: column;
`;

export const AssetContainer = styled.div`
  cursor: pointer;
  background-color: #222345;
  span {
    text-align: center;
    color: ${props => props.theme.white};

    :nth-child(2) {
      font-size: 0.7rem;
    }
  }

  border-radius: 0.3rem;
  padding: 1rem 0.5rem;

  display: flex;
  align-items: center;
`;

export const ITOContainer = styled.div`
  width: 100%;
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  user-select: none;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.7rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ITOContent = styled.div`
  width: 100%;
`;

export const PackContainer = styled.div`
  background-color: #16162c;
  width: 100%;
  padding: 1rem 3rem;
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  span {
    &:first-child {
      font-size: 1.5rem;
    }
    color: white;
  }
`;

export const ChooseAsset = styled.div`
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    user-select: none;
    color: ${props => props.theme.white};
    opacity: 0.3;
  }
`;

export const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(50px, 1fr));
  grid-gap: 1rem;
`;

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

export const IDAsset = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const LoadingContainer = styled.div`
  height: 30rem;
  display: flex;
  align-items: center;
`;

export const EmptyList = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;

  span {
    user-select: none;
    color: ${props => props.theme.white};
  }
`;
