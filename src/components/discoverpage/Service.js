import products from "../../assets/data/pagination.json";

const service = {
  getData: ({ from, to }) => {
    return new Promise((resolve, reject) => {
      const data = products.slice(from, to);
      products &&
        resolve({
          count: products.length,
          data,
        });
    });
  },
};

export default service;
