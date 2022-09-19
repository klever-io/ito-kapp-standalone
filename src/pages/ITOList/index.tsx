import React, { useEffect, useState, useCallback } from 'react';
import HeaderPage from 'components/HeaderPage';
import { IAsset, IResponse } from 'types';
import { Container } from 'pages/styles';
import api from 'services/api';
import Pagination from 'components/Pagination';
import Loader from 'components/Loader';
import {
  AssetContainer,
  AssetsList,
  IDAsset,
  Filters,
  CloseIcon,
  EmptyList,
  SupplyContent,
  DetailsButton,
  ButtonsContent,
  LoadingContainer,
  PaginationContainer,
  FilterContainer,
} from './styles';

export interface IAssetResponse extends IResponse {
  data: {
    assets: IAsset[];
  };
}

const ITOList: React.FC = () => {
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterByOwner, setFilterByOwner] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const getAssets = useCallback(
    async (justByOwner?: boolean) => {
      setAssets([]);
      setLoading(true);
      const response: IAssetResponse = await api.get({
        route: `assets/kassets`,
        query: {
          owner: justByOwner ? walletAddress : '',
          page,
        },
      });

      if (response.error) {
        return;
      }

      const auxAssets: IAsset[] = [];

      response.data.assets.forEach((asset: any) => {
        auxAssets.push(asset);
      });

      setAssets(auxAssets);
      setPage(
        response.pagination.next !== response.pagination.previous
          ? response.pagination.next - 1
          : response.pagination.next,
      );
      setTotalPages(response.pagination.totalPages);

      setLoading(false);
    },
    [page],
  );

  useEffect(() => {
    getAssets();
  }, [page]);

  useEffect(() => {
    try {
      (async () => {
        setWalletAddress(await window.kleverWeb.getWalletAddress());
      })();
    } catch (e) {
      console.error(e);
    }
  }, [walletAddress]);

  const assetsTable = () => {
    if (assets.length > 0) {
      return (
        <>
          {assets.map((item: IAsset) => {
            return (
              <AssetContainer>
                <IDAsset>
                  <span>{item.assetId}</span>
                  <span>{item.assetType}</span>
                </IDAsset>
                <SupplyContent>
                  <span>{item.circulatingSupply}</span>
                </SupplyContent>
                <ButtonsContent>
                  <DetailsButton>
                    <span>DETAILS</span>
                  </DetailsButton>
                </ButtonsContent>
              </AssetContainer>
            );
          })}
        </>
      );
    }

    return (
      <EmptyList>
        <span>None found</span>
      </EmptyList>
    );
  };

  return (
    <>
      <Container>
        <HeaderPage>ITOs</HeaderPage>
        <Filters>
          {walletAddress && (
            <FilterContainer
              clicked={filterByOwner}
              onClick={() => {
                getAssets(!filterByOwner);
                setFilterByOwner(!filterByOwner);
              }}
            >
              <span>Just my assets</span>
              {filterByOwner && <CloseIcon />}
            </FilterContainer>
          )}
        </Filters>
        {!loading ? (
          <>
            <AssetsList>
              <AssetContainer>
                <IDAsset>
                  <span>ID</span>
                </IDAsset>
                <SupplyContent>
                  <span>Circulating Supply</span>
                </SupplyContent>
              </AssetContainer>
              {assetsTable()}
            </AssetsList>
            {totalPages && page !== 0 && (
              <PaginationContainer>
                <Pagination
                  count={totalPages}
                  page={page}
                  onPaginate={(page: any) => {
                    if (setPage) {
                      setPage(page + 1);
                    }
                  }}
                />
              </PaginationContainer>
            )}
          </>
        ) : (
          <LoadingContainer>
            <Loader />
          </LoadingContainer>
        )}
      </Container>
    </>
  );
};

export default ITOList;
