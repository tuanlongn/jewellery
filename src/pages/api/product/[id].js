import { Client } from "@elastic/elasticsearch";

const client = new Client({ node: "http://elasticsearch:9200" });

const indexKey = "products";

export default (req, res) => {
  const {
    query: { id },
  } = req;

  return new Promise((resolve) => {
    getProductData(id)
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

const getProductData = async (id) => {
  const { body } = await client.get({
    index: indexKey,
    id,
  });

  const data = body?._source || [];
  return data;
};
