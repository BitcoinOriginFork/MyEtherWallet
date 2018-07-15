import configSaga from './config';
import deterministicWallets from './deterministicWallets';
import notifications from './notifications';
import wallet from './wallet';
import { ens } from './ens';
import { transaction } from './transaction';
import xbo from './xbo';

export default {
  ens,
  configSaga,
  notifications,
  wallet,
  transaction,
  deterministicWallets,
  xbo
};
