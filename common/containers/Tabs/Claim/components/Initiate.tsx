import * as React from 'react';
import { ClaimCurrency } from 'enums';
import { IFullWallet } from 'libs/wallet';

export interface ClaimDetails {
  currency: string;
  currencyAddress?: string;
}

export class InitiateClaim extends React.Component<
  { wallet: IFullWallet; checkClaim: any },
  ClaimDetails
> {
  constructor(props) {
    super(props);
    this.state = { currency: ClaimCurrency.bitcoin };
  }

  public handleKeypress(ev: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    ev.preventDefault();
    const key = ev.target.name as any;
    this.setState({ [key]: ev.target.value });
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

    this.props.checkClaim({ address: this.state.currencyAddress, chain: this.state.currency });
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
            <label htmlFor="cryptoAddress">Your {this.state.currency} Address</label>
            <input
              className="form-control"
              type="text"
              id="cryptoAddress"
              placeholder={`Your ${this.state.currency} Address`}
              onChange={ev => this.handleKeypress(ev)}
              name="currencyAddress"
            />
            <span id="currencyAddressHelp" className="help-block">
              This is the address of the currency you are claiming for.
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
