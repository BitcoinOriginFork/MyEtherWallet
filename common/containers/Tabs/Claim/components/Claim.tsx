import * as React from 'react';
import { AppState } from 'reducers';
import { isWalletFullyUnlocked } from 'selectors/wallet';
import { connect } from 'react-redux';
import { getContractData } from 'actions/xbo';
import { IFullWallet } from 'libs/wallet';
import {
  WalletDecrypt,
  TXMetaDataPanel,
  GenerateTransaction,
  SigningStatus,
  SendButton
} from 'components';
import { DISABLE_WALLETS } from 'components/WalletDecrypt';
import Contract from 'libs/contracts';
import { Address, Data } from 'libs/units';
import { setToField, setDataField, reset } from 'actions/transaction';
import { Spinner } from 'components/ui';
import { getNodeLib } from 'selectors/config';
import { showNotification } from 'actions/notifications';
import { getXboInstance } from 'libs/xbo';

export interface DailyClaimState {
  loading: boolean;
  claimSucceeded: boolean;
  claimableBalance: number;
  instance?: Contract;
  init: boolean;
}

interface DailyClaimProps {
  networkConfig: any;
  setToField: any;
  setDataField: any;
  wallet: IFullWallet;
  unlocked: boolean;
  getContractData: any;
  xbo: { contract: { address: string; abi: string } };
  reset: any;
  nodeLib: any;
  showNotification: any;
}

class Claim extends React.Component<DailyClaimProps, DailyClaimState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      claimSucceeded: false,
      claimableBalance: 0,
      init: true
    };
  }

  public checkClaimableBalance = async (): Promise<number> => {
    const contractInstance = getXboInstance(this.props.networkConfig.network.contracts);
    const address = await this.props.wallet.getAddressString();
    const data = contractInstance.contract.getClaimableBalance.encodeInput({
      _claimAddress: address
    });
    const callData = { to: contractInstance.xbo.address, data };
    const results = await this.props.nodeLib.sendCallRequest(callData);

    this.props.reset();

    return (
      contractInstance.contract.getClaimableBalance.decodeOutput(results)._claimableBalance /
      10 ** 18
    );
  };

  public claim = async () => {
    const contractInstance = getXboInstance(this.props.networkConfig.network.contracts);
    this.props.setToField({
      raw: contractInstance.xbo.address,
      value: Address(contractInstance.xbo.address)
    });

    const data = contractInstance.contract.claim.encodeInput({});
    this.props.setDataField({ raw: data, value: Data(data) });
    this.setState({ instance: contractInstance.contract });
  };

  public async componentDidUpdate(prevProps) {
    if (this.props !== prevProps && this.state.init && this.props.wallet) {
      this.setState({ loading: true });
      const claimableBalance = await this.checkClaimableBalance().catch(e => {
        this.setState({ loading: false });
        this.props.showNotification('danger', e.message);
      });

      this.props.reset();

      this.setState({ claimableBalance: claimableBalance || 0, loading: false, init: false });
      this.claim();
    }
  }

  public componentWillUnmount() {
    this.props.reset();
  }

  public render() {
    return (
      <div>
        {this.props.unlocked ? (
          <div className="Tab-content-pane">
            <h1>Daily Claim</h1>
            {!this.state.loading &&
              this.state.claimableBalance !== 0 && (
                <div>
                  <p>Total Claimable Balance: {this.state.claimableBalance}</p>
                  <TXMetaDataPanel
                    className="form-group"
                    initialState="advanced"
                    disableToggle={true}
                    advancedGasOptions={{ dataField: false }}
                  />
                  <GenerateTransaction />
                  <SigningStatus />
                  <SendButton />
                </div>
              )}
            {!this.state.loading &&
              this.state.claimableBalance === 0 && (
                <div>
                  <p>Nothing to claim. Initiate claim first</p>
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

export const DailyClaim = connect(mapStateToProps, {
  getContractData,
  setToField,
  setDataField,
  reset,
  showNotification
})(Claim);
