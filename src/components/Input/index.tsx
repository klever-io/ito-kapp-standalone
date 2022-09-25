import {
  InputNormal,
  InputContainer,
  SwitchContainer,
  Slider,
  Round,
  Toggle,
} from './styles';

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  option1?: string;
  option2?: string;
  type?: 'number' | 'checkbox' | undefined;
  label: string;
}

const getInput = (
  onChange?: any,
  type?: string,
  option1?: string,
  option2?: string,
) => {
  switch (type) {
    case 'number':
      return <InputNormal type="number" onChange={onChange} />;

    case 'checkbox':
      return (
        <Toggle>
          <span>{option1}</span>
          <SwitchContainer>
            <input type="checkbox" onChange={onChange} />
            <Slider>
              <Round />
            </Slider>
          </SwitchContainer>
          <span>{option2}</span>
        </Toggle>
      );

    default:
      return <InputNormal onChange={onChange} />;
  }
};

const Input: React.FC<IInput> = props => {
  const { type, label, option1, option2, onChange } = props;

  return (
    <InputContainer>
      <span>{label}</span>
      {getInput(onChange, type, option1, option2)}
    </InputContainer>
  );
};

export default Input;
