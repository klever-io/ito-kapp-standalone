import styled from 'styled-components';

export const Logo = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
`;

export const MainContent = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin-top: 2rem;

  span {
    font-size: 1rem;
    color: #fff;
    user-select: none;
  }
`;

export const AddressContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`;

export const AddressContent = styled.div`
  margin-top: 1.6rem;
  background-color: rgb(36, 38, 79);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  border-radius: 0.3rem;
  min-height: 2rem;
  margin-right: 0.5rem;
`;

export const ButtonITOPage = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(170, 51, 181);
  border-radius: 0.6rem;
  padding: 1rem 2rem;
  cursor: pointer;

  span {
    color: rgb(170, 51, 181);
  }

  &:hover {
    background-color: rgb(170, 51, 181);

    span {
      color: white;
    }
  }
`;
