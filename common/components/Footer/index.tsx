import logo from 'assets/images/logo-myetherwallet.svg';
import {
  bityReferralURL,
  ledgerReferralURL,
  trezorReferralURL,
  bitboxReferralURL,
  donationAddressMap,
  VERSION,
  knowledgeBaseURL
} from 'config';
import React from 'react';
import translate from 'translations';
import './index.scss';
import Modal, { IButton } from 'components/ui/Modal';
import { NewTabLink } from 'components/ui';

const AffiliateTag = ({ link, text }: Link) => {
  return (
    <li className="Footer-affiliate-tag" key={link}>
      <NewTabLink href={link}>{text}</NewTabLink>
    </li>
  );
};

interface Link {
  link: string;
  text: string;
}

interface Props {
  latestBlock: string;
}

interface State {
  isOpen: boolean;
}

export default class Footer extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isOpen: false };
  }

  public openModal = () => {
    this.setState({ isOpen: true });
  };

  public closeModal = () => {
    this.setState({ isOpen: false });
  };

  public render() {
    const buttons: IButton[] = [{ text: 'Okay', type: 'default', onClick: this.closeModal }];
    return (
      <div>
        <footer className="Footer" aria-label="footer">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <div className="Footer-about">
                  <p className="Footer-about-text">{translate('FOOTER_1')}</p>
                  <button className="Footer-modal-button" onClick={this.openModal}>
                    Disclaimer
                  </button>
                  <Modal
                    isOpen={this.state.isOpen}
                    title="Disclaimer"
                    buttons={buttons}
                    handleClose={this.closeModal}
                  >
                    <p>
                      <b>Be safe & secure: </b>
                      <NewTabLink href={`${knowledgeBaseURL}/security/securing-your-ethereum`}>
                        We highly recommend that you read our guide on How to Prevent Loss & Theft
                        for some recommendations on how to be proactive about your security.
                      </NewTabLink>
                    </p>
                    <p>
                      <b>Always backup your keys: </b>
                      MyEtherWallet.com & MyEtherWallet CX are not "web wallets". You do not create
                      an account or give us your funds to hold onto. No data leaves your computer /
                      your browser. We make it easy for you to create, save, and access your
                      information and interact with the blockchain.
                    </p>
                    <p>
                      <b>We are not responsible for any loss: </b>
                      Ethereum, MyEtherWallet.com & MyEtherWallet CX, and some of the underlying
                      Javascript libraries we use are under active development. While we have
                      thoroughly tested & tens of thousands of wallets have been successfully
                      created by people all over the globe, there is always the possibility
                      something unexpected happens that causes your funds to be lost. Please do not
                      invest more than you are willing to lose, and please be careful.
                    </p>
                    <p>
                      <b>Translations of MyEtherWallet: </b>
                      The community has done an amazing job translating MyEtherWallet into a variety
                      of languages. However, MyEtherWallet can only verify the validity and accuracy
                      of the information provided in English and, because of this, the English
                      version of our website is the official text.
                    </p>
                    <p>
                      <b>MIT License</b> Copyright © 2015-2017 MyEtherWallet LLC
                    </p>
                    <p>
                      Permission is hereby granted, free of charge, to any person obtaining a copy
                      of this software and associated documentation files (the "Software"), to deal
                      in the Software without restriction, including without limitation the rights
                      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                      copies of the Software, and to permit persons to whom the Software is
                      furnished to do so, subject to the following conditions:
                    </p>
                    <p>
                      The above copyright notice and this permission notice shall be included in all
                      copies or substantial portions of the Software.
                    </p>
                    <b>
                      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                      SOFTWARE.
                    </b>
                  </Modal>
                </div>
              </div>
              <div className="col-sm-6">
                <p>Latest Block#: {this.props.latestBlock}</p>
                <p>v{VERSION}</p>
                <p>&copy; 2017 MyEtherWallet, LLC</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
