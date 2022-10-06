/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { IAsset } from 'types';
import { Container, Content } from './styles';

interface IShowcaseITO {
  asset: IAsset;
}

const ShowcaseITO: React.FC<IShowcaseITO> = ({ asset }) => {
  const { assetId } = asset;
  const isFungible = asset.assetType === 'Fungible';
  return (
    <Container>
      <Content />
    </Container>
  );
};

export default ShowcaseITO;
