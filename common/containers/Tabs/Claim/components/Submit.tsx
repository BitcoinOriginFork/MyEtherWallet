import * as React from 'react';
import { InitiateClaim } from './Initiate';
import { IFullWallet } from 'libs/wallet';
import { TShowNotification, showNotification } from 'actions/notifications';
import { getContractData } from 'actions/xbo';
import { TResetWallet, resetWallet } from 'actions/wallet';
import { AppState } from 'reducers';
import { isWalletFullyUnlocked } from 'selectors/wallet';
import { connect } from 'react-redux';
import { WalletDecrypt } from 'components';
import { DISABLE_WALLETS } from 'components/WalletDecrypt';

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
}

const initialState: State = {
  workflow: Workflow.initiate
};

export class SubmitFlow extends React.Component<Props, State> {
  public state: State = initialState;

  public componentDidMount() {
    this.props.getContractData();
  }

  public componentWillUnmount() {
    this.props.resetWallet();
  }

  public render() {
    const { wallet, unlocked } = this.props;
    const { workflow } = this.state;

    return (
      <div>
        {unlocked ? (
          <div className="Tab-content-pane">
            <h3>Create New Claim</h3>
            {workflow === Workflow.initiate && <InitiateClaim wallet={wallet} />}
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
