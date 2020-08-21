import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: process.env.ELASTICSEARCH_ENDPOINT,
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD,
  },
});

const indexKey = "products";

export default (req, res) => {
  return new Promise((resolve) => {
    getAllProductIds()
      .then((data) => {
        res.statusCode = 200;
        res.json({ data });
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

const getAllProductIds = async () => {
  const { body } = await client.search({
    index: indexKey,
    // size: 1000,
    body: {
      query: {
        match_all: {},
      },
      stored_fields: [],
    },
  });

  const data = body?.hits?.hits.map((item) => item._id) || [];
  return data;
};
