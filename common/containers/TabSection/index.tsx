import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  changeLanguage as dChangeLanguage,
  changeNodeIntent as dChangeNodeIntent,
  addCustomNode as dAddCustomNode,
  removeCustomNode as dRemoveCustomNode,
  addCustomNetwork as dAddCustomNetwork,
  TChangeLanguage,
  TChangeNodeIntent,
  TAddCustomNode,
  TRemoveCustomNode,
  TAddCustomNetwork
} from 'actions/config';
import { TSetGasPriceField, setGasPriceField as dSetGasPriceField } from 'actions/transaction';
import { Footer, Header, Sidebar } from 'components';
import { AppState } from 'reducers';
import Notifications from './Notifications';
import OfflineTab from './OfflineTab';
import './index.scss';

interface ReduxProps {
  languageSelection: AppState['config']['languageSelection'];
  node: AppState['config']['node'];
  nodeSelection: AppState['config']['nodeSelection'];
  isChangingNode: AppState['config']['isChangingNode'];
  isOffline: AppState['config']['offline'];
  customNodes: AppState['config']['customNodes'];
  customNetworks: AppState['config']['customNetworks'];
  latestBlock: AppState['config']['latestBlock'];
}

interface ActionProps {
  changeLanguage: TChangeLanguage;
  changeNodeIntent: TChangeNodeIntent;
  addCustomNode: TAddCustomNode;
  removeCustomNode: TRemoveCustomNode;
  addCustomNetwork: TAddCustomNetwork;
  setGasPriceField: TSetGasPriceField;
}

type Props = {
  isUnavailableOffline?: boolean;
  children: string | React.ReactElement<string> | React.ReactElement<string>[];
} & ReduxProps &
  ActionProps;

class TabSection extends Component<Props, {}> {
  public render() {
    const {
      isUnavailableOffline,
      children,
      // APP
      node,
      nodeSelection,
      isChangingNode,
      isOffline,
      languageSelection,
      customNodes,
      customNetworks,
      latestBlock,
      setGasPriceField,
      changeLanguage,
      changeNodeIntent,
      addCustomNode,
      removeCustomNode,
      addCustomNetwork
    } = this.props;

    const headerProps = {
      languageSelection,
      node,
      nodeSelection,
      isChangingNode,
      isOffline,
      customNodes,
      customNetworks,
      changeLanguage,
      changeNodeIntent,
      setGasPriceField,
      addCustomNode,
      removeCustomNode,
      addCustomNetwork
    };

    return (
      <div className="wrapper">
        <Sidebar />
        <div className="page-layout" style={{ width: '100%' }}>
          <main>
            <Header {...headerProps} />
            <div className="Tab container">
              {isUnavailableOffline && isOffline ? <OfflineTab /> : children}
            </div>
            <Footer latestBlock={latestBlock} />
          </main>
          <Notifications />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: AppState): ReduxProps {
  return {
    node: state.config.node,
    nodeSelection: state.config.nodeSelection,
    isChangingNode: state.config.isChangingNode,
    isOffline: state.config.offline,
    languageSelection: state.config.languageSelection,
    customNodes: state.config.customNodes,
    customNetworks: state.config.customNetworks,
    latestBlock: state.config.latestBlock
  };
}

export default connect(mapStateToProps, {
  setGasPriceField: dSetGasPriceField,
  changeLanguage: dChangeLanguage,
  changeNodeIntent: dChangeNodeIntent,
  addCustomNode: dAddCustomNode,
  removeCustomNode: dRemoveCustomNode,
  addCustomNetwork: dAddCustomNetwork
})(TabSection);
