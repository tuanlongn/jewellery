import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: process.env.ELASTICSEARCH_ENDPOINT,
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD,
  },
});

const indexKey = "regions";

export default (req, res) => {
  const { query } = req;
  const filters = {
    type: query["type"] || "province",
    parent_code: query["parent_code"] || 0,
  };

  return new Promise((resolve) => {
    fetchData({ filters })
      .then((data) => {
        res.statusCode = 200;
        res.json(data);
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

const fetchData = async ({ filters }) => {
  const pageSize = 1000;

  const q = [];
  if (filters.type) {
    q.push({
      query_string: {
        query: filters.type,
        fields: ["type"],
      },
    });
  }
  if (filters.parent_code) {
    q.push({
      query_string: {
        query: filters.parent_code,
        fields: ["parent_code"],
      },
    });
  }

  const { body } = await client.search({
    index: indexKey,
    size: pageSize,
    body: {
      query: {
        bool: {
          must: q,
        },
      },
    },
  });

  const data = body?.hits?.hits.map((item) => item._source) || [];
  return data;
};
