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

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.primary};
  -webkit-transition: 0.4s;
  transition: 0.4s;

  border-radius: 1.3rem;

  ::before {
    position: absolute;
    content: '';
    height: 22.5px;
    width: 22.5px;
    left: 4px;
    bottom: 4px;
    background-color: ${props => props.theme.white};
    border-radius: 50%;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
`;

export const Round = styled.div`
  border-radius: 34px;
`;

export const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    :checked + ${Slider}::before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
  }
`;

export const Toggle = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  span {
    font-size: 0.8rem;
  }
`;

export const customSelectStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: '',
    color: state.isSelected ? '#7B7DB2' : 'white',
    padding: 13,
  }),
  control: () => ({
    backgroundColor: 'rgb(34,35,69)',
    color: '#7B7DB2',
    borderRadius: '0.3rem',
    display: 'flex',
    paddingLeft: 10,
    border: '1px solid rgb(123, 125, 178)',
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition, color: 'white' };
  },
  menuList: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: 'rgb(34,35,69)',
    borderRadius: '0.3rem',
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: 'rgb(34,35,69)',
  }),
  input: (provided: any, state: any) => ({
    ...provided,
    color: '#7B7DB2',
    height: '1.85rem',
  }),
};
