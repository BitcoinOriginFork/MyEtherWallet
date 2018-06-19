import React, { Component } from 'react';
import { Metamask } from './components/Metamask';
import { PrivateKey } from './components/PrivateKey';
import { Signature } from './components/Signature';
import TabSection from 'containers/TabSection';
import { RouteComponentProps, Switch, Route, Redirect } from 'react-router';
import SubTabs from 'components/SubTabs';
import { RouteNotFound } from 'components/RouteNotFound';

interface State {
  activeTab: 'signature' | 'metamask' | 'privateKey';
}

export default class Claim extends Component<RouteComponentProps<{}>, State> {
  public state: State = {
    activeTab: 'signature'
  };

  public changeTab = (activeTab: State['activeTab']) => () => this.setState({ activeTab });

  public render() {
    const { match } = this.props;
    const currentPath = match.url;

    const tabs = [
      {
        path: 'signature',
        name: 'Signature'
      },
      {
        path: 'privateKey',
        name: 'Private Key'
      },
      {
        path: 'metamask',
        name: 'Metamask'
      }
    ];

    return (
      <TabSection>
        <section className="Tab-content Claim">
          <SubTabs tabs={tabs} match={match} />
          <Switch>
            <Route
              exact={true}
              path={currentPath}
              render={() => <Redirect from={`${currentPath}`} to={`${currentPath}/signature`} />}
            />
            <Route exact={true} path={`${currentPath}/signature`} component={Signature} />
            <Route exact={true} path={`${currentPath}/privateKey`} component={PrivateKey} />
            <Route exact={true} path={`${currentPath}/metamask`} component={Metamask} />
            <RouteNotFound />
          </Switch>
        </section>
      </TabSection>
    );
  }
}
