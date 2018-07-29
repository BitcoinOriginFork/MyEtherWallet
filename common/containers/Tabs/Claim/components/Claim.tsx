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

export interface DailyClaimState {
  loading: boolean;
  claimSucceeded: boolean;
  instance?: Contract;
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
}

class Claim extends React.Component<DailyClaimProps, DailyClaimState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      claimSucceeded: false
    };
  }

  public componentDidMount() {
    const xbo = this.props.networkConfig.network.contracts.filter(c => c.name === 'XBO')[0];
    const parsedAbi = JSON.parse(xbo.abi);
    const contractInstance: any = new Contract(parsedAbi);
    this.props.setToField({ raw: xbo.address, value: Address(xbo.address) });

    const data = contractInstance.claim.encodeInput({});
    this.props.setDataField({ raw: data, value: Data(data) });
    this.setState({ instance: contractInstance });
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
              !this.state.claimSucceeded && (
                <div>
                  <TXMetaDataPanel
                    className="form-group"
                    initialState="simple"
                    disableToggle={true}
                    advancedGasOptions={{ dataField: false }}
                  />
                  <GenerateTransaction />
                  <SigningStatus />
                  <SendButton />
                </div>
              )}
            {this.state.claimSucceeded && <h3>Success</h3>}
            {this.state.loading && <h3>Loading</h3>}
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
  xbo: state.xbo
});

export const DailyClaim = connect(mapStateToProps, {
  getContractData,
  setToField,
  setDataField,
  reset
})(Claim);
