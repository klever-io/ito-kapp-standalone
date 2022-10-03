/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import {
  Container,
  FungibleContainer,
  AssetName,
  Content,
  Button,
  TotalPrice,
} from './styles';
import { IAsset } from 'types';
import Input from 'components/Input';

interface IFungibleITO {
  asset: IAsset;
}

const FungibleITO: React.FC<IFungibleITO> = ({ asset }) => {
  const price = 1000;
  const [amount, setAmount] = useState(0);

  const handleSubmit = (currencyId: string) => {
    const payload = {
      buyType: 0,
      id: asset.assetId,
      currencyId,
      amount: amount,
    };

    console.log(payload);
  };

  return (
    <Container>
      {asset.ito?.packData.map((pack: any) => {
        return (
          <FungibleContainer>
            <Content>
              <AssetName>{asset.assetId}</AssetName>
              <Input
                label="Amount"
                type="number"
                onChange={e => setAmount(Number(e.target.value))}
              />
              <TotalPrice>
                <span>You will pay</span>{' '}
                <span>
                  {amount * price} {pack.key}
                </span>
              </TotalPrice>
              <Button onClick={() => handleSubmit(pack.key)}>
                <span>Buy Token</span>
              </Button>
            </Content>
            <Content>
              <span>RANGE TABLE</span>
            </Content>
          </FungibleContainer>
        );
      })}
    </Container>
  );
};

export default FungibleITO;
