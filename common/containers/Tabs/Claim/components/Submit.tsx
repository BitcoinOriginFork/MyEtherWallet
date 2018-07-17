import * as React from 'react';
import { InitiateClaim } from './Initiate';
import { SignClaim } from './Signature';
import { ClaimConfirmation } from './Confirmation';
import { IFullWallet } from 'libs/wallet';
import { TShowNotification, showNotification } from 'actions/notifications';
import { getContractData } from 'actions/xbo';
import { TResetWallet, resetWallet } from 'actions/wallet';
import { AppState } from 'reducers';
import { isWalletFullyUnlocked } from 'selectors/wallet';
import { connect } from 'react-redux';
import { WalletDecrypt } from 'components';
import { DISABLE_WALLETS } from 'components/WalletDecrypt';
import { queryCurrencyBalance, submitClaim as submitClaimToApi } from 'api/xbo';

interface Props {
  wallet: IFullWallet;
  unlocked: boolean;
  showNotification: TShowNotification;
  resetWallet: TResetWallet;
  getContractData: any;
}

enum Workflow {
  loading,
  initiate,
  sign,
  confirm
}

interface State {
  workflow: Workflow;
  balance?: CurrencyBalance;
  chain: string;
  chainAddress: string;
  claim?: any;
}

const initialState: State = {
  workflow: Workflow.initiate,
  chain: '',
  chainAddress: ''
};

export interface CurrencyBalance {
  id: number;
  currency_id: number;
  address: string;
  balance: number;
  block: number;
  created: string;
  claimed: string;
}

export class SubmitFlow extends React.Component<Props, State> {
  public state: State = initialState;

  public componentDidMount() {
    this.props.getContractData();
  }

  public componentWillUnmount() {
    this.props.resetWallet();
  }

  public checkClaim = async ({ address, chain }) => {
    this.setState({ workflow: Workflow.loading, chainAddress: address, chain });
    const balance: CurrencyBalance = await queryCurrencyBalance(chain, address);

    this.setState({ workflow: Workflow.sign, balance });
  };

  public submitClaim = async ({ message, signature }) => {
    this.setState({ workflow: Workflow.loading });

    const claim: any = await submitClaimToApi({
      message,
      signature,
      chain: this.state.chain,
      address: this.state.chainAddress
    });
    console.log(claim);

    this.setState({ workflow: Workflow.confirm, claim });
  };

  public render() {
    const { wallet, unlocked } = this.props;
    const { workflow, balance, chain, claim } = this.state;
    const cb = balance as CurrencyBalance;

    return (
      <div>
        {unlocked ? (
          <div className="Tab-content-pane">
            <h3>Create New Claim</h3>
            {workflow === Workflow.loading && <h3>Loading...</h3>}
            {workflow === Workflow.initiate && (
              <InitiateClaim wallet={wallet} checkClaim={this.checkClaim} />
            )}
            {workflow === Workflow.sign && (
              <SignClaim
                wallet={wallet}
                balance={cb}
                chain={chain}
                submitClaim={this.submitClaim}
              />
            )}
            {workflow === Workflow.confirm && <ClaimConfirmation claim={claim} />}
          </div>
        ) : (
          <WalletDecrypt hidden={unlocked} disabledWallets={DISABLE_WALLETS.READ_ONLY} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  wallet: state.wallet.inst,
  unlocked: isWalletFullyUnlocked(state)
});

export const Submit = connect(mapStateToProps, {
  showNotification,
  resetWallet,
  getContractData
})(SubmitFlow);
