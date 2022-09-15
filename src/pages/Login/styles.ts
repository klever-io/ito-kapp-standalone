import styled from 'styled-components';

export const Logo = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
`;

export const MainContent = styled.div`
  /* background-color: red; */
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
  width: 70%;
  margin-top: 1.6rem;
  background-color: rgb(36, 38, 79);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  border-radius: 0.3rem;
  min-height: 2rem;
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
