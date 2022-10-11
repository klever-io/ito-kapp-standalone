/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import HeaderPage from 'components/HeaderPage';
import { IAsset, IResponse } from 'types';
import api from 'services/api';
import Loader from 'components/Loader';
import FungibleITO from 'components/FungibleITO';
import Select from 'react-select';
import {
  AssetContainer,
  AssetsList,
  IDAsset,
  KeyLabel,
  PackContainer,
  EmptyList,
  ChooseAsset,
  SideList,
  ScrollList,
  MainContainer,
  ItemsContainer,
  ITOContent,
  ITOContainer,
  LoadingContainer,
  MainContent,
  HashContent,
} from './styles';
import { useWidth } from 'contexts/width';
import { useNavigate } from 'react-router';
import { getPrecision, similarity, parseAddress } from 'utils';
import NonFungibleITO from 'components/NonFungileITO';
import Input from 'components/Input';
import Alert from 'components/Alert';
import Copy from 'components/Copy';

export interface IAssetResponse extends IResponse {
  data: {
    assets: IAsset[];
  };
}

const ITOList: React.FC = () => {
  const width = useWidth();
  const navigate = useNavigate();
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<IAsset | undefined>();
  const [assetsOptions, setAssetsOption] = useState<any[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<IAsset[]>([]);
  const [filterLabel, setFilterLabel] = useState('');
  const [txHash, setTxHash] = useState('');

  const getOtherAssets = async (
    auxAssets: IAsset[],
    totalPages: number,
    justByOwner?: boolean,
  ) => {
    const options: any[] = [];

    for (const x of Array(totalPages).keys()) {
      if (x !== 0) {
        const response: IAssetResponse = await api.get({
          route: `assets/kassets`,
          query: {
            owner: justByOwner ? walletAddress : '',
            page: x,
          },
        });

        if (response.error) {
          return;
        }

        response.data.assets.forEach(asset => {
          if (asset.ito) {
            asset.ito.packData.forEach(async (item: any, index1: number) => {
              const precision = await getPrecision(item.key);
              if (precision) {
                item.packs.forEach((pack: any, index2: number) => {
                  if (asset.ito) {
                    asset.ito.packData[index1].packs[index2].price =
                      pack.price / precision;
                  }
                });
              }
            });
            auxAssets.push(asset);
            options.push({ value: asset, label: asset.assetId });
          }
        });
      }
    }
    setLoading(false);
    setAssets(auxAssets);
    setFilteredAssets(auxAssets);
    setAssetsOption([...options]);
  };

  const getAssets = async (justByOwner?: boolean) => {
    setLoading(true);
    setSelectedAsset(undefined);
    const response: IAssetResponse = await api.get({
      route: `assets/kassets`,
      query: {
        owner: justByOwner ? walletAddress : '',
      },
    });

    if (response.error) {
      return;
    }

    const auxAssets: IAsset[] = [];
    const options: any[] = [];

    response.data.assets.forEach(asset => {
      if (asset.ito) {
        asset.ito.packData.forEach(async (item: any, index1: number) => {
          const precision = await getPrecision(item.key);
          if (precision) {
            item.packs.forEach((pack: any, index2: number) => {
              if (asset.ito) {
                asset.ito.packData[index1].packs[index2].price =
                  pack.price / precision;
              }
            });
          }
        });
        auxAssets.push(asset);
        options.push({ value: asset, label: asset.assetId });
      }
    });

    setAssetsOption([...options]);
    getOtherAssets(auxAssets, response.pagination.totalPages, justByOwner);
  };

  useEffect(() => {
    getAssets();
  }, []);

  const getAddress = async () => {
    try {
      const address = await window.kleverWeb.getWalletAddress();

      if (address.length > 0) {
        setWalletAddress(await window.kleverWeb.getWalletAddress());
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAddress();
  }, [walletAddress]);

  useEffect(() => {
    if (filterLabel) {
      const newFiltered: any[] = [...filteredAssets];

      newFiltered.forEach((item: IAsset) => {
        item.similarity = similarity(item.assetId, filterLabel);
      });

      newFiltered.sort((a: any, b: any) => {
        if (!isNaN(Number(a.similarity)) && !isNaN(Number(b.similarity))) {
          if (a.similarity > b.similarity) {
            return -1;
          } else {
            return 1;
          }
        }
        return 0;
      });
      setFilteredAssets(newFiltered);
    } else {
      setFilteredAssets([...assets]);
    }
  }, [filterLabel]);

  const assetsTable = () => {
    if (assets.length > 0) {
      return (
        <AssetsList>
          <Input
            placeholder="Search Asset"
            onChange={e => setFilterLabel(e.target.value)}
          />
          <ScrollList>
            {filteredAssets.map((item: IAsset) => {
              return (
                <AssetContainer onClick={() => setSelectedAsset(item)}>
                  <IDAsset>
                    <span>{item.assetId}</span>
                    <span>{item.assetType}</span>
                  </IDAsset>
                </AssetContainer>
              );
            })}
          </ScrollList>
        </AssetsList>
      );
    }

    return (
      <EmptyList>
        <span>None found</span>
      </EmptyList>
    );
  };

  const displaySelect = () => {
    if (width.width <= 768) {
      if (!loading)
        return (
          <Select
            options={assetsOptions}
            onChange={e => setSelectedAsset(e.value)}
          />
        );
      else
        return (
          <LoadingContainer>
            <Loader />
          </LoadingContainer>
        );
    }

    return <></>;
  };

  const displayITO = () => {
    if (selectedAsset?.assetType === 'Fungible') {
      return <FungibleITO asset={selectedAsset} setTxHash={setTxHash} />;
    }

    return (
      <>
        {selectedAsset?.ito?.packData.map((item: any) => {
          return (
            <PackContainer>
              <KeyLabel>{item.key}</KeyLabel>
              <ItemsContainer>
                {item.packs.map((pack: any) => {
                  return (
                    <NonFungibleITO
                      pack={pack}
                      currencyId={item.key}
                      selectedAsset={selectedAsset}
                      setTxHash={setTxHash}
                    />
                  );
                })}
              </ItemsContainer>
            </PackContainer>
          );
        })}
      </>
    );
  };

  return (
    <MainContainer>
      <ITOContainer>
        <HeaderPage
          refresh={getAssets}
          button={'Create ITO'}
          onPressButton={() => navigate('/create-ito')}
        >
          ITOs
        </HeaderPage>
        <MainContent>
          {width.width > 768 && (
            <SideList>
              {!loading ? (
                <AssetsList>{assetsTable()}</AssetsList>
              ) : (
                <LoadingContainer>
                  <Loader />
                </LoadingContainer>
              )}
            </SideList>
          )}
          {displaySelect()}
          <ITOContent>
            <div>
              {txHash && (
                <Alert closeAlert={() => setTxHash('')}>
                  <HashContent>
                    Transaction hash: {parseAddress(txHash, 17)}
                    <Copy data={txHash} info={'Transaction hash'} />
                  </HashContent>
                </Alert>
              )}

              {selectedAsset ? (
                displayITO()
              ) : (
                <>
                  {!loading && (
                    <ChooseAsset>
                      <span>Choose an asset</span>
                    </ChooseAsset>
                  )}
                </>
              )}
            </div>
          </ITOContent>
        </MainContent>
      </ITOContainer>
    </MainContainer>
  );
};

export default ITOList;
