import { Client } from "@elastic/elasticsearch";
import { sleep } from "../../common/utils";

const client = new Client({
  node: process.env.ELASTICSEARCH_ENDPOINT,
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD,
  },
});

const indexKey = "products";

export default (req, res) => {
  const { query } = req;
  const page = query["page"] ? parseInt(query["page"]) : 0;
  const filters = {};
  Object.keys(query).forEach((key) => {
    filters[key] = query[key].split(",");
  });

  return new Promise((resolve) => {
    fetchDataWithDelay({ filters, page })
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

const fetchDataWithDelay = async ({ filters, page }) => {
  const [data, _] = await Promise.all([
    fetchData({ filters, page }),
    sleep(1000),
  ]);
  return data;
};

const fetchData = async ({ filters, page }) => {
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

  const pageSize = 24;

  const { body } = await client.search({
    index: indexKey,
    from: page > 1 ? (page - 1) * pageSize : 0,
    size: pageSize,
    body: {
      query: {
        bool: {
          must: q,
        },
      },
      sort: [
        {
          price: {
            mode: "avg",
            order: "asc",
          },
        },
      ],
    },
  });

  const data = body?.hits?.hits.map((item) => item._source) || [];
  const total = body?.hits?.total?.value || 0;
  const totalPage = Math.ceil(total / pageSize);
  return {
    data,
    pagination: {
      total,
      totalPage,
      currentPage: page,
    },
  };
};
