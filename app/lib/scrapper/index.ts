import axios from "axios";
import * as cheerio from "cheerio"
import { extractCurrency, extractDescription, extractPrice } from "../utils";

 export async function scrapeAmazonProduct(url:string) {
    if(!url) return;
    const username = String(process.env.BRIGH_DATA_USERNAME)
    const password = String(process.env.BRIGHT_DATA_PASSWORD)
   const port = 22225
   const session_id = (1000000 * Math.random()) | 0
   const options = {
    auth:{
        username : `${username}-session-${session_id}`,
        password,
    },
    host:'brd.superproxy.io',
    port,
    rejectUnauthorized:false,
   }
   try {
    const response = await axios.get(url,options);
    const $ = cheerio.load(response.data);
    const title = $('#productTitle').text().trim();
   const currentPrice = extractPrice(
      $('.priceTopay span.a-price-whole'),
      $('a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base'),
      $(' .a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay '),
      $('  span.a-offscreen '),
      );
      const orignalPrice = extractPrice(
         $('#priceblock_ourprice'),
         $('.a-price.a-text-price span.a-offscreen '),
         $('#listPrice'),
         $('#priceblock_dealprice'),
         $('a.size.base.a-color-price'),
      )
      const outofStock = $('#availabilty span').text().trim().toLowerCase() === 'currently unavailable';
      const images = 
         $('#imgBlkFront').attr('data-a-dynamic-image') ||
         $('#landingImage').attr('data-a-dynamic-image') ||
         "{}"
      const imageUrls = Object.keys(JSON.parse(images));
      const currency =extractCurrency($('.a-price-symbol'));
      const discountRate = $('.savingsPercentage').text().replace(/[-%]/g,"" );
      const description = extractDescription($)
      const data = {
         url,
         currency: currency || "$",
         imageUrls: imageUrls [0],
         title,
         currentPrice: Number(currentPrice) || Number(orignalPrice),
         orignalPrice: Number(orignalPrice) || Number(currentPrice),
         priceHistory: [],
         discountRate: Number(discountRate),
         reviewsCount: 100,
         stars: 4.5,
         category: 'category',
         isoutofStock: outofStock,
         description,
         lowestPrice: Number(currentPrice) || Number(orignalPrice),
         highestPrice: Number(orignalPrice) || Number(currentPrice),
         average: Number(currentPrice) || Number(orignalPrice)
      }
    return data;
   } catch (error:any) {
    throw new Error (`Failed to load Product: ${error.message}`)
   }

 }