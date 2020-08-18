import { Client } from "@elastic/elasticsearch";

const client = new Client({ node: "http://elasticsearch:9200" });

const indexKey = "products";

export default (req, res) => {
  return new Promise((resolve) => {
    fetchData()
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

const fetchData = async () => {
  const { body } = await client.search({
    index: indexKey,
    body: {
      query: {
        match: { age: "GOLD_18K" },
      },
    },
  });
  return body?.hits?.hits;
};
