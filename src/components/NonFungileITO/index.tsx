/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { PackItem, BuyButton, Pack, Cube } from './styles';
import { IAsset, IPack } from 'types';
import { core } from '@klever/sdk';
import { toast } from 'react-toastify';
import Loader from 'components/Loader';
import { getPrecision } from 'utils';
import cube from 'assets/img/cube.png';

interface INonFungible {
  selectedAsset: IAsset;
  pack: any;
  currencyId: string;
  setTxHash?: (e: string) => any;
  showcase?: boolean;
}

const NonFungibleITO: React.FC<INonFungible> = ({
  selectedAsset,
  pack,
  currencyId,
  setTxHash,
  showcase,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      buyType: 0,
      id: selectedAsset.assetId,
      currencyId,
      amount: pack.amount,
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
      if (setTxHash) setTxHash(response.data.txsHashes[0]);
      toast.success('Transaction broadcast successfully');
      setLoading(false);
    } catch (e: any) {
      console.log(`%c ${e}`, 'color: red');
      toast.error(e.message ? e.message : e);
      setLoading(false);
    }
  };

  return (
    <Pack>
      <Cube src={cube} />
      <PackItem>
        <p>
          {pack.amount} {selectedAsset.ticker}
        </p>
        <p>
          {pack.price} {currencyId}
        </p>
        {!showcase && (
          <>
            {loading ? (
              <Loader />
            ) : (
              <BuyButton onClick={() => handleSubmit()}>
                <span>Buy Pack</span>
              </BuyButton>
            )}
          </>
        )}
      </PackItem>
    </Pack>
  );
};

export default NonFungibleITO;
