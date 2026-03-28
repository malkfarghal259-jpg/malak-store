'use client'

import NcInputNumber from '@/components/NcInputNumber'
import Prices from '@/components/Prices'
import { useGlobalContext } from '@/context/GlobalContext'
import Breadcrumb from '@/shared/Breadcrumb'
import ButtonPrimary from '@/shared/Button/ButtonPrimary'
import { Field, Label } from '@/shared/fieldset'
import { Input } from '@/shared/input'
import { Link } from '@/shared/link'
import { Coordinate01Icon, PaintBucketIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Image from 'next/image'
import Information from './Information'
import React from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const CheckoutPage = () => {
  const { cart, cartSubtotal, updateCartQuantity, removeFromCart, clearCart, addOrder } = useGlobalContext()
  const router = useRouter()

  const shipping = 5.0
  const tax = cartSubtotal * 0.1
  const total = cartSubtotal + shipping + tax

  const handleConfirmOrder = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    const newOrder = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: 'Processing',
      items: [...cart],
      subtotal: cartSubtotal,
      shipping,
      tax,
      total,
    }

    addOrder(newOrder)
    clearCart()
    toast.success('Order placed successfully!')
    router.push('/orders') // Redirect to orders page or a success page
  }

  const renderProduct = (product: any) => {
    const { image, price, name, handle, id, size, color, quantity } = product

    return (
      <div key={`${id}-${color}-${size}`} className="relative flex py-8 first:pt-0 last:pb-0 sm:py-10 xl:py-12">
        <div className="relative h-36 w-24 shrink-0 overflow-hidden rounded-xl bg-neutral-100 sm:w-32 dark:bg-neutral-800">
          {image && (
            <Image
              fill
              src={image}
              alt={name}
              sizes="300px"
              className="object-contain object-center"
              priority
            />
          )}
          <Link href={'/products/' + handle} className="absolute inset-0"></Link>
        </div>

        <div className="ml-3 flex flex-1 flex-col sm:ml-6">
          <div>
            <div className="flex justify-between">
              <div className="flex-[1.5]">
                <h3 className="text-base font-semibold">
                  <Link href={'/products/' + handle}>{name}</Link>
                </h3>
                <div className="mt-1.5 flex text-sm text-neutral-600 sm:mt-2.5 dark:text-neutral-300">
                  {color && (
                    <div className="flex items-center gap-x-2">
                      <HugeiconsIcon icon={PaintBucketIcon} size={16} color="currentColor" strokeWidth={1.5} />
                      <span>{color}</span>
                    </div>
                  )}
                  {color && size && <span className="mx-4 border-l border-neutral-200 dark:border-neutral-700"></span>}
                  {size && (
                    <div className="flex items-center gap-x-2">
                      <HugeiconsIcon icon={Coordinate01Icon} size={16} color="currentColor" strokeWidth={1.5} />
                      <span>{size}</span>
                    </div>
                  )}
                </div>

                <div className="relative mt-3 flex w-full justify-between sm:hidden">
                  <select
                    name="qty"
                    id="qty"
                    value={quantity}
                    onChange={(e) => updateCartQuantity(id, Number(e.target.value), color, size)}
                    className="form-select relative z-10 rounded-md bg-white px-2 py-1 text-xs outline-1 outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-neutral-800"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <Prices contentClass="py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full" price={price || 0} />
                </div>
              </div>

              <div className="hidden flex-1 justify-end sm:flex">
                <Prices price={price || 0} className="mt-0.5" />
              </div>
            </div>
          </div>

          <div className="mt-auto flex items-end justify-between pt-4 text-sm">
            <div className="hidden sm:block">
              <NcInputNumber 
                defaultValue={quantity} 
                onChange={(value) => updateCartQuantity(id, value, color, size)}
                className="relative z-10" 
              />
            </div>

            <button
              onClick={() => removeFromCart(id, color, size)}
              className="relative z-10 mt-3 flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="container py-16 lg:pt-20 lg:pb-28">
      <div className="mb-16">
        <h1 className="mb-5 block text-3xl font-semibold lg:text-4xl">Checkout</h1>
        <Breadcrumb
          breadcrumbs={[
            { id: 1, name: 'Home', href: '/' },
            { id: 2, name: 'Cart', href: '/cart' },
          ]}
          currentPage="Checkout"
        />
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="flex-1">
          <Information />
        </div>

        <div className="my-10 shrink-0 border-t lg:mx-10 lg:my-0 lg:border-t-0 lg:border-l xl:lg:mx-14 2xl:mx-16 dark:border-neutral-700" />

        <div className="w-full lg:w-[36%]">
          <h3 className="text-lg font-semibold">Order summary</h3>
          <div className="mt-8 divide-y divide-neutral-200/70 dark:divide-neutral-700">
            {cart.map(renderProduct)}
            {cart.length === 0 && (
              <div className="py-10 text-center text-neutral-500">
                Your cart is empty
              </div>
            )}
          </div>

          <div className="mt-10 border-t border-neutral-200/70 pt-6 text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
            <div className="mt-4 flex justify-between py-2.5">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-200">
                ${cartSubtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between py-2.5">
              <span>Shipping estimate</span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-200">
                ${shipping.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between py-2.5">
              <span>Tax estimate</span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-200">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-4 text-base font-semibold text-neutral-900 dark:text-neutral-200">
              <span>Order total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <ButtonPrimary 
            className="mt-8 w-full" 
            onClick={handleConfirmOrder}
            disabled={cart.length === 0}
          >
            Confirm order
          </ButtonPrimary>
        </div>
      </div>
    </main>
  )
}

export default CheckoutPage
