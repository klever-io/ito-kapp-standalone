import {
  InputNormal,
  InputContainer,
  SwitchContainer,
  Slider,
  Round,
  Toggle,
} from './styles';

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultValue?: string | number;
  option1?: string;
  option2?: string;
  type?: 'number' | 'checkbox' | undefined;
  label?: string;
  placeholder?: string;
}

const getInput = (
  onChange?: any,
  type?: string,
  option1?: string,
  option2?: string,
  defaultValue?: string | number,
  placeholder?: string,
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
      if (defaultValue)
        return <InputNormal onChange={onChange} defaultValue={defaultValue} />;
      return (
        <InputNormal
          onChange={onChange}
          placeholder={placeholder ? placeholder : ''}
        />
      );
  }
};

const Input: React.FC<IInput> = props => {
  const { type, label, option1, option2, onChange, defaultValue, placeholder } =
    props;

  return (
    <InputContainer>
      {label && <span>{label}</span>}
      {getInput(onChange, type, option1, option2, defaultValue, placeholder)}
    </InputContainer>
  );
};

export default Input;
