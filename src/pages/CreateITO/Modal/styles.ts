import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

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
  width: 50%;
  border-radius: 0.5rem;
`;

export const CloseContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 1rem;
  padding-top: 1rem;
`;

export const CloseButton = styled(MdClose)`
  cursor: pointer;
`;

export const CreateITOButton = styled.div`
  background-color: ${props => props.theme.primary};
  padding: 0.9rem;

  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;

  cursor: pointer;

  span {
    color: white;
    font-size: 0.9rem;
    user-select: none;
  }
`;
