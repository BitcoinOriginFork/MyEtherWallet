import * as React from 'react';
import { AppState } from 'reducers';
import { isWalletFullyUnlocked } from 'selectors/wallet';
import { connect } from 'react-redux';
import { getContractData } from 'actions/xbo';
import { IFullWallet } from 'libs/wallet';
import { WalletDecrypt } from 'components';
import { DISABLE_WALLETS } from 'components/WalletDecrypt';
import Contract from 'libs/contracts';
import { setToField, setDataField, reset } from 'actions/transaction';
import { Spinner } from 'components/ui';
import { getNodeLib } from 'selectors/config';
import { showNotification } from 'actions/notifications';
import { getXboInstance, getBalance } from 'libs/xbo';

export interface StakeState {
  loading: boolean;
  currentStake: number;
  balance: number;
  instance?: Contract;
  init: boolean;
}

interface StakeProps {
  networkConfig: any;
  wallet: IFullWallet;
  unlocked: boolean;
  xbo: { contract: { address: string; abi: string } };
  reset: any;
  nodeLib: any;
  showNotification: any;
}

class Staker extends React.Component<StakeProps, StakeState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentStake: 0,
      balance: 0,
      init: true
    };
  }

  public checkStaked = async (address: string): Promise<number> => {
    const contractInstance = getXboInstance(this.props.networkConfig.network.contracts);
    const data = contractInstance.contract.stakeOf.encodeInput({
      _owner: address
    });
    const callData = { to: contractInstance.xbo.address, data };
    const results = await this.props.nodeLib.sendCallRequest(callData);

    this.props.reset();

    return contractInstance.contract.stakeOf.decodeOutput(results)[0] / 10 ** 18 || 0;
  };

  public handleStartStakeInput = () => {
    // form handler
  };

  public handleStartSubmit = () => {
    // form handler
  };

  public async componentDidUpdate(prevProps) {
    if (this.props !== prevProps && this.state.init && this.props.wallet) {
      this.setState({ loading: true });

      const address = await this.props.wallet.getAddressString();
      const staked = await this.checkStaked(address).catch(e => {
        this.setState({ loading: false });
        this.props.showNotification('danger', e.message);
      });

      const balance = await getBalance(
        this.props.networkConfig.network.contracts,
        address,
        this.props.nodeLib
      );

      this.props.reset();

      this.setState({ currentStake: staked || 0, balance, loading: false, init: false });
    }
  }

  public componentWillUnmount() {
    this.props.reset();
  }

  public render() {
    const { balance, currentStake } = this.state;

    return (
      <div>
        {this.props.unlocked ? (
          <div className="Tab-content-pane">
            <h3>Stake</h3>
            {!this.state.loading && (
              <div>
                <p>Current Stake: {currentStake.toFixed(18)}</p>
                <p>XBO Balance: {balance.toFixed(18)}</p>
                <p>Stakeable: {balance.toFixed(18)}</p>
              </div>
            )}
            {this.state.loading && <Spinner />}
          </div>
        ) : (
          <WalletDecrypt hidden={this.props.unlocked} disabledWallets={DISABLE_WALLETS.READ_ONLY} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  networkConfig: state.config,
  wallet: state.wallet.inst,
  unlocked: isWalletFullyUnlocked(state),
  xbo: state.xbo,
  nodeLib: getNodeLib(state)
});

export const StakeConnector = connect(mapStateToProps, {
  getContractData,
  setToField,
  setDataField,
  reset,
  showNotification
})(Staker);
