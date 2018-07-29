import Contract from 'libs/contracts';

export function getXboInstance(networkContracts): { contract: any; xbo: any } {
  const xbo = networkContracts.filter(c => c.name === 'XBO')[0];
  const parsedAbi = JSON.parse(xbo.abi);
  return { contract: new Contract(parsedAbi), xbo };
}

export async function getBalance(networkContracts, address): Promise<number> {
  const contractInstance = getXboInstance(networkContracts);
  const data = contractInstance.contract.balanceOf.encodeInput({ _owner: address });
  const callData = { to: contractInstance.xbo.address, data };
  const results = await this.props.nodeLib.sendCallRequest(callData);
  return contractInstance.contract.balanceOf.decodeOutput(results)._claimableBalance / 10 ** 18;
}
