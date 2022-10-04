import React, { useEffect, useState } from 'react';
import HeaderPage from 'components/HeaderPage';
import { Container } from 'pages/styles';
import { IAssetResponse } from 'pages/ITOList';
import Input from 'components/Input';
import { core } from '@klever/sdk';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import api from 'services/api';
import {
  FormContainer,
  Form,
  Forms,
  TitleForm,
  Button,
  ButtonsContainer,
} from './styles';
import { getPrecision } from 'utils';
import { IAsset } from 'types';

interface IPackItems {
  amount: number;
  price: number;
}

interface IPack {
  label: string;
  packItems: IPackItems[];
}

const CreateITO: React.FC = () => {
  const navigate = useNavigate();
  const [packs, setPacks] = useState<IPack[]>([]);
  const [assetID, setAssetID] = useState('');
  const [address, setAddress] = useState(
    window.localStorage.getItem('walletAddress') || '',
  );
  const [status, setStatus] = useState(false);
  const [maxAmount, setMaxAmount] = useState(0);
  const [assets, setAssets] = useState<IAsset[]>([]);

  useEffect(() => {
    window.kleverWeb.provider = {
      api:
        process.env.REACT_APP_DEFAULT_API_HOST ||
        'https://api.testnet.klever.finance/v1.0',
      node:
        process.env.REACT_APP_DEFAULT_NODE_HOST ||
        'https://node.testnet.klever.finance',
    };
  }, []);

  useEffect(() => {
    getUserAssets();
  }, []);

  const getUserAssets = async () => {
    const address = window.localStorage.getItem('walletAddress');

    if (address) {
      const response: IAssetResponse = await api.get({
        route: `assets/kassets`,
        query: {
          owner: address,
        },
      });

      const userAssets: any = [];

      if (response.data && !response.error) {
        response.data.assets.forEach((asset: IAsset) => {
          userAssets.push({ label: asset.assetId, value: asset });
        });
      }

      setAssets([...userAssets]);
    }
  };

  const addPack = () => {
    const packsList = [...packs];
    packsList.push({ label: '', packItems: [{ amount: 0, price: 0 }] });
    setPacks([...packsList]);
  };

  const removePack = () => {
    const packsList = [...packs];
    packsList.pop();
    setPacks([...packsList]);
  };

  const addPackItem = (packIndex: number) => {
    const packsList = [...packs];
    packsList[packIndex].packItems?.push({ amount: 0, price: 0 });
    setPacks([...packsList]);
  };

  const removePackItem = (packIndex: number) => {
    const packsList = [...packs];
    packsList[packIndex].packItems?.pop();
    setPacks([...packsList]);
  };

  const parsePackInfo = () => {
    const newPackInfo = {};
    packs.forEach(async (pack: IPack) => {
      newPackInfo[pack.label] = { packs: [] };
      const precision = await getPrecision(pack.label);
      pack.packItems.forEach(async (item: IPackItems) => {
        newPackInfo[pack.label].packs.push({
          amount: item.amount,
          price: precision ? item.price * precision : item.price,
        });
      });
    });
    return newPackInfo;
  };

  const handleSubmit = async () => {
    const parsedValues: any = {
      kda: assetID,
      receiverAddress: address,
      status: status ? 1 : 0,
      maxAmount,
      packInfo: parsePackInfo(),
    };

    const parsedPayload = {
      ...parsedValues,
    };

    try {
      const unsignedTx = await core.buildTransaction(
        [
          {
            type: 15, // Config ITO type
            payload: parsedPayload,
          },
        ],
        [''],
      );
      const signedTx = await window.kleverWeb.signTransaction(unsignedTx);
      await core.broadcastTransactions([signedTx]);
      toast.success('Transaction broadcast successfully');
      navigate('/');
    } catch (e: any) {
      console.log(`%c ${e}`, 'color: red');
      toast.error(e.message ? e.message : e);
    }
  };

  return (
    <>
      <Container>
        <HeaderPage router={'/'}>Create ITO</HeaderPage>
        <Forms>
          <FormContainer precedence={1}>
            <Form>
              <Input
                label="Asset ID"
                type="dropdown"
                dropdownOptions={assets}
                onChange={(e: any) => setAssetID(e.value.assetId)}
              />
              <Input
                label="Address"
                onChange={e => setAddress(e.target.value)}
                defaultValue={address}
              />
              <Input
                label="Status"
                option1="Inactive"
                option2="Active"
                type="checkbox"
                onChange={e => setStatus(e.target.checked)}
              />
              <Input
                label="Max Amount"
                type="number"
                onChange={e => setMaxAmount(Number(e.target.value))}
              />
            </Form>
          </FormContainer>
          <FormContainer precedence={1}>
            <TitleForm>Pack Info</TitleForm>
            {packs.map((item: IPack, index: number) => {
              return (
                <FormContainer precedence={2}>
                  <TitleForm>Pack</TitleForm>
                  <Form span={1}>
                    <Input
                      label="Pack Currency ID"
                      onChange={e => {
                        const packsList = [...packs];
                        packsList[index].label = String(e.target.value);
                        setPacks([...packsList]);
                      }}
                    />
                    {item.packItems?.map((item: any, indexItem: number) => {
                      return (
                        <FormContainer precedence={3}>
                          <TitleForm>Pack Info</TitleForm>
                          <Form span={2}>
                            <Input
                              label="Amount"
                              type="number"
                              onChange={e => {
                                const packsList = [...packs];
                                if (packsList[index]) {
                                  packsList[index].packItems[indexItem].amount =
                                    Number(e.target.value);
                                }
                                setPacks([...packsList]);
                              }}
                            />
                            <Input
                              label="Price"
                              type="number"
                              onChange={e => {
                                const packsList = [...packs];
                                if (packsList[index]) {
                                  packsList[index].packItems[indexItem].price =
                                    Number(e.target.value);
                                }
                                setPacks([...packsList]);
                              }}
                            />
                          </Form>
                        </FormContainer>
                      );
                    })}

                    <ButtonsContainer>
                      <Button onClick={() => addPackItem(index)}>
                        <span>ADD PACK INFO</span>
                      </Button>
                      {packs[index].packItems.length > 1 && (
                        <Button onClick={() => removePackItem(index)}>
                          <span>REMOVE PACK INFO</span>
                        </Button>
                      )}
                    </ButtonsContainer>
                  </Form>
                </FormContainer>
              );
            })}

            <ButtonsContainer>
              <Button onClick={() => addPack()}>
                <span>ADD PACK</span>
              </Button>
              {packs.length > 0 && (
                <Button onClick={() => removePack()}>
                  <span>REMOVE PACK</span>
                </Button>
              )}
            </ButtonsContainer>
          </FormContainer>
          <Button onClick={() => handleSubmit()}>
            <span>CREATE ITO</span>
          </Button>
        </Forms>
      </Container>
    </>
  );
};

export default CreateITO;
