import { useState } from 'react';
import {
  Container,
  FungibleContainer,
  AssetName,
  Content,
  Button,
  TotalPrice,
  PriceRange,
  PriceRangeTitle,
  Row,
} from './styles';
import { IAsset, IPack } from 'types';
import Input from 'components/Input';
import { isFloat } from 'utils';

interface IFungibleITO {
  asset: IAsset;
}

const FungibleITO: React.FC<IFungibleITO> = ({ asset }) => {
  const [amount, setAmount] = useState(0);

  const calculateCost = (indexPackData: number) => {
    let priceIndex;
    const range: number[] = [];

    asset.ito?.packData[indexPackData].packs.forEach((pack: IPack) => {
      range.push(pack.amount);
    });

    for (const rangeIndex in range) {
      if (amount < range[rangeIndex]) {
        priceIndex = rangeIndex;
        break;
      }
    }

    let cost = 0;

    if (!priceIndex) {
      if (asset.ito?.packData[indexPackData].packs) {
        priceIndex = asset.ito?.packData[indexPackData].packs.length - 1;
        cost =
          amount * asset.ito?.packData[indexPackData].packs[priceIndex].price;
      }
    } else {
      cost =
        amount * asset.ito?.packData[indexPackData].packs[priceIndex].price;
    }

    return isFloat(cost) && String(cost).length > 10
      ? cost.toPrecision(5)
      : cost;
  };

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
      {asset.ito?.packData.map((pack: any, indexPackData: number) => {
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
                  {calculateCost(indexPackData)} {pack.key}
                </span>
              </TotalPrice>
              <Button onClick={() => handleSubmit(pack.key)}>
                <span>Buy Token</span>
              </Button>
            </Content>
            <Content>
              <PriceRange>
                <PriceRangeTitle>Price Range</PriceRangeTitle>
                {pack.packs.map((packInfo: any, index: number) => {
                  const initialValue =
                    index === 0 ? 0 : pack.packs[index - 1].amount;
                  const isLastElement = pack.packs.length === index + 1;
                  return (
                    <Row>
                      {isLastElement && index > 0 ? (
                        <span>{packInfo.amount}+</span>
                      ) : (
                        <span>
                          {initialValue} - {packInfo.amount - 1}
                        </span>
                      )}
                      <span>
                        {packInfo.price} {pack.key} / {asset.ticker}
                      </span>
                    </Row>
                  );
                })}
              </PriceRange>
            </Content>
          </FungibleContainer>
        );
      })}
    </Container>
  );
};

export default FungibleITO;
