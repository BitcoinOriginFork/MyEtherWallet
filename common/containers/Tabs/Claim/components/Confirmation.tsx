import * as React from 'react';

interface Props {
  claim?: any;
}

export class ClaimConfirmation extends React.PureComponent<Props> {
  public render() {
    console.log(this.props.claim);
    return (
      <div className="Tab-content-pane">
        <h3>Successful Claim Initiation</h3>
        <p>
          <b>Transaction Hash: </b>
          {this.props.claim.tx_hash}
        </p>
      </div>
    );
  }
}
