/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  InputNormal,
  InputContainer,
  SwitchContainer,
  Slider,
  Round,
  Toggle,
  customSelectStyles,
} from './styles';
import Select from 'react-select';

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultValue?: string | number;
  option1?: string;
  option2?: string;
  dropdownOptions?: any;
  type?: 'number' | 'checkbox' | 'dropdown' | undefined;
  label: string;
}

const getInput = (
  onChange?: any,
  type?: string,
  option1?: string,
  option2?: string,
  defaultValue?: string | number,
  dropdownOptions?: any,
) => {
  switch (type) {
    case 'number':
      return <InputNormal type="number" onChange={onChange} />;

    case 'dropdown':
      return (
        <Select
          styles={customSelectStyles}
          options={dropdownOptions}
          onChange={onChange}
        />
      );

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
      return <InputNormal onChange={onChange} />;
  }
};

const Input: React.FC<IInput> = props => {
  const {
    type,
    label,
    option1,
    option2,
    onChange,
    defaultValue,
    dropdownOptions,
  } = props;

  return (
    <InputContainer>
      <span>{label}</span>
      {getInput(
        onChange,
        type,
        option1,
        option2,
        defaultValue,
        dropdownOptions,
      )}
    </InputContainer>
  );
};

export default Input;
