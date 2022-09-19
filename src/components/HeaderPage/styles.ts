import styled from 'styled-components';

export const Container = styled.div`
  span {
    font-size: 1.6rem;
    color: ${props => props.theme.white};
    padding: 0.3rem;
    font-weight: 500;
    user-select: none;
  }

  div {
    width: 100%;
    height: 0.05rem;
    background-color: ${props => props.theme.white};
    margin-top: 1rem;
    opacity: 0.8;
    border-radius: 1rem;
  }
`;
