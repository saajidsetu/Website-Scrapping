const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const initialurl = 'https://www.otomoto.pl/ciezarowe/uzytkowe/mercedes-benz';

const getNextPageUrl = currentUrl => {
  const Url = currentUrl.split('=')[0];
  const pageNumber = parseInt(currentUrl.split('=')[1]);
  const nextPageNumber = pageNumber ? pageNumber + 1 : 2;
  const nextUrl =
    nextPageNumber === 2
      ? Url + '?page=' + nextPageNumber
      : Url + '=' + nextPageNumber;
  return nextUrl;
};

const addItems = async url => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const listItems = $('main article');
  let items = [];
  listItems.each((idx, el) => {
    const item = { id: '', url: '' };
    item.id = $(el).attr('id');
    item.url = $(el).find('h2 a').attr('href');
    items.push(item);
  });
  return items;
};

const getTotalAdsCount = async url => {
  const items = await addItems(url);
  const length = items.length;
  console.log(length);
};

const scrapeTruckItem = async url => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const listItems = $('main article');
  let items = [];
  listItems.each((idx, el) => {
    const item = {
      itemId: '',
      title: '',
      price: '',
      registration_date: '',
      mileage: '',
      power: '',
    };
    item.itemId = $(el).attr('id');
    item.title = $(el).find('h2 a').text();
    item.price = $(el).find('div:nth-child(4) span').text();
    item.registration_date = $(el).find('ul li:first-child').html();
    item.mileage = $(el).find('ul li:nth-child(2)').html();
    item.power = $(el).find('ul li:last-child').html();
    items.push(item);
  });
  return items;
};

scrapeTruckItem(initialurl);

const allTruckItem = async () => {
  let url = initialurl;
  let currentPage = 1;
  let truckitems = [];
  while (currentPage <= 13) {
    console.log(url);
    let items = await scrapeTruckItem(url);
    truckitems = truckitems.concat(items);
    url = await getNextPageUrl(url);
    currentPage++;
  }
  console.log(truckitems.length);
  console.log(truckitems);
};
allTruckItem();
// async function scrapeData() {
//   try {
//     const { data } = await axios.get(url);
//     const $ = cheerio.load(data);
//     const listItems = $(".plainlist ul li");
//     const countries = [];
//     listItems.each((idx, el) => {
//       // Object holding data for each country/jurisdiction
//       const country = { name: "", iso3: "" };
//       // Select the text content of a and span elements
//       // Store the textcontent in the above object
//       country.name = $(el).children("a").text();
//       country.iso3 = $(el).children("span").text();
//       // Populate countries array with country data
//       countries.push(country);
//     });
//     console.dir(countries);
//     fs.writeFile("coutries.json", JSON.stringify(countries, null, 2), (err) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       console.log("Successfully written data to file");
//     });
//   } catch (err) {
//     console.error(err);
//   }
// }

// scrapeData();
