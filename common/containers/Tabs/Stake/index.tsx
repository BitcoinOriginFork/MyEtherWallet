import * as React from 'react';
import TabSection from 'containers/TabSection';
import { StakeConnector } from './components';

const Stake: React.SFC = () => (
  <TabSection>
    <section className="Tab-content Claim">
      <div className="Tab-content-pane">
        <StakeConnector />
      </div>
    </section>
  </TabSection>
);

export default Stake;
