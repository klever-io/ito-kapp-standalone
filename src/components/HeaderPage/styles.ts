import styled from 'styled-components';

export const Container = styled.div``;

export const LabelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  span {
    font-size: 1.6rem;
    color: ${props => props.theme.white};
    padding: 0.3rem;
    font-weight: 500;
    user-select: none;
  }
`;

export const TitleHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const IconContainer = styled.div`
  opacity: 0.7;
  margin-top: 0.2rem;
  cursor: pointer;
`;

export const Line = styled.div`
  width: 100%;
  height: 0.05rem;
  background-color: ${props => props.theme.white};
  margin-top: 1rem;
  opacity: 0.8;
  border-radius: 1rem;
`;

export const Button = styled.div`
  background-color: ${props => props.theme.primary};
  border-radius: 0.2rem;
  padding: 0.5rem 0.8rem;
  cursor: pointer;
  text-align: center;

  span {
    font-size: 1rem;
  }
`;

export const BackArrow = styled.img`
  cursor: pointer;
  margin-right: 0.2rem;
  margin-top: 0.3rem;
  filter: invert(99%) sepia(5%) saturate(22%) hue-rotate(285deg)
    brightness(106%) contrast(100%);
`;
