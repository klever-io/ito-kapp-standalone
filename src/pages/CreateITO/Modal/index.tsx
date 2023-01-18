/* eslint-disable @typescript-eslint/no-unused-vars */
import FungibleITO from 'components/FungibleITO';
import React, { useEffect, useState } from 'react';
import { IAsset, IITO } from 'types';
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
  ito: IITO;
  payload: any;
  closeModal: () => any;
  confirmCreate: () => any;
}

const ShowcaseITO: React.FC<IShowcaseITO> = ({
  ito,
  payload,
  closeModal,
  confirmCreate,
}) => {
  const [ITOInfo, setITOInfo] = useState<IITO>();
  const isFungible = ito.assetType === 'Fungible';

  useEffect(() => {
    const packData: any = [];
    payload.packInfo.forEach((item: any) => {
      packData.push({ key: item.label, packs: item.packItems });
    });
    let newITOInfo = { ...ito };
    newITOInfo = {
      assetId: payload.assetId,
      assetType: payload.assetType,
      isActive: payload.isActive,
      mintedAmount: 0,
      receiverAddress: payload.receiverAddress,
      maxAmount: payload.maxAmount,
      packData,
      defaultLimitPerAddress: payload.defaultLimitPerAddress,
      isWhitelistActive: payload.isWhitelistActive,
      whitelistInfo: payload.whitelistInfo,
      whitelistStartTime: payload.whitelistStartTime,
      whitelistEndTime: payload.whitelistEndTime,
      startTime: payload.startTime,
      endTime: payload.endTime,
    };

    setITOInfo({ ...newITOInfo });
  }, []);

  return (
    <Container>
      <Content>
        <CloseContainer>
          {!isFungible && ITOInfo && <AssetTitle>{ITOInfo.assetId}</AssetTitle>}
          {isFungible && <div />}
          <CloseButton onClick={() => closeModal()} color="white" size={30} />
        </CloseContainer>
        {isFungible && ITOInfo ? <FungibleITO showcase ito={ITOInfo} /> : null}
        <FungibleContainer>
          {!isFungible &&
            ITOInfo?.packData.map((item: any) => {
              return (
                <PackContainer>
                  <KeyLabel>{item.key}</KeyLabel>
                  <ItemsContainer>
                    {item.packs.map((pack: any) => {
                      return (
                        <NonFungibleITO
                          pack={pack}
                          currencyId={item.key}
                          selectedITO={ITOInfo}
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
