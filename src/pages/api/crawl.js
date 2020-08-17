import axios from "axios";
import cheerio from "cheerio";

const sources = {
  GOLD_10K:
    "https://www.pnj.com.vn/bong-tai/bong-tai-vang/?features_hash=54-19975",
  GOLD_14K:
    "https://www.pnj.com.vn/bong-tai/bong-tai-vang/?features_hash=54-19976",
  GOLD_18K:
    "https://www.pnj.com.vn/bong-tai/bong-tai-vang/?features_hash=54-19977",
  GOLD_22K:
    "https://www.pnj.com.vn/bong-tai/bong-tai-vang/?features_hash=54-117778",
  GOLD_24K:
    "https://www.pnj.com.vn/bong-tai/bong-tai-vang/?features_hash=54-19978",
};

export default (req, res) => {
  return new Promise((resolve) => {
    fetchData()
      .then((html) => {
        res.statusCode = 200;
        res.json({});
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
  Object.keys(sources).forEach(async (key) => {
    const url = sources[key];
    const response = await axios(url);
    const $ = cheerio.load(response.data, { decodeEntities: false });

    const productItems = $(".product-item");
    let i = 1;
    productItems.each(() => {
      const item = $(".product-container > a", this);
      console.log("age", key);
      console.log("name", item.attr("title"));
      console.log("price", item.attr("data-price"));
      i++;
    });
    console.log(".....", i);
  });

  return null;
};
