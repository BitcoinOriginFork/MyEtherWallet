import React, { Component } from 'react';
import { DailyClaim, Submit } from './components';
import TabSection from 'containers/TabSection';
import { RouteComponentProps, Switch, Route, Redirect } from 'react-router';
import { RouteNotFound } from 'components/RouteNotFound';
import SubTabs from 'components/SubTabs';

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
        path: 'create',
        name: 'Create'
      },
      {
        path: 'claim',
        name: 'Claim'
      }
    ];

    return (
      <TabSection isUnavailableOffline={true}>
        <section className="Tab-content Claim">
          <SubTabs tabs={tabs} match={match} />
          <Switch>
            <Route
              exact={true}
              path={currentPath}
              render={() => <Redirect from={`${currentPath}`} to={`${currentPath}/create`} />}
            />
            <Route exact={true} path={`${currentPath}/create`} component={Submit} />
            <Route exact={true} path={`${currentPath}/claim`} component={DailyClaim} />
            <RouteNotFound />
          </Switch>
        </section>
      </TabSection>
    );
  }
}
