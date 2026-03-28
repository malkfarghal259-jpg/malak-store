'use client'

import ProductCard from '@/components/ProductCard'
import { TProductItem, getProducts } from '@/data/data'
import { useGlobalContext } from '@/context/GlobalContext'
import ButtonPrimary from '@/shared/Button/ButtonPrimary'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const { wishlist } = useGlobalContext()
  const [products, setProducts] = useState<TProductItem[]>([])
  const [allProducts, setAllProducts] = useState<TProductItem[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts()
      setAllProducts(data)
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    const filtered = allProducts.filter((p) => wishlist.includes(p.id))
    setProducts(filtered)
  }, [wishlist, allProducts])

  return (
    <div className="flex flex-col gap-y-10 sm:gap-y-12">
      <div>
        <h1 className="text-2xl font-semibold">Wishlists</h1>
        <p className="mt-4 text-neutral-500 dark:text-neutral-400">
          Check out your wishlists. You can add or remove items from your wishlists.
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:gap-x-8 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg text-neutral-500">Your wishlist is empty</p>
        </div>
      )}

      {products.length > 0 && (
        <div className="flex items-center justify-center pt-10">
          <ButtonPrimary>Show me more</ButtonPrimary>
        </div>
      )}
    </div>
  )
}

export default Page
