import React from 'react';
import { connect } from 'react-redux';
import { AppState } from 'reducers';
import {
  addCustomToken,
  removeCustomToken,
  TAddCustomToken,
  TRemoveCustomToken
} from 'actions/customTokens';
import {
  scanWalletForTokens,
  TScanWalletForTokens,
  setWalletTokens,
  TSetWalletTokens,
  setTokenBalancesPending
} from 'actions/wallet';
import { getAllTokens } from 'selectors/config';
import { getTokenBalances, getWalletInst, getWalletConfig, TokenBalance } from 'selectors/wallet';
import { Token } from 'config';
import translate from 'translations';
import Balances from './Balances';
import Spinner from 'components/ui/Spinner';
import './index.scss';

interface StateProps {
  wallet: AppState['wallet']['inst'];
  walletConfig: AppState['wallet']['config'];
  tokens: Token[];
  tokenBalances: TokenBalance[];
  tokensError: AppState['wallet']['tokensError'];
  isTokensLoading: AppState['wallet']['isTokensLoading'];
  hasSavedWalletTokens: AppState['wallet']['hasSavedWalletTokens'];
  isOffline: AppState['config']['offline'];
}
interface ActionProps {
  addCustomToken: TAddCustomToken;
  removeCustomToken: TRemoveCustomToken;
  scanWalletForTokens: TScanWalletForTokens;
  setWalletTokens: TSetWalletTokens;
  setTokenBalancesPending: any;
}
type Props = StateProps & ActionProps;

class TokenBalances extends React.Component<Props> {
  public componentDidMount() {
    this.props.setTokenBalancesPending();
  }

  public render() {
    const {
      tokens,
      tokenBalances,
      hasSavedWalletTokens,
      isTokensLoading,
      tokensError,
      isOffline
    } = this.props;

    let content;
    if (isOffline) {
      content = (
        <div className="TokenBalances-offline well well-sm">
          Token balances are unavailable offline
        </div>
      );
    } else if (tokensError) {
      content = <h5>{tokensError}</h5>;
    } else if (isTokensLoading) {
      content = (
        <div className="TokenBalances-loader">
          <Spinner size="x3" />
        </div>
      );
    } else {
      content = (
        <Balances
          allTokens={tokens}
          tokenBalances={tokenBalances}
          hasSavedWalletTokens={hasSavedWalletTokens}
          scanWalletForTokens={this.scanWalletForTokens}
          setWalletTokens={this.props.setWalletTokens}
          onAddCustomToken={this.props.addCustomToken}
          onRemoveCustomToken={this.props.removeCustomToken}
        />
      );
    }

    return (
      <section className="TokenBalances">
        <h5 className="TokenBalances-title">{translate('sidebar_TokenBal')}</h5>
        {content}
      </section>
    );
  }

  private scanWalletForTokens = () => {
    if (this.props.wallet) {
      this.props.scanWalletForTokens(this.props.wallet);
      this.setState({ hasScanned: true });
    }
  };
}

function mapStateToProps(state: AppState): StateProps {
  return {
    wallet: getWalletInst(state),
    walletConfig: getWalletConfig(state),
    tokens: getAllTokens(state),
    tokenBalances: getTokenBalances(state),
    tokensError: state.wallet.tokensError,
    isTokensLoading: state.wallet.isTokensLoading,
    hasSavedWalletTokens: state.wallet.hasSavedWalletTokens,
    isOffline: state.config.offline
  };
}

export default connect(mapStateToProps, {
  addCustomToken,
  removeCustomToken,
  scanWalletForTokens,
  setTokenBalancesPending,
  setWalletTokens
})(TokenBalances);
