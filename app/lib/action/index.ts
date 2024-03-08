"use server"

import { scrapeAmazonProduct } from "../scrapper"
import { connectToDB } from "../mongoose"
import Product from "../models/product.model"
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils"
import { revalidatePath } from "next/cache"

export async function scrapeandStoreProduct(productUrl:string) {
    if(!productUrl)
    return
    try {
        connectToDB()
        const scrapedproduct = await scrapeAmazonProduct(productUrl)
        if(!scrapedproduct) return;

        let product = scrapedproduct;
         
            const existingProduct = await Product.findOne({url:scrapedproduct.url});
             if(existingProduct)
             {
                const updatedPriceHistory : any =[
                    ...existingProduct.priceHistory,
                    {price: scrapedproduct.currentPrice}
                ]
                    product={
                        ...scrapedproduct,
                        priceHistory: updatedPriceHistory,
                        lowestPrice: getLowestPrice(updatedPriceHistory),
                        highestPrice: getHighestPrice(updatedPriceHistory),
                        averagePrice: getAveragePrice(updatedPriceHistory)
                    }
             }
             const newProduct =  await Product.findOne(
                {url:scrapedproduct.url},
                product,
                {upsert: true, new:true}          
                );
                revalidatePath(`/products/${newProduct._id}`);

    } catch (error:any) {
        throw new Error(`Failed to create/update product:${error.message}`)
    }
}

export  async function getProductById(productId:string)  {
    try {
        connectToDB();

        const product = await Product.findOne({_id: productId});

        if(!product) return null;
        return product;
    } catch (error) {
        console.log(error)
    }
}

export async function getAllProducts() {
    try {
        connectToDB();
        const products = await Product.find();
        return products;
    } catch (error) {
        console.log(error)
    }
}