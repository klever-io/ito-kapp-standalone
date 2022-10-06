import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgb(0, 0, 0, 0.5);
  z-index: 999;
`;

export const Content = styled.div`
  background-color: ${props => props.theme.modal.background};
  height: 200px;
  width: 300px;
`;
