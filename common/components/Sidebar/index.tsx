import React from 'react';
import './Sidebar.scss';
import { TabLink } from 'components/Header/components/Navigation';
import NavigationLink from 'components/Header/components/NavigationLink';

const tabs: TabLink[] = [
  {
    name: 'Account View & Send',
    to: '/account',
    icon: 'fa fa-user'
  },
  {
    name: 'NAV_GenerateWallet',
    to: '/generate',
    icon: 'fa fa-plus-circle'
  },
  {
    name: 'Claim',
    to: '/claim',
    icon: 'fa fa-cloud-download'
  },
  {
    name: 'Stake',
    to: '/stake',
    icon: 'fa fa-users'
  },
  {
    name: 'NAV_Contracts',
    to: '/contracts',
    icon: 'fa fa-play'
  },
  {
    name: 'Sign & Verify Message',
    to: '/sign-and-verify-message',
    icon: 'fa fa-pencil'
  },
  {
    name: 'Broadcast Transaction',
    to: '/pushTx',
    icon: 'fa fa-share-square'
  }
];

export const Sidebar: React.SFC = () => (
  <nav className="sidebar">
    <div className="sidebar-header">
      <h4 className="text-center">Bitcoin Origin</h4>
    </div>
    <div className="list-group" style={{ marginTop: '100px' }}>
      {tabs.map(link => {
        return <NavigationLink key={link.name} link={link} isHomepage={link === tabs[0]} />;
      })}
    </div>
  </nav>
);
