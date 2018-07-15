export interface XboContractData {
  address: string;
  abi: string;
}

export interface SetXboContractDataAction {
  type: 'SET_XBO_CONTRACT_DATA';
  payload: XboContractData;
}

export interface GetXboContractDataAction {
  type: 'GET_XBO_CONTRACT_DATA';
}

export type XboAction = SetXboContractDataAction | GetXboContractDataAction;
