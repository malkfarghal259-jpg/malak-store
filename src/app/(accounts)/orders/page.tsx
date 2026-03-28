'use client'

import { Link } from '@/components/Link'
import Prices from '@/components/Prices'
import { useGlobalContext } from '@/context/GlobalContext'
import { Button } from '@/shared/Button/Button'
import Image from 'next/image'
import React from 'react'

const OrderItem = ({ order }: { order: any }) => {
  return (
    <div className="z-0 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
      <div className="flex flex-col bg-neutral-50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:bg-neutral-500/5">
        <div>
          <h3 className="text-lg font-semibold">
            Order #{order.id}
          </h3>
          <p className="mt-1.5 text-sm text-neutral-500 sm:mt-2 dark:text-neutral-400">{order.date} · {order.status}</p>
        </div>
        <div className="mt-3 flex gap-x-1.5 sm:mt-0">
          <Button color="light" size="smaller" href={'/collections/all'}>
            Buy again
          </Button>
        </div>
      </div>
      <div className="divide-y-neutral-200 divide-y border-t border-neutral-200 p-2 sm:p-8 dark:divide-neutral-700 dark:border-neutral-700">
        {order?.items?.map(({ id, image, price, handle, name, color, size, quantity }: any) => (
          <div key={`${id}-${color}-${size}`} className="flex py-4 first:pt-0 last:pb-0 sm:py-7">
            <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 sm:w-20">
              <Image
                fill
                sizes="100px"
                src={image}
                alt={name}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between">
                  <div>
                    <h3 className="line-clamp-1 text-base font-medium">{name}</h3>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                      <span>{color}</span>
                      {color && size && <span className="mx-2 h-4 border-l border-neutral-200 dark:border-neutral-700"></span>}
                      <span>{size}</span>
                    </p>
                  </div>
                  <Prices className="mt-0.5 ml-2" price={price || 0} />
                </div>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <p className="flex items-center text-neutral-500 dark:text-neutral-400">
                  <span className="hidden sm:inline-block">Qty</span>
                  <span className="inline-block sm:hidden">x</span>
                  <span className="ml-2">{quantity}</span>
                </p>

                <div className="flex">
                  <Link href={'/products/' + handle} className="font-medium text-primary-600 dark:text-primary-500">
                    View product
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-neutral-200 p-4 sm:px-8 dark:border-neutral-700">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-neutral-500 dark:text-neutral-400">Total amount</span>
          <span className="text-neutral-900 dark:text-neutral-200">${order.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

const Page = () => {
  const { orders } = useGlobalContext()

  return (
    <div className="flex flex-col gap-y-10 sm:gap-y-12">
      {/* HEADING */}
      <div>
        <h1 className="text-2xl font-semibold">Order history</h1>
        <p className="mt-4 text-neutral-500 dark:text-neutral-400">
          Check the status of recent orders, manage returns, and discover similar products.
        </p>
      </div>
      {orders.length > 0 ? (
        orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-neutral-500">No orders found yet.</p>
        </div>
      )}
    </div>
  )
}

export default Page
