import axios from 'axios';

const endpoint = process.env.XBO_API;

export async function getXboContractDetails() {
  const res = await axios.get(`${endpoint}/contracts/xbo`);
  return res.data;
}

export async function queryCurrencyBalance(chain: string, address: string) {
  const res = await axios.get(`${endpoint}/balance?chain=${chain}&chainAddress=${address}`);
  return res.data;
}
