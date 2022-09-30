import {
  Container,
  Line,
  LabelHeader,
  IconContainer,
  Button,
  TitleHeader,
} from './styles';
import { IoRefreshSharp } from 'react-icons/io5';

interface IHeaderPage {
  children: React.ReactNode;
  button?: string;
  onPressButton?: () => void;
  refresh?: () => void;
}

const HeaderPage: React.FC<IHeaderPage> = ({
  children,
  refresh,
  button,
  onPressButton,
}) => {
  return (
    <Container>
      <LabelHeader>
        <TitleHeader>
          <span>{children}</span>
          {refresh && (
            <IconContainer onClick={() => refresh()}>
              <IoRefreshSharp color="white" size={20} />
            </IconContainer>
          )}
        </TitleHeader>
        {button && (
          <Button onClick={() => onPressButton && onPressButton()}>
            <span>{button}</span>
          </Button>
        )}
      </LabelHeader>
      <Line />
    </Container>
  );
};

export default HeaderPage;
