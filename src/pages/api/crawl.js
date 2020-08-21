import axios from "axios";
import cheerio from "cheerio";
import { Client } from "@elastic/elasticsearch";

const client = new Client({ node: "http://elasticsearch:9200" });

const indexKey = "products";

const sources = {
  age: {
    "10k":
      "https://www.pnj.com.vn/bong-tai/bong-tai-vang/?features_hash=54-19975",
    "14k":
      "https://www.pnj.com.vn/bong-tai/bong-tai-vang/?features_hash=54-19976",
    "18k":
      "https://www.pnj.com.vn/bong-tai/bong-tai-vang/?features_hash=54-19977",
    "22k":
      "https://www.pnj.com.vn/bong-tai/bong-tai-vang/?features_hash=54-117778",
    "24k":
      "https://www.pnj.com.vn/bong-tai/bong-tai-vang/?features_hash=54-19978",
  },
  color: {
    Đỏ:
      "https://www.pnj.com.vn/bong-tai/bong-tai-vang/?features_hash=8-6773000-13767000-VND_41-20038",
    Trắng:
      "https://www.pnj.com.vn/bong-tai/bong-tai-vang/?features_hash=8-6773000-13767000-VND_41-20039",
    Vàng:
      "https://www.pnj.com.vn/bong-tai/bong-tai-vang/?features_hash=8-6773000-13767000-VND_41-20040",
    Hồng:
      "https://www.pnj.com.vn/bong-tai/bong-tai-vang/?features_hash=8-6773000-13767000-VND_57-19940",
  },
  type: {
    Ruby:
      "https://www.pnj.com.vn/bong-tai/bong-tai-vang/?features_hash=8-10137000-13767000-VND_46-69324",
    Sapphire:
      "https://www.pnj.com.vn/bong-tai/bong-tai-vang/?features_hash=8-10137000-13767000-VND_46-69325",
    Topaz:
      "https://www.pnj.com.vn/bong-tai/bong-tai-vang/?features_hash=8-10137000-13767000-VND_46-69326",
    Diamond:
      "https://www.pnj.com.vn/bong-tai/bong-tai-vang/?features_hash=8-10137000-13767000-VND_46-405272",
  },
};

export default (req, res) => {
  return new Promise((resolve) => {
    indexData()
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

const indexData = async () => {
  let count = 0;
  Object.keys(sources).forEach((attr) => {
    Object.keys(sources[attr]).forEach(async (key) => {
      const url = sources[attr][key];
      let data = [];
      let result = await crawlData(url);
      data = data.concat(result.data);
      while (result.next) {
        result = await crawlData(result.next);
        data = data.concat(result.data);
      }

      data.forEach(async (item) => {
        const { body } = await client.exists({
          index: indexKey,
          id: item.id,
        });
        if (body) {
          await client.update({
            index: indexKey,
            id: item.id,
            body: {
              doc: {
                [attr]: key,
                ...item,
              },
            },
          });
        } else {
          await client.index({
            index: indexKey,
            id: item.id,
            body: {
              [attr]: key,
              ...item,
            },
          });
        }

        count++;
        console.log(
          `${body ? "updated" : "indexed"} ${count} id: ${
            item.id
          }, ${attr} ${key}`
        );
      });
    });
  });
  return null;
};

const crawlData = async (url) => {
  let data = [];
  const response = await axios(url);
  const $ = cheerio.load(response.data, { decodeEntities: false });

  const productItems = $(".product-item");
  productItems.each((i, elm) => {
    const item = $(elm).find($(".product-container > a"));
    const img = $(elm).find($(".product-image > a > img"));

    let category = item.attr("data-category")?.split("/") || [""];
    category = category.length > 0 ? category[1] : category[0];

    data.push({
      id: item.attr("data-id"),
      title: item.attr("title"),
      price: parseInt(item.attr("data-price")),
      image: img.attr("data-src"),
      category,
    });
  });

  let next = null;
  const pagination = $(".ty-pagination__selected").next();
  if (pagination.length) {
    next = pagination.attr("href");
  }

  console.log(`crawled data: ${data.length} - next: ${next}`);
  return { data, next };
};
