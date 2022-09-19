import styled from 'styled-components';
import { IoCloseSharp } from 'react-icons/io5';

interface IFilter {
  clicked: boolean;
}

export const AssetsList = styled.div`
  gap: 0.7rem;
  display: flex;
  flex-direction: column;
`;

export const AssetContainer = styled.div`
  &:not(:first-child) {
    background-color: ${props => props.theme.card.background};

    span {
      text-align: center;
      color: ${props => props.theme.white};

      :nth-child(2) {
        font-size: 0.7rem;
      }
    }
  }

  &:first-child {
    span {
      user-select: none;
      text-align: center;
      color: ${props => props.theme.white};
      opacity: 0.5;
      font-weight: 100;
      font-size: 0.9rem;
    }
  }

  border-radius: 1rem;
  padding: 1rem 0.5rem;

  display: flex;
  align-items: center;
`;

export const IDAsset = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% / 3);
`;

export const SupplyContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% / 3);
`;

export const ButtonsContent = styled.div`
  display: flex;
  width: calc(100% / 3);
  justify-content: center;
  align-items: center;
`;

export const DetailsButton = styled.div`
  background-color: #363864;
  padding: 1rem;
  border-radius: 0.3rem;

  display: flex;
  user-select: none;

  cursor: pointer;

  &:hover {
    background-color: rgb(255, 255, 255, 0.05);
  }

  span {
    color: ${props => props.theme.primary};
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
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

export const Filters = styled.div`
  display: flex;
  margin: 1.3rem 0rem;
`;

export const FilterContainer = styled.div<IFilter>`
  background-color: ${props =>
    props.clicked ? props.theme.primary : 'rgb(255, 255, 255, 0.4)'};
  padding: 0.4rem 1.2rem;
  user-select: none;
  cursor: pointer;
  border-radius: 0.2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: ${({ theme }) => theme.white};
  }
`;

export const CloseIcon = styled(IoCloseSharp)`
  margin-top: 0.1rem;
  margin-left: 0.3rem;
  color: #fff;
`;
