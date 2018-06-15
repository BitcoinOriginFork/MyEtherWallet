import React from 'react';
import AccountInfo from './AccountInfo';
import TokenBalances from './TokenBalances';
import { AppState } from 'reducers';
import { getWalletInst } from 'selectors/wallet';
import { connect } from 'react-redux';

interface Block {
  name: string;
  content: React.ReactElement<any>;
  isFullWidth?: boolean;
}

interface StateProps {
  wallet: AppState['wallet']['inst'];
}

export class BalanceSidebar extends React.Component<StateProps> {
  public render() {
    const { wallet } = this.props;

    if (!wallet) {
      return null;
    }

    const blocks: Block[] = [
      {
        name: 'Account Info',
        content: <AccountInfo wallet={wallet} />
      },
      {
        name: 'Token Balances',
        content: <TokenBalances />
      }
    ];

    return (
      <aside>
        {blocks.map(block => (
          <section className={`Block ${block.isFullWidth ? 'is-full-width' : ''}`} key={block.name}>
            {block.content}
          </section>
        ))}
      </aside>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({ wallet: getWalletInst(state) });

export default connect(mapStateToProps)(BalanceSidebar);
