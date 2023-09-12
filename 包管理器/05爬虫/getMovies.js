const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "http://www.jsplusplus.com";

async function getMoviesHTML() {
  const res = await axios.get(url);
  return res.data;
}

async function getMoviesData() {
  const html = await getMoviesHTML();
  const $ = cheerio.load(html);
  const arr = [];

  for (let i = 1; i < $(".page-item p").length; i++) {
    let data = $(".page-item p")[i].children[0].data;

    arr.push(data);
  }

  fs.writeFile("./test.txt", arr.toString(), function () {
    console.log("成功！");
  });
}

module.exports = {
  getMoviesHTML,
  getMoviesData
};
