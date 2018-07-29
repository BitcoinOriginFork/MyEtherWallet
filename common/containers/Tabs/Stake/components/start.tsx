import * as React from 'react';
import { AppState } from 'reducers';
import { connect } from 'react-redux';
import { TXMetaDataPanel, GenerateTransaction, SigningStatus, SendButton } from 'components';
import { Address, Data } from 'libs/units';
import { setToField, setDataField, reset } from 'actions/transaction';
import { showNotification } from 'actions/notifications';
import { getXboInstance } from 'libs/xbo';
import { BigNumber } from 'bignumber.js';

interface StoreProps {
  networkConfig: any;
  setToField: any;
  setDataField: any;
  reset: any;
  showNotification: any;
}

interface OwnProps {
  amount: number;
  stakeableBalance: number;
  currentStake: number;
}

type Props = OwnProps & StoreProps;

class Start extends React.Component<Props, any> {
  public start = async () => {
    const toStake = new BigNumber(this.props.amount).multipliedBy(10 ** 18).decimalPlaces(0, 6);

    const contractInstance = getXboInstance(this.props.networkConfig.network.contracts);
    this.props.setToField({
      raw: contractInstance.xbo.address,
      value: Address(contractInstance.xbo.address)
    });

    const data = contractInstance.contract.startStaking.encodeInput({ _amount: toStake });
    this.props.setDataField({ raw: data, value: Data(data) });
  };

  public componentWillUnmount() {
    this.props.reset();
  }

  public render() {
    const { stakeableBalance, currentStake } = this.props;

    return (
      <div>
        <div>
          <p>Current Stake: {currentStake.toFixed(18)}</p>
          <p>Stakeable Balance: {stakeableBalance.toFixed(18)}</p>
          <p>XBO To Stake: {this.props.amount}</p>
          <TXMetaDataPanel
            className="form-group"
            initialState="advanced"
            disableToggle={true}
            advancedGasOptions={{ dataField: false }}
          />
          <GenerateTransaction />
          <SigningStatus />
          <SendButton />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  networkConfig: state.config
});

export const StartConnector = connect(mapStateToProps, {
  setToField,
  setDataField,
  reset,
  showNotification
})(Start);
