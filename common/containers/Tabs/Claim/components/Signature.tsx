import * as React from 'react';
export class SignClaim extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div className="Tab-content-pane">
        <h1>Provide Signature</h1>
        <h3>Message To Sign</h3>
        <p>MESSAGE TO SIGN GOES HERE</p>
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
