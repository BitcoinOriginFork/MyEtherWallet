import React from 'react';
import './Sidebar.scss';
import { TabLink } from 'components/Header/components/Navigation';
import NavigationLink from 'components/Header/components/NavigationLink';

const tabs: TabLink[] = [
  {
    name: 'Account View & Send',
    to: '/account'
  },
  {
    name: 'NAV_GenerateWallet',
    to: '/generate'
  },
  {
    name: 'NAV_Contracts',
    to: '/contracts'
  },
  {
    name: 'Sign & Verify Message',
    to: '/sign-and-verify-message'
  },
  {
    name: 'Broadcast Transaction',
    to: '/pushTx'
  }
];

export const Sidebar: React.SFC = () => (
  <nav className="sidebar">
    <div className="sidebar-header">
      <h3 className="text-center">Bitcoin Origin</h3>
    </div>
    <div className="list-group">
      {tabs.map(link => {
        return <NavigationLink key={link.name} link={link} isHomepage={link === tabs[0]} />;
      })}
    </div>
  </nav>
);
