'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AutocompleteSection() {
  return (
    <div className="flex flex-col space-y-4 rounded-md border border-gray-100 p-8 shadow-md [&_h2]:mt-0">
      <div className="space-y-4">
        <h2>Shipping</h2>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="shipping-street">Street</Label>
          <Input
            id="shipping-street"
            name="shipping-street"
            autoComplete="section-shipping street-address"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="shipping-city">City</Label>
          <Input
            id="shipping-city"
            name="shipping-city"
            autoComplete="section-shipping address-level2"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2>Billing</h2>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="billing-street">Street</Label>
          <Input
            id="billing-street"
            name="billing-street"
            autoComplete="section-billing street-address"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="billing-city">City</Label>
          <Input
            id="billing-city"
            name="billing-city"
            autoComplete="section-billing address-level2"
          />
        </div>
      </div>
    </div>
  )
}
