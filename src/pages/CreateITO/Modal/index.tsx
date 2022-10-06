/* eslint-disable @typescript-eslint/no-unused-vars */
import FungibleITO from 'components/FungibleITO';
import React, { useEffect, useState } from 'react';
import { IAsset } from 'types';
import {
  Container,
  Content,
  CloseContainer,
  CloseButton,
  CreateITOButton,
} from './styles';

interface IShowcaseITO {
  asset: IAsset;
  payload: any;
  closeModal: () => any;
}

const ShowcaseITO: React.FC<IShowcaseITO> = ({
  asset,
  payload,
  closeModal,
}) => {
  const [assetInfo, setAssetInfo] = useState<IAsset>();
  const isFungible = asset.assetType === 'Fungible';

  useEffect(() => {
    const packData: any = [];
    payload.packInfo.forEach((item: any) => {
      packData.push({ key: item.label, packs: item.packItems });
    });
    const newAssetInfo = { ...asset };
    newAssetInfo.ito = {
      isActive: payload.status,
      mintedAmount: 0,
      receiverAddress: payload.receiverAddress,
      maxAmount: payload.maxAmount,
      packData,
    };

    setAssetInfo({ ...newAssetInfo });
  }, []);

  return (
    <Container>
      <Content>
        <CloseContainer>
          <CloseButton onClick={() => closeModal()} color="white" size={30} />
        </CloseContainer>
        {isFungible && assetInfo ? <FungibleITO asset={assetInfo} /> : null}
        <CreateITOButton>
          <span>Confirm Create ITO</span>
        </CreateITOButton>
      </Content>
    </Container>
  );
};

export default ShowcaseITO;
