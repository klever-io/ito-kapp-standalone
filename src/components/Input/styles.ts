import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-direction: column;

  span {
    user-select: none;
    font-size: 0.85rem;
    color: ${props => props.theme.form.input};
  }
`;

export const InputNormal = styled.input`
  border: 1px solid ${props => props.theme.form.input};
  border-radius: 0.3rem;
  padding: 0.6rem 0.9rem;
  color: ${props => props.theme.form.input};
  width: 100%;
`;
