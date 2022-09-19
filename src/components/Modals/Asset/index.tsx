import { Container, Content, DetailsRow, Button, JSONContent } from './styles';
import { IAsset } from 'types';
import JsonFormatter from 'react-json-formatter';

interface IAssetModalProps {
  item: IAsset;
  closeModal: () => void;
}

const AssetModal: React.FC<IAssetModalProps> = ({
  item: asset,
  closeModal,
}) => {
  const handleClose = () => {
    closeModal();
  };

  const jsonStyle = {
    propertyStyle: { color: 'red' },
    stringStyle: { color: 'yellow' },
    numberStyle: { color: 'darkorange' },
  };

  return (
    <Container onMouseDown={handleClose}>
      <Content onMouseDown={e => e.stopPropagation()}>
        <h1>{asset?.assetId}</h1>
        <DetailsRow>
          <JSONContent>
            <JsonFormatter
              json={JSON.stringify(asset)}
              tabWith={4}
              jsonStyle={jsonStyle}
            />
          </JSONContent>
        </DetailsRow>
        <Button onClick={handleClose}> Close</Button>
      </Content>
    </Container>
  );
};
export default AssetModal;
