import * as React from 'react';
import { IFullWallet } from 'libs/wallet';

export class SignClaim extends React.Component<
  { wallet: IFullWallet; balance: any },
  { message: string }
> {
  public state = { message: '' };

  public async componentDidMount() {
    const walletAddress = await this.props.wallet.getAddressString();
    this.setState({ message: `XBO:${walletAddress}` });
  }

  public render() {
    return (
      <div className="Tab-content-pane">
        <h1>Provide Signature</h1>
        <h3>Sign the following message</h3>
        <p>{this.state.message}</p>
        <h3>Claimable Balance</h3>
        <p>{JSON.stringify(this.props.balance)}</p>
        <form>
          <div className="form-group">
            <label htmlFor="signature">Signature</label>
            <textarea
              className="form-control"
              id="signature"
              placeholder={`Your CLAIM TO Address`}
              aria-describedby="signatureHelp"
            />
            <span id="signatureHelp" className="help-block">
              Sign the message provided with the wallet for the currency you are claiming for.
            </span>
          </div>
        </form>
      </div>
    );
  }
}
