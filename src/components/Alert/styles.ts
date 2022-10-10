import styled from 'styled-components';
import { IoMdCloseCircleOutline } from 'react-icons/io';

export const Container = styled.div`
  background-color: #2b2c56;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0.2rem;
  min-height: 2.8rem;

  gap: 0.7rem;
`;

export const LateralContainer = styled.div`
  background-color: #16162c;
  width: 1rem;
  min-height: 2.8rem;
  border-top-left-radius: 0.2rem;
  border-bottom-left-radius: 0.2rem;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-right: 1.5rem;
  span {
    color: #7e7fbf;
  }
`;

export const CloseIcon = styled(IoMdCloseCircleOutline)`
  color: #7e7fbf;
  float: right;
  cursor: pointer;
`;
