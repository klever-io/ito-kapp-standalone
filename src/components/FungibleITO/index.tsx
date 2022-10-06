/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { getPrecision, isFloat } from 'utils';
import { core } from '@klever/sdk';
import { toast } from 'react-toastify';
import Loader from 'components/Loader';
import Input from 'components/Input';

interface IFungibleITO {
  asset: IAsset;
  setTxHash: (e: string) => any;
}

const FungibleITO: React.FC<IFungibleITO> = ({ asset, setTxHash }) => {
  const [amount, setAmount] = useState(0);

  const calculateCost = (indexPackData: number, qtyPacks: number) => {
    if (asset.ito) {
      const packs = asset.ito.packData[indexPackData].packs;
      if (qtyPacks === 1) {
        return amount * packs[0].price;
      } else if (qtyPacks === 2) {
        if (amount >= 0 && amount <= packs[0].amount) {
          return amount * packs[0].price;
        } else if (amount >= packs[1].price) {
          return amount * packs[1].price;
        }
      }

      let priceIndex;
      const range: number[] = [];

      packs.forEach((pack: IPack) => {
        range.push(pack.amount);
      });

      for (const rangeIndex in range) {
        if (amount <= range[rangeIndex]) {
          priceIndex = rangeIndex;
          break;
        }
      }

      let cost = 0;

      if (!priceIndex) {
        priceIndex = packs.length - 1;
        cost = amount * packs[priceIndex].price;
      } else {
        cost = amount * packs[priceIndex].price;
      }

      return isFloat(cost) && String(cost).length > 10
        ? cost.toPrecision(5)
        : cost;
    }
  };

  const handleSubmit = async (currencyId: string) => {
    const precision = await getPrecision(currencyId);

    const payload = {
      buyType: 0,
      id: asset.assetId,
      currencyId,
      amount: precision ? amount * precision : amount,
    };

    const parsedPayload = {
      ...payload,
    };

    try {
      const unsignedTx = await core.buildTransaction(
        [
          {
            type: 17, // Buy Order type
            payload: parsedPayload,
          },
        ],
        [''],
      );
      const signedTx = await window.kleverWeb.signTransaction(unsignedTx);
      const response = await core.broadcastTransactions([signedTx]);
      setTxHash(response.data.txsHashes[0]);
      toast.success('Transaction broadcast successfully');
    } catch (e: any) {
      console.log(`%c ${e}`, 'color: red');
      toast.error(e.message ? e.message : e);
    }
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
                  {calculateCost(indexPackData, pack.packs.length)} {pack.key}
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
                  const isLastElement = pack.packs.length === index + 1;

                  if (pack.packs.length === 1) {
                    return (
                      <Row>
                        <span>0 +</span>
                        <span>
                          {packInfo.price} {pack.key} / {asset.ticker}
                        </span>
                      </Row>
                    );
                  } else if (pack.packs.length === 2) {
                    return (
                      <Row>
                        <span>
                          {index === 0
                            ? `0 - ${packInfo.amount}`
                            : `${pack.packs[0].amount} <`}
                        </span>
                        <span>
                          {packInfo.price} {pack.key} / {asset.ticker}
                        </span>
                      </Row>
                    );
                  }

                  return (
                    <Row>
                      {index === 0 && <span>0 - {packInfo.amount}</span>}
                      {!isLastElement && index > 0 && (
                        <span>
                          {pack.packs[index - 1].amount + 1} -{' '}
                          {pack.packs[index].amount}
                        </span>
                      )}
                      {isLastElement && (
                        <span>
                          {pack.packs[index - 1].amount} {'<'}
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
