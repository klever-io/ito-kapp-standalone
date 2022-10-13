import styled from 'styled-components';

interface IFormContainer {
  precedence?: number;
}

interface IForm {
  span?: number;
}

export const FormContainer = styled.div<IFormContainer>`
  background-color: ${({ precedence }) =>
    precedence === 1
      ? 'rgb(34, 35, 69)'
      : precedence === 2
      ? '#292a53'
      : '#313264'};
  padding: 1.5rem 2rem;
  border-radius: 1rem;

  -webkit-box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  gap: 1rem;

  :first-child {
    margin-top: 1rem;
  }
`;

export const Form = styled.div<IForm>`
  display: grid;
  grid-template-columns: repeat(
    ${({ span }) => (span ? span : 2)},
    minmax(50px, 1fr)
  );
  grid-gap: 1rem;
`;

export const TitleForm = styled.span`
  color: ${props => props.theme.white};
  font-size: 1.3rem;
`;

export const Forms = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const Button = styled.div`
  background-color: ${props => props.theme.primary};
  padding: 1rem 2rem;
  cursor: pointer;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.7rem;

  span {
    color: ${props => props.theme.white};
    font-size: 0.8rem;
    text-align: center;
  }

  @media (max-width: 700px) {
    padding: 1rem 3rem;
    span {
      font-size: 0.8rem;
    }
  }
`;
