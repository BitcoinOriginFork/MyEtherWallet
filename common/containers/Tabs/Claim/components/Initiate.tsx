import * as React from 'react';

export interface ClaimDetails {
  currency: string;
  currencyAddress: string;
  claimToAddress: string;
}

export class InitiateClaim extends React.Component<any, ClaimDetails> {
  constructor(props) {
    super(props);
  }

  public handleSubmit(ev) {
    ev.preventDefault();

    // TODO: Validate Form Fields. Display relevant errors or proceed

    const { match } = this.props;
    const currentPath = match.url;
    const query = `currency=${this.state.currency}&currencyAddress=${
      this.state.currencyAddress
    }&claimToAddress=${this.state.claimToAddress}`;
    this.props.push(`${currentPath}/signature?${query}`);
  }

  public render() {
    return (
      <div className="Tab-content-pane">
        <h1>Claim Origin</h1>
        <form>
          <div className="form-group">
            <label htmlFor="crytpoSelector">Currency</label>
            <select id="crytpoSelector" className="form-control">
              <option>Bitcoin</option>
              <option>Ethereum</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="cryptoAddress">Your CURRENCY Address</label>
            <input
              className="form-control"
              type="text"
              id="cryptoAddress"
              placeholder={`Your CURRENCY Address`}
            />
          </div>
          <div className="form-group">
            <label htmlFor="claimToAddress">Your CLAIM TO Address</label>
            <input
              className="form-control"
              type="text"
              id="claimToAddress"
              placeholder={`Your CLAIM TO Address`}
              aria-describedby="claimToHelp"
            />
            <span id="claimToHelp" className="help-block">
              This is the ETH address that Origin ERC20 Tokens will be sent to.
            </span>
          </div>
        </form>
      </div>
    );
  }
}
