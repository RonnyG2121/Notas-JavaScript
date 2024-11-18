import fs from 'fs/promises';
import puppeteer from 'puppeteer';




const navegatorPages = (html) => {
    let browser;
    let page;

    return puppeteer.launch()
        .then((browserInstance) => {
            browser = browserInstance;
            return browser.newPage();
        })
        .then((pageInstance) => {
            page = pageInstance;
            return page.setContent(html);
        })
        .then(() => {
            return page.evaluate(() => {
                const productsElements = document.querySelectorAll('div.a-section.octopus-pc-asin-info-section');
                // console.log(productsElements);

                const arr_productData = [];

                productsElements.forEach((element) => {
                    const priceWhole = element.querySelector('.a-price-whole');
                    const priceDecimal = element.querySelector('.a-price-fraction');
                    const price = `${priceWhole.textContent}${priceDecimal.textContent}`;
                    const titleElement = element.querySelector('.a-section.octopus-pc-asin-title');

                    arr_productData.push({
                        price: price,
                        description: titleElement.textContent.trim()});
                    // console.log(price, titleElement.textContent);
                });
                // console.log(arr_productData);
                return arr_productData;
            });
        })
        .then((productsData) => {
            console.log(productsData);
            return productsData;
        })
        .catch((error) => {
            console.log(error);
            return null; // Devolvemos null en caso de error
        })
        .finally(() => {
            if (browser) {
                browser.close();
            }
        });
}




/* const navegatorPages = async (html) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setContent(html)

    const productsData = await page.evaluate(() => {
        const productsElements = document.querySelectorAll('div.a-section.octopus-pc-asin-info-section')

        console.log(productsElements)
        const arr_productsData = []

        productsElements.forEach(productElement => {
            const priceWhole = productElement.querySelector('.a-price-whole');
            const priceDecimal = productElement.querySelector('.a-price-fraction')
            const price = `${priceWhole.textContent}${priceDecimal.textContent}`
            const titleElement = productElement.querySelector('.a-section.octopus-pc-asin-title')

            console.log(price, titleElement.textContent)

            arr_productsData.push({
                price: price,
                description: titleElement.textContent.trim() // 'asasd'
            })
        })

        return arr_productsData
    })

    await browser.close();
    console.log(productsData);

}
 */


const crearArchivo = (data) => {
    fs.writeFile("scraping.html", data)

        .then((res) => {
            console.log(`Archivo creado con éxito. ${res}`);
        })

        .catch((error) => {
            console.log(error);
        })
}


const webScrapingScraper = () => {

    const APIKEY = process.env.API_KEY_SCRAPER_API;
    const URL = "https://www.amazon.com/-/es/Laptops/b?ie=UTF8&node=565108";

    fetch(`https://api.scraperapi.com/?api_key=${APIKEY}&url=${URL}&render=true`)
        .then((response) => {
            // console.log(response)
            return response.ok === true ? response.text() : Promise.reject(response);
        })

        .then((data) => {
            crearArchivo(data);
            navegatorPages(data);
            // console.log(data)
        })
        .catch((error) => {
            console.log(error)
        });

}

let webScraping = webScrapingScraper();