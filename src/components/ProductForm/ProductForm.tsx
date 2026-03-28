'use client'

import { NotifyAddToCart } from '@/components/AddToCardButton'
import { useGlobalContext } from '@/context/GlobalContext'
import { TProductDetail } from '@/data/data'
import Form from 'next/form'
import React from 'react'
import toast from 'react-hot-toast'

const ProductForm = ({
  children,
  className,
  product,
}: {
  children?: React.ReactNode
  className?: string
  product: TProductDetail
}) => {
  const { featuredImage, title, price, handle, id } = product
  const { addToCart } = useGlobalContext()

  const notifyAddTocart = (quantity: number, size: string, color: string) => {
    addToCart({
      id: id!,
      name: title!,
      handle: handle!,
      price: price!,
      quantity,
      color,
      size,
      image: featuredImage?.src || '',
    })

    toast.custom(
      (t) => (
        <NotifyAddToCart
          show={t.visible}
          imageUrl={featuredImage?.src || ''}
          quantity={quantity}
          size={size}
          color={color}
          title={title!}
          price={price!}
        />
      ),
      { position: 'top-right', id: 'nc-product-notify', duration: 4000 }
    )
  }

  const onFormSubmit = async (formData: FormData) => {
    const quantity = formData.get('quantity') ? Number(formData.get('quantity')) : 1
    const size = formData.get('size') ? String(formData.get('size')) : ''
    const color = formData.get('color') ? String(formData.get('color')) : ''

    notifyAddTocart(quantity, size, color)
  }

  return (
    <Form action={onFormSubmit} className={className}>
      {children}
    </Form>
  )
}

export default ProductForm
