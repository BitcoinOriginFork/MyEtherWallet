import * as React from 'react';
import { AppState } from 'reducers';
import { isWalletFullyUnlocked } from 'selectors/wallet';
import { connect } from 'react-redux';
import { getContractData } from 'actions/xbo';
import { IFullWallet } from 'libs/wallet';
import { WalletDecrypt } from 'components';
import { DISABLE_WALLETS } from 'components/WalletDecrypt';

export interface DailyClaimState {
  loading: boolean;
  claimSucceeded: boolean;
}

interface DailyClaimProps {
  wallet: IFullWallet;
  unlocked: boolean;
  getContractData: any;
  xbo: { contract: { address: string; abi: string } };
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
    this.props.getContractData();
  }

  public dailyClaim() {
    this.setState({ loading: true });
    // Some function

    this.setState({ claimSucceeded: true, loading: false });
  }

  public render() {
    return (
      <div className="Tab-content-pane">
        {this.props.unlocked ? (
          <div>
            <h1>Daily Claim</h1>
            {!this.state.loading &&
              !this.state.claimSucceeded && (
                <button className="btn btn-primary" onClick={() => this.dailyClaim()}>
                  Claim!!
                </button>
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
  wallet: state.wallet.inst,
  unlocked: isWalletFullyUnlocked(state),
  xbo: state.xbo
});

export const DailyClaim = connect(mapStateToProps, {
  getContractData
})(Claim);
