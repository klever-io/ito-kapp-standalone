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
  AssetTitle,
  FungibleContainer,
} from './styles';
import { PackContainer, KeyLabel, ItemsContainer } from 'pages/ITOList/styles';
import NonFungibleITO from 'components/NonFungileITO';

interface IShowcaseITO {
  asset: IAsset;
  payload: any;
  closeModal: () => any;
  confirmCreate: () => any;
}

const ShowcaseITO: React.FC<IShowcaseITO> = ({
  asset,
  payload,
  closeModal,
  confirmCreate,
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
          {!isFungible && assetInfo && (
            <AssetTitle>{assetInfo.assetId}</AssetTitle>
          )}
          {isFungible && <div />}
          <CloseButton onClick={() => closeModal()} color="white" size={30} />
        </CloseContainer>
        {isFungible && assetInfo ? (
          <FungibleITO showcase asset={assetInfo} />
        ) : null}
        <FungibleContainer>
          {!isFungible &&
            assetInfo?.ito?.packData.map((item: any) => {
              return (
                <PackContainer>
                  <KeyLabel>{item.key}</KeyLabel>
                  <ItemsContainer>
                    {item.packs.map((pack: any) => {
                      return (
                        <NonFungibleITO
                          pack={pack}
                          currencyId={item.key}
                          selectedAsset={assetInfo}
                          showcase
                        />
                      );
                    })}
                  </ItemsContainer>
                </PackContainer>
              );
            })}
        </FungibleContainer>
        <CreateITOButton onClick={() => confirmCreate()}>
          <span>Confirm Create ITO</span>
        </CreateITOButton>
      </Content>
    </Container>
  );
};

export default ShowcaseITO;
