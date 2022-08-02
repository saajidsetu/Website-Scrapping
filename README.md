# Website-Scrapping
node - for running scraping cheerio - for parsing html file (https://www.npmjs.com/package/cheerio, used similarly as jquery) (note: cheerio not needed if non-html responses are used) 
Purpose: scrape the portal using provided interface. Initial url https://www.otomoto.pl/ciezarowe/uzytkowe/mercedes-benz/ od-2014/q-actros? search%5Bfilter_enum_damaged%5D=0&amp;search%5Border%5D=creat ed_at%3Adesc 
Add getNextPageUrl function to iterate over pages Add addItems function that fetches item urls + item ids (unique ids 3. 4. 5. 6. 7. 1. 2. 3. 4. that the portal uses) from list page
Add getTotalAdsCount function - shows how many total ads exist for the provided initial url Add scrapeTruckItem function - that scrapes the actual ads and parses into the format: item id, title, price, registration date, production date, mileage, power Scrape all pages, all ads
