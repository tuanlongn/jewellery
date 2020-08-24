import axios from "axios";
import cheerio from "cheerio";
import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: process.env.ELASTICSEARCH_ENDPOINT,
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD,
  },
});

const indexKey = "regions";

const sources = {
  province:
    "https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/tinh_tp.json",
  district:
    "https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/quan_huyen.json",
  ward:
    "https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/xa_phuong.json",
};

export default (req, res) => {
  return new Promise((resolve) => {
    fetchData()
      .then((html) => {
        res.statusCode = 200;
        res.json({ success: true });
        resolve();
      })
      .catch((err) => {
        console.log("err", err);
        res.statusCode = 500;
        res.json({ error: true });
        resolve();
      });
  });
};

const fetchData = async () => {
  let count = 0;
  Object.keys(sources).forEach(async (type) => {
    const url = sources[type];
    const response = await axios(url);
    const data = response?.data || {};
    Object.keys(data).forEach((id) => {
      client.index({
        index: indexKey,
        id,
        body: {
          ...data[id],
          type,
        },
      });
      count++;
      console.log(`indexed region: ${type}-${id} ${count}`);
    });
  });
};
