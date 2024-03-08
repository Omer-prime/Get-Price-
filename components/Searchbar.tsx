"use client"
import { scrapeandStoreProduct } from '@/app/lib/action';
import { scrapeAmazonProduct } from '@/app/lib/scrapper';
import React, { FormEvent } from 'react'
import { useState } from 'react'



const isValidAmazonProductUrl = (url:string)=>{
 try {
    const parsedURL = new  URL (url);
    const hostname = parsedURL.hostname;

    if(
        hostname.includes ('amazon.com') ||
        hostname.includes  ('amazon.') ||
        hostname.endsWith('amazon')
    )
    return true;

 } catch (error) {
    return false;
 }
 return false;
}


const Searchbar = () => {
    const  [searchPrompt ,setSearchPrompt] = useState('')
    const [isLoading, setIsLoading] = useState(false);

 const handlesubmit = async (event:FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
   const  isValidLink = isValidAmazonProductUrl(searchPrompt);
    if(!isValidLink) return alert ('Please provide a valid Amazon link')

    try {
        setIsLoading (true);
            const product = await scrapeandStoreProduct(searchPrompt);

    } catch (error) {
    }finally{
        setIsLoading(false);
    }
 }

  return (
  <>
  <form className="flex flex-wrap gap-4 mt-12"
  onSubmit={handlesubmit}
  >
    <input
    type="text"
    value={searchPrompt}
    onChange={ (e)=> setSearchPrompt(e.target.value)}
    placeholder="Enter product link"
    className="searchbar-input"/>
  <button type="submit"
   disabled={searchPrompt === ''}
  className="searchbar-btn">
   {isLoading ? 'Searching...' : 'Search'}
  </button>
  </form>
  </>
  )
}

export default Searchbar;