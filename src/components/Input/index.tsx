import { InputNormal, InputContainer } from './styles';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

interface IInput {
  type?: 'number' | 'checkbox' | undefined;
  label: string;
}

const getInput = (label: string, type?: string) => {
  switch (type) {
    case 'number':
      return <InputNormal type="number" />;

    case 'checkbox':
      return (
        <Toggle
          defaultChecked={false}
          icons={false}
          onChange={(e: any) => console.log(e)}
        />
      );

    default:
      return <InputNormal />;
  }
};

const Input: React.FC<IInput> = ({ type, label }) => {
  return (
    <InputContainer>
      <span>{label}</span>
      {getInput(label, type)}
    </InputContainer>
  );
};

export default Input;
