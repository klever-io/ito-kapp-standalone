import React, { useEffect, useState, useCallback } from 'react';
import HeaderPage from 'components/HeaderPage';
import { IITO, IResponse } from 'types';
import api from 'services/api';
import Loader from 'components/Loader';
import FungibleITO from 'components/FungibleITO';
import {
  AssetContainer,
  AssetsList,
  IDAsset,
  KeyLabel,
  PackContainer,
  EmptyList,
  ChooseAsset,
  SideList,
  Scroll,
  Scrollable,
  MainContainer,
  ItemsContainer,
  ITOContent,
  ITOContainer,
  LoadingContainer,
  MainContent,
  HashContent,
  LineInputSection,
} from './styles';
import { useWidth } from 'contexts/width';
import { useNavigate } from 'react-router';
import { getPrecision, parseAddress } from 'utils';
import Input from 'components/Input';
import debounce from 'lodash.debounce';
import NonFungibleITO from 'components/NonFungileITO';
import Alert from 'components/Alert';
import Copy from 'components/Copy';
import InfiniteScroll from 'react-infinite-scroll-component';

export interface IITOResponse extends IResponse {
  data: {
    itos: IITO[];
  };
}

const ITOList: React.FC = () => {
  const width = useWidth();
  const navigate = useNavigate();
  const [assets, setAssets] = useState<IITO[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedITO, setSelectedITO] = useState<IITO | undefined>();

  const [filteredAssets, setFilteredAssets] = useState<IITO[]>([]);
  const [filterLabel, setFilterLabel] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [txHash, setTxHash] = useState('');

  const debouncedLabel = useCallback(
    debounce(filterLabel => getAssets(1, filterLabel), 400),
    [],
  );

  const getAssets = async (currentPage = 1, partialAsset?: string) => {
    const response: IITOResponse = await api.get({
      route: `ito/list`,
      query: {
        page: currentPage,
        asset: partialAsset ? partialAsset : '',
      },
    });
    if (response.error) {
      return;
    }
    setTotalPages(response.pagination.totalPages);

    let auxAssets: IITO[] = [];

    if (!partialAsset && currentPage !== 0) {
      auxAssets = [...assets];
    }

    const options: any[] = [];

    response.data.itos.forEach(ito => {
      ito.packData.forEach(async (item: any, index1: number) => {
        const precision = await getPrecision(item.key);
        if (precision) {
          item.packs.forEach((pack: any, index2: number) => {
            if (ito) {
              ito.packData[index1].packs[index2].price = pack.price / precision;
            }
          });
        }
      });
      auxAssets.push(ito);
      options.push({ value: ito, label: ito.assetId });
    });

    if (!partialAsset) {
      setAssets([...auxAssets]);
    }

    setFilteredAssets([...auxAssets]);
  };

  useEffect(() => {
    if (currentPage) {
      setLoading(true);
      setSelectedITO(undefined);
      getAssets(currentPage);
      setLoading(false);
    } else {
      getAssets(currentPage);
    }
  }, [currentPage]);

  const nextAssetsPage = () => {
    if (currentPage + 1 <= totalPages) {
      setCurrentPage(old => old + 1);
    }
  };

  useEffect(() => {
    debouncedLabel(filterLabel);
  }, [filterLabel]);

  const assetsTable = () => {
    if (assets.length > 0) {
      return (
        <>
          <AssetsList>
            <Input
              placeholder="Search Asset"
              onChange={e => {
                setFilterLabel(e.target.value);
              }}
            />
            <Scrollable id="scrollableDiv">
              <InfiniteScroll
                style={{
                  gap: '0.7rem',
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: 15,
                }}
                dataLength={assets.length}
                next={nextAssetsPage}
                hasMore={true}
                loader={<></>}
                scrollableTarget={'scrollableDiv'}
              >
                <Scroll>
                  {filteredAssets.map((item: IITO) => {
                    return (
                      <AssetContainer onClick={() => setSelectedITO(item)}>
                        <IDAsset>
                          <span>{item.assetId}</span>
                        </IDAsset>
                      </AssetContainer>
                    );
                  })}
                </Scroll>
              </InfiniteScroll>
            </Scrollable>
          </AssetsList>
          {width.width < 768 && <LineInputSection />}
        </>
      );
    }

    return (
      <EmptyList>
        <span>None found</span>
      </EmptyList>
    );
  };

  const displayITO = () => {
    if (selectedITO?.assetType === 'Fungible') {
      return <FungibleITO ito={selectedITO} setTxHash={setTxHash} />;
    }

    return (
      <>
        {selectedITO?.packData.map((item: any) => {
          return (
            <PackContainer>
              <KeyLabel>{item.key}</KeyLabel>
              <ItemsContainer>
                {item.packs.map((pack: any) => {
                  return (
                    <NonFungibleITO
                      pack={pack}
                      currencyId={item.key}
                      selectedITO={selectedITO}
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
          <SideList>
            {!loading ? (
              <AssetsList>{assetsTable()}</AssetsList>
            ) : (
              <LoadingContainer>
                <Loader />
              </LoadingContainer>
            )}
          </SideList>
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

              {selectedITO ? (
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
