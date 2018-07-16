import * as React from 'react';
import { InitiateClaim } from './Initiate';
import { SignClaim } from './Signature';
import { IFullWallet } from 'libs/wallet';
import { TShowNotification, showNotification } from 'actions/notifications';
import { getContractData } from 'actions/xbo';
import { TResetWallet, resetWallet } from 'actions/wallet';
import { AppState } from 'reducers';
import { isWalletFullyUnlocked } from 'selectors/wallet';
import { connect } from 'react-redux';
import { WalletDecrypt } from 'components';
import { DISABLE_WALLETS } from 'components/WalletDecrypt';
import { ClaimCurrency } from 'enums';
import { queryCurrencyBalance } from 'api/xbo';

const currencyMapping = {
  [ClaimCurrency.bitcoin]: 'bitcoin',
  [ClaimCurrency.bitcoinCash]: 'bitcoinCash',
  [ClaimCurrency.dash]: 'dash',
  [ClaimCurrency.ethereum]: 'ethereum',
  [ClaimCurrency.litecoin]: 'litecoin'
};

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
  balance: any;
}

const initialState: State = {
  workflow: Workflow.initiate,
  balance: {}
};

export class SubmitFlow extends React.Component<Props, State> {
  public state: State = initialState;

  public componentDidMount() {
    this.props.getContractData();
  }

  public componentWillUnmount() {
    this.props.resetWallet();
  }

  public checkClaim = async ({ address, chain }) => {
    this.setState({ workflow: Workflow.loading });

    const apiChain = currencyMapping[chain];
    const balance = await queryCurrencyBalance(apiChain, address);

    this.setState({ workflow: Workflow.sign, balance });
  };

  public render() {
    const { wallet, unlocked } = this.props;
    const { workflow, balance } = this.state;

    return (
      <div>
        {unlocked ? (
          <div className="Tab-content-pane">
            <h3>Create New Claim</h3>
            {workflow === Workflow.loading && <h3>Loading...</h3>}
            {workflow === Workflow.initiate && (
              <InitiateClaim wallet={wallet} checkClaim={this.checkClaim} />
            )}
            {workflow === Workflow.sign && <SignClaim wallet={wallet} balance={balance} />}
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
