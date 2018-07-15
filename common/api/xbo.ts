import axios from 'axios';

const endpoint = process.env.XBO_API;

export async function getXboContractDetails() {
  const res = await axios.get(`${endpoint}/contracts/obx_`);
  return res.data;
}
