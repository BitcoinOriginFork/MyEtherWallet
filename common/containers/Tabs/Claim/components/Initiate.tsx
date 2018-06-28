import * as React from 'react';
import { ClaimCurrency } from 'enums';

export interface ClaimDetails {
  currency: string;
  currencyAddress?: string;
  claimToAddress?: string;
}

export class InitiateClaim extends React.Component<any, ClaimDetails> {
  constructor(props) {
    super(props);
    this.state = { currency: ClaimCurrency.bitcoin };
  }

  public handleKeypress(ev: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    ev.preventDefault();
    const key = ev.target.name as any;
    this.setState({ [key]: ev.target.value });
    console.log(this.state);
  }

  public claimableOptions = () => {
    const currencyKeys = Object.entries(ClaimCurrency).map(([, val]) => val);
    return currencyKeys.map((currency, i) => {
      return (
        <option key={i} value={currency}>
          {currency}
        </option>
      );
    });
  };

  public handleSubmit(ev) {
    ev.preventDefault();

    // TODO: Validate Form Fields. Display relevant errors or proceed

    const { match } = this.props;
    const currentPath = match.url;
    const query = `currency=${this.state.currency}&currencyAddress=${
      this.state.currencyAddress
    }&claimToAddress=${this.state.claimToAddress}`;
    this.props.history.push(`${currentPath}/signature?${query}`);
  }

  public render() {
    return (
      <div className="Tab-content-pane">
        <h1>Claim Origin</h1>
        <form onSubmit={ev => this.handleSubmit(ev)}>
          <div className="form-group">
            <label htmlFor="crytpoSelector">Currency</label>
            <select
              id="crytpoSelector"
              className="form-control"
              onChange={ev => this.handleKeypress(ev)}
              name="currency"
            >
              {this.claimableOptions()}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="cryptoAddress">Your CURRENCY Address</label>
            <input
              className="form-control"
              type="text"
              id="cryptoAddress"
              placeholder={`Your CURRENCY Address`}
              onChange={ev => this.handleKeypress(ev)}
              name="currencyAddress"
            />
            <span id="currencyAddressHelp" className="help-block">
              This is the address of the currency you are claiming for.
            </span>
          </div>
          <div className="form-group">
            <label htmlFor="claimToAddress">Your CLAIM TO Address</label>
            <input
              className="form-control"
              type="text"
              id="claimToAddress"
              placeholder={`Your CLAIM TO Address`}
              aria-describedby="claimToHelp"
              onChange={ev => this.handleKeypress(ev)}
              name="claimToAddress"
            />
            <span id="claimToHelp" className="help-block">
              This is the ETH address that Origin ERC20 Tokens will be sent to.
            </span>
          </div>
          <button type="submit" className="btn btn-primary">
            Check Claim
          </button>
        </form>
      </div>
    );
  }
}
