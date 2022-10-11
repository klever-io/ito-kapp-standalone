import styled from 'styled-components';

interface IAsset {
  selected?: boolean;
}

export const MainContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  padding: 0rem 1rem;
`;

export const SideList = styled.div`
  width: 30rem;
  height: calc(100vh - 4rem);
  padding: 1rem 1rem;
`;

export const AssetsList = styled.div`
  gap: 0.7rem;
  display: flex;
  flex-direction: column;
`;

export const ScrollList = styled.div`
  height: calc(100vh - 18rem);
  padding: 0rem 0.2rem;
  overflow: scroll;
  gap: 0.7rem;
  display: flex;
  flex-direction: column;
`;

export const AssetContainer = styled.div<IAsset>`
  cursor: pointer;
  background-color: ${props => (props.selected ? '#16162c' : '#222345')};
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

  & > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
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
    color: white;
  }
`;

export const SelectContainer = styled.div`
  z-index: 999;
`;

export const KeyLabel = styled.span`
  font-size: 1.5rem;
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

export const HashContent = styled.div`
  display: flex;
  flex: row;
  align-items: center;
  gap: 0.3rem;
`;
