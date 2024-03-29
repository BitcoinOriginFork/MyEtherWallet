import React from 'react';
import translate from 'translations';
import { WalletType } from '../GenerateWallet';
import { Link } from 'react-router-dom';
import './WalletTypes.scss';

const WalletTypes: React.SFC<{}> = () => {
  const typeInfo = {
    [WalletType.Keystore]: {
      name: 'x_Keystore2',
      bullets: [
        'An encrypted JSON file, protected by a password',
        'Back it up on a USB drive',
        'Cannot be written, printed, or easily transferred to mobile',
        'Compatible with Mist, Parity, Geth',
        'Provides a single address for sending and receiving'
      ]
    },
    [WalletType.Mnemonic]: {
      name: 'x_Mnemonic',
      bullets: [
        'A 12-word private seed phrase',
        'Back it up on paper or USB drive',
        'Can be written, printed, and easily typed on mobile, too',
        'Compatible with MetaMask, Jaxx, imToken, and more',
        'Provides unlimited addresses for sending and receiving'
      ]
    }
  };

  return (
    <div className="WalletTypes Tab-content-pane">
      <h1 className="WalletTypes-title">{translate('NAV_GenerateWallet')}</h1>
      <div className="WalletTypes-types row">
        <div className="col-md-1" />
        {Object.keys(typeInfo).map(type => (
          <div key={type} className="WalletType col-md-5">
            <h2 className="WalletType-title">{translate(typeInfo[type].name)}</h2>
            <ul className="WalletType-features">
              {typeInfo[type].bullets.map(bullet => (
                <li key={bullet} className="WalletType-features-feature">
                  {translate(bullet)}
                </li>
              ))}
            </ul>
            <div className="WalletType-select">
              <Link
                className="WalletType-select-btn btn btn-primary btn-block"
                to={`/generate/${type}`}
              >
                Generate a {translate(typeInfo[type].name)}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletTypes;
