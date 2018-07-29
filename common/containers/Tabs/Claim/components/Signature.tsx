import * as React from 'react';
import { IFullWallet } from 'libs/wallet';
import { CurrencyBalance } from 'containers/Tabs/Claim/components';

export class SignClaim extends React.Component<
  {
    wallet: IFullWallet;
    balance: CurrencyBalance;
    chain: string;
    submitClaim: any;
    resetWorkflow: any;
  },
  { message: string; signature: string }
> {
  public state = { message: '', signature: '' };

  public async componentDidMount() {
    const walletAddress = await this.props.wallet.getAddressString();
    this.setState({ message: `XBO:${walletAddress}` });
  }

  public handleSubmit(ev) {
    ev.preventDefault();
    this.props.submitClaim({ message: this.state.message, signature: this.state.signature });
  }

  public handleKeypress(ev: React.ChangeEvent<HTMLTextAreaElement>) {
    ev.preventDefault();
    this.setState({ signature: ev.target.value });
  }

  public render() {
    return (
      <div className="Tab-content-pane">
        {this.props.balance.balance > 0 && !this.props.balance.claimed ? (
          <div>
            <h1>Provide Signature</h1>
            <h3>Sign the following message</h3>
            <p>{this.state.message}</p>
            <h3>Claimable Balance</h3>
            <p>
              {this.props.balance.balance} {this.props.chain} ~ TODO: XBO
            </p>
            <form onSubmit={ev => this.handleSubmit(ev)}>
              <div className="form-group">
                <label htmlFor="signature">Signature</label>
                <textarea
                  className="form-control"
                  id="signature"
                  placeholder={`Signature`}
                  aria-describedby="signatureHelp"
                  onChange={ev => this.handleKeypress(ev)}
                />
                <span id="signatureHelp" className="help-block">
                  Sign the message provided with the wallet for the currency you are claiming for.
                </span>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit Claim
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h3>Invalid claim</h3>
            {this.props.balance.balance === 0 ? (
              <p>No claimable balance for specified address</p>
            ) : (
              <p>This balance has already been claimed</p>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => this.props.resetWorkflow()}
            >
              Reset
            </button>
          </div>
        )}
      </div>
    );
  }
}
