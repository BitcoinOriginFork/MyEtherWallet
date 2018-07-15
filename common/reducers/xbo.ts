import { XboAction, TypeKeys } from 'actions/xbo';

export interface State {
  contract: { address: string; abi: string };
}

export const INITIAL_STATE: State = {
  contract: { address: '', abi: '' }
};

export function xbo(state: State = INITIAL_STATE, action: XboAction): State {
  switch (action.type) {
    case TypeKeys.SET_XBO_CONTRACT_DATA:
      return {
        ...state,
        contract: action.payload
      };

    default:
      return state;
  }
}
