'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { ChevronLeft, Info, Wheat, MapPin, Star } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function FarmLandListing() {
  const [rentalModel, setRentalModel] = useState('lease')
  const [rentalDuration, setRentalDuration] = useState('1')
  const [cropSharePercentage, setCropSharePercentage] = useState(50)
  const [flexRentBase, setFlexRentBase] = useState(200)
  const [flexRentBonus, setFlexRentBonus] = useState(20)

  const averageMarketPrices = {
    lease: { '1': 300, '3': 280, '5': 260 },
    cropShare: 50,
    flexRent: { base: 220, bonus: 25 }
  }

  const calculateTotalPrice = () => {
    switch (rentalModel) {
      case 'lease':
        return 250 * parseInt(rentalDuration) * 200 // $250 per acre per year, 200 acres
      case 'cropShare':
        return `${cropSharePercentage}% of crop yield`
      case 'flexRent':
        return `$${flexRentBase * 200} base + ${flexRentBonus}% of profits above threshold`
      default:
        return 0
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="flex items-center justify-between p-4 bg-white border-b">
        <Button variant="ghost" size="icon">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-semibold">Farm Land Listing</h1>
        <div className="w-6" />
      </header>
      <main className="flex-1 overflow-auto p-4">
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>200-Acre Prime Agricultural Land</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <img
                  alt="Aerial view of farmland"
                  className="absolute inset-0 w-full h-full object-cover"
                  height="300"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "16/9",
                    objectFit: "cover",
                  }}
                  width="400"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Wheat className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Prime Agricultural Land</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-red-500" />
                <span>Heartland County, Midwest State</span>
              </div>
              <Separator />
              <div>
                <h2 className="font-semibold mb-2">Description</h2>
                <p className="text-sm text-gray-600">
                  Exceptional 200-acre farm with rich, fertile soil perfect for row crops. 
                  Gentle rolling hills with excellent drainage. Irrigation system in place. 
                  Easy access to major highways for convenient transport of goods.
                </p>
              </div>
              <Separator />
              <div>
                <h2 className="font-semibold mb-2">Land Features</h2>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Soil Type: Deep, well-drained loam</li>
                  <li>Topography: Gently rolling</li>
                  <li>Water Source: On-site well and creek</li>
                  <li>Previous Crops: Corn, soybeans, wheat rotation</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Rental Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup onValueChange={setRentalModel} defaultValue={rentalModel}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lease" id="lease" />
                  <Label htmlFor="lease">Traditional Lease</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cropShare" id="cropShare" />
                  <Label htmlFor="cropShare">Crop Share</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="flexRent" id="flexRent" />
                  <Label htmlFor="flexRent">Flex Rent</Label>
                </div>
              </RadioGroup>

              {rentalModel === 'lease' && (
                <div>
                  <Label htmlFor="lease-duration">Lease Duration (Years)</Label>
                  <Select onValueChange={setRentalDuration} defaultValue={rentalDuration}>
                    <SelectTrigger id="lease-duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Year</SelectItem>
                      <SelectItem value="3">3 Years</SelectItem>
                      <SelectItem value="5">5 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {rentalModel === 'cropShare' && (
                <div className="space-y-2">
                  <Label>Crop Share Percentage</Label>
                  <Slider
                    min={10}
                    max={90}
                    step={5}
                    value={[cropSharePercentage]}
                    onValueChange={(value) => setCropSharePercentage(value[0])}
                  />
                  <div className="text-sm text-gray-600">Landowner Share: {cropSharePercentage}%</div>
                </div>
              )}

              {rentalModel === 'flexRent' && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="base-rent">Base Rent (per acre)</Label>
                    <Input
                      id="base-rent"
                      type="number"
                      value={flexRentBase}
                      onChange={(e) => setFlexRentBase(parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bonus-percentage">Bonus Percentage</Label>
                    <Input
                      id="bonus-percentage"
                      type="number"
                      value={flexRentBonus}
                      onChange={(e) => setFlexRentBonus(parseInt(e.target.value))}
                    />
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-start space-x-2">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-semibold">Average Market Rates</p>
                  {rentalModel === 'lease' && <p>${averageMarketPrices.lease[rentalDuration]}/acre/year for {rentalDuration} year(s)</p>}
                  {rentalModel === 'cropShare' && <p>{averageMarketPrices.cropShare}% crop share for landowner</p>}
                  {rentalModel === 'flexRent' && (
                    <p>${averageMarketPrices.flexRent.base}/acre base + {averageMarketPrices.flexRent.bonus}% bonus</p>
                  )}
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span>Total Price:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-lg">{calculateTotalPrice()}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Price based on selected rental model</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <Button className="w-full">Proceed to Application</Button>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <h3 className="font-semibold mb-2">Landowner Information</h3>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage alt="Sarah Fields" src="/placeholder-avatar.jpg" />
                    <AvatarFallback>SF</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-semibold">Sarah Fields</p>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="ml-1 text-sm text-gray-500">5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}