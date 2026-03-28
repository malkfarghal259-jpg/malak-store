'use client'

import avatar from '@/images/users/avatar1.jpg'
import ButtonPrimary from '@/shared/Button/ButtonPrimary'
import { Field, Fieldset, Label } from '@/shared/fieldset'
import { Input, InputGroup } from '@/shared/input'
import { Select } from '@/shared/select'
import { Textarea } from '@/shared/textarea'
import {
  Calendar01Icon,
  ImageAdd02Icon,
  Mail01Icon,
  MapsLocation01Icon,
  SmartPhone01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '@/context/GlobalContext'
import toast from 'react-hot-toast'

const Page = () => {
  const { user, login, updateUser } = useGlobalContext()
  const [formData, setFormData] = useState({
    fullName: 'Enrico Cole',
    email: 'example@email.com',
    dob: '1990-07-22',
    address: 'New york, USA',
    gender: 'Male',
    phone: '003 888 232',
    about: '...'
  })

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.firstName + ' ' + user.lastName,
        email: user.email,
        dob: '1990-07-22',
        address: user.address,
        gender: 'Male',
        phone: user.phone,
        about: '...'
      })
    }
  }, [user])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    const data = new FormData(target)
    
    const fullName = data.get('full-name') as string
    const [firstName, ...lastNameParts] = fullName.split(' ')
    const lastName = lastNameParts.join(' ')

    const updatedUser = {
      firstName,
      lastName,
      email: data.get('email') as string,
      phone: data.get('phone-number') as string,
      address: data.get('address') as string,
    }

    if (!user) {
      login({ id: 'user-1', ...updatedUser })
    } else {
      updateUser(updatedUser)
    }

    toast.success('Account updated successfully!')
  }

  return (
    <div className="flex flex-col gap-y-10 sm:gap-y-12">
      {/* HEADING */}
      <h1 className="text-2xl font-semibold sm:text-3xl">Account infomation</h1>

      <form onSubmit={handleSubmit}>
        <Fieldset className="flex flex-col md:flex-row">
          <div className="flex shrink-0 items-start">
            {/* AVATAR */}
            <div className="relative flex overflow-hidden rounded-full">
              <Image
                src={avatar}
                alt={'avatar'}
                width={avatar.width}
                height={avatar.height}
                sizes="132px"
                priority
                className="z-0 size-32 rounded-full object-cover"
              />
              <div className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black/60 text-neutral-50">
                <HugeiconsIcon icon={ImageAdd02Icon} size={30} color="currentColor" strokeWidth={1.5} />
                <span className="mt-1 text-xs">Change Image</span>
              </div>
              <input type="file" name="avatar" className="absolute inset-0 cursor-pointer opacity-0" />
            </div>
          </div>
          <div className="mt-10 max-w-3xl grow space-y-7 md:mt-0 md:pl-16">
            <Field>
              <Label>Full name</Label>
              <Input name="full-name" defaultValue={formData.fullName} />
            </Field>

            {/* ---- */}
            <Field>
              <Label>Email</Label>
              <InputGroup>
                <HugeiconsIcon data-slot="icon" icon={Mail01Icon} size={16} />
                <Input name="email" type="email" placeholder="example@email.com" defaultValue={formData.email} />
              </InputGroup>
            </Field>

            {/* ---- */}
            <Field className="max-w-lg">
              <Label>Date of birth</Label>
              <InputGroup>
                <HugeiconsIcon data-slot="icon" icon={Calendar01Icon} size={16} />
                <Input name="date-of-birth" type="date" defaultValue={formData.dob} />
              </InputGroup>
            </Field>
            {/* ---- */}
            <Field>
              <Label>Address</Label>
              <InputGroup>
                <HugeiconsIcon data-slot="icon" icon={MapsLocation01Icon} size={16} />
                <Input name="address" defaultValue={formData.address} />
              </InputGroup>
            </Field>

            {/* ---- */}
            <Field>
              <Label>Gender</Label>
              <Select name="gender" defaultValue={formData.gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </Field>

            {/* ---- */}
            <Field>
              <Label>Phone number</Label>
              <InputGroup>
                <HugeiconsIcon data-slot="icon" icon={SmartPhone01Icon} size={16} />
                <Input name="phone-number" defaultValue={formData.phone} />
              </InputGroup>
            </Field>
            {/* ---- */}
            <Field>
              <Label>About you</Label>
              <Textarea rows={4} name="about-you" defaultValue={formData.about} />
            </Field>
            <div className="pt-2">
              <ButtonPrimary type="submit">Update account</ButtonPrimary>
            </div>
          </div>
        </Fieldset>
      </form>
    </div>
  )
}

export default Page
