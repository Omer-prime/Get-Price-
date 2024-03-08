import React from 'react'
import Image from 'next/image'
import Searchbar from '@/components/Searchbar';
import Hero from '@/components/Hero';
import { getAllProducts } from './lib/action';
import ProductCard from '@/components/ProductCard';

const Home = async() => {
  const allProducts = await getAllProducts();
  return (
    <>
      <section className="px-6 md:px-20 py-24 border-2 ">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shoping start's Here...
              <Image src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>
            <h1 className="head-text">
              Harness The Potential of <span></span>
              <span className="text-primary">
                Get Price</span>
            </h1>
            <p className="mt-6">
              Unlock the potential of robust self-service product and growth analytics, empowering you to seamlessly convert,
               engage, and retain your audience with unprecedented effectiveness.
            </p>
            <Searchbar/>
          </div>
          <Hero/>
        </div>
      </section>
      <section className="trending-section">
        <h2 className="section-text">
          Trending
        </h2>
        <div className="flex flex-wrap gap-x-6 gap-y-16">
      {allProducts?.map((product)=>(
       <ProductCard key={product._id} product={product} />
      ))}
        </div>
      </section>
    </>
  )
}

export default Home;