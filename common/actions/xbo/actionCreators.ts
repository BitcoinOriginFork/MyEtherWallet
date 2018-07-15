import * as interfaces from './actionTypes';
import { TypeKeys } from './constants';

export function setContractData(
  contract: interfaces.XboContractData
): interfaces.SetXboContractDataAction {
  return {
    type: TypeKeys.SET_XBO_CONTRACT_DATA,
    payload: contract
  };
}

export function getContractData(): interfaces.GetXboContractDataAction {
  return {
    type: TypeKeys.GET_XBO_CONTRACT_DATA
  };
}
