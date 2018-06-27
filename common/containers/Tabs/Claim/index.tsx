import React, { Component } from 'react';
import { InitiateClaim, SignClaim, ClaimConfirmation } from './components';
import TabSection from 'containers/TabSection';
import { RouteComponentProps, Switch, Route } from 'react-router';
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

    return (
      <TabSection>
        <section className="Tab-content Claim">
          <Switch>
            <Route exact={true} path={currentPath} component={InitiateClaim} />
            <Route exact={true} path={`${currentPath}/signature`} component={SignClaim} />
            <Route
              exact={true}
              path={`${currentPath}/confirmation`}
              component={ClaimConfirmation}
            />
            <RouteNotFound />
          </Switch>
        </section>
      </TabSection>
    );
  }
}
