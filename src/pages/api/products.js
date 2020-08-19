import { Client } from "@elastic/elasticsearch";
import { sleep } from "../../common/utils";

const client = new Client({ node: "http://elasticsearch:9200" });

const indexKey = "products";

export default (req, res) => {
  const { query } = req;
  const filters = {};
  Object.keys(query).forEach((key) => {
    filters[key] = query[key].split(",");
  });

  return new Promise((resolve) => {
    fetchDataWithDelay({ filters })
      .then((data) => {
        res.statusCode = 200;
        res.json({ data, pagination: {} });
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

const fetchDataWithDelay = async ({ filters }) => {
  const [data, _] = await Promise.all([fetchData({ filters }), sleep(1500)]);
  return data;
};

const fetchData = async ({ filters }) => {
  let q = [];
  // price range
  if (filters.price) {
    let priceRange = {};
    if (filters.price[0]) {
      priceRange.gte = parseInt(filters.price[0]);
    }
    if (filters.price[1]) {
      priceRange.lte = parseInt(filters.price[1]);
    }
    q.push({
      range: {
        price: priceRange,
      },
    });
  }
  // age
  if (filters.age) {
    q.push({
      query_string: {
        query: filters.age.join(" OR "),
        fields: ["age"],
      },
    });
  }
  // type
  if (filters.type) {
    q.push({
      query_string: {
        query: filters.type.join(" OR "),
        fields: ["type"],
      },
    });
  }
  // color
  if (filters.color) {
    q.push({
      query_string: {
        query: filters.color.join(" OR "),
        fields: ["color"],
      },
    });
  }

  console.log("q___", JSON.stringify(q));

  const { body } = await client.search({
    index: indexKey,
    from: 0,
    size: 20,
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
