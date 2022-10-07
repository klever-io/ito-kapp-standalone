import React, { useEffect, useState, useRef } from 'react';
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
  PackItem,
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
} from './styles';
import { useWidth } from 'contexts/width';
import { useNavigate } from 'react-router';
import { getPrecision } from 'utils';
import { useIsElementVisible } from 'utils/hooks';
import Input from 'components/Input';
import debounce from 'lodash.debounce';

export interface IAssetResponse extends IResponse {
  data: {
    assets: IAsset[];
  };
}

const ITOList: React.FC = () => {
  const width = useWidth();
  const navigate = useNavigate();
  const loadMoreRef = useRef(null);
  const isLastVisible = useIsElementVisible(loadMoreRef.current);
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState<IAsset | undefined>();
  const [assetsOptions, setAssetsOption] = useState<any[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<IAsset[]>([]);
  const [filterLabel, setFilterLabel] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getAssets = async (currentPage = 1, partialAsset?: string) => {
    const response: IAssetResponse = await api.get({
      route: `assets/kassets`,
      query: {
        page: currentPage,
        ito: 'true',
        asset: partialAsset ? partialAsset : '',
      },
    });

    if (response.error) {
      return;
    }

    setTotalPages(response.pagination.totalPages);

    let auxAssets: IAsset[] = [];

    if (!partialAsset && currentPage !== 0) {
      auxAssets = [...assets];
    }

    if (currentPage === 0) {
      setFilterLabel('');
    }

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

    if (!partialAsset) {
      setAssetsOption([...options]);
      setAssets([...auxAssets]);
    }

    setFilteredAssets([...auxAssets]);
  };

  useEffect(() => {
    if (currentPage) {
      setLoading(true);
      setSelectedAsset(undefined);
      getAssets(currentPage);
      setLoading(false);
    } else {
      getAssets(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    if (currentPage + 1 <= totalPages) {
      setCurrentPage(old => old + 1);
    }
  }, [isLastVisible]);

  useEffect(() => {
    if (filterLabel !== '') {
      const debouncedSave = debounce(() => getAssets(1, filterLabel), 900);
      debouncedSave();
    }
  }, [filterLabel]);

  const assetsTable = () => {
    if (assets.length > 0) {
      return (
        <AssetsList>
          <Input
            placeholder="Search Asset"
            onChange={e =>
              e.target.value === ''
                ? getAssets(0)
                : setFilterLabel(e.target.value)
            }
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
            {currentPage < totalPages && <div ref={loadMoreRef} />}
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
      return <FungibleITO asset={selectedAsset} />;
    }

    return (
      <>
        {selectedAsset?.ito?.packData.map((item: any) => {
          return (
            <PackContainer>
              <span>{item.key}</span>
              <ItemsContainer>
                {item.packs.map((pack: any) => {
                  return (
                    <PackItem>
                      <p>
                        {pack.amount} {selectedAsset.ticker}
                      </p>
                      <p>
                        {pack.price} {item.key}
                      </p>
                    </PackItem>
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
