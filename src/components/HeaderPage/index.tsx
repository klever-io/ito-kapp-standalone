import {
  Container,
  Line,
  LabelHeader,
  IconContainer,
  Button,
  BackArrow,
  TitleHeader,
} from './styles';
import { IoRefreshSharp } from 'react-icons/io5';
import { ArrowLeft } from 'assets/icons';
import { useNavigate } from 'react-router';

interface IHeaderPage {
  children: React.ReactNode;
  button?: string;
  onPressButton?: () => void;
  refresh?: () => void;
  router?: string;
}

const HeaderPage: React.FC<IHeaderPage> = ({
  children,
  refresh,
  button,
  onPressButton,
  router,
}) => {
  const navigate = useNavigate();

  return (
    <Container>
      <LabelHeader>
        <TitleHeader>
          {router && (
            <a href="/">
              <BackArrow
                src={ArrowLeft}
                alt={'Back to home'}
                onClick={() => navigate(router)}
              />
            </a>
          )}
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
