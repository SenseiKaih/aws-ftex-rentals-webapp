'use client'

import { useState } from 'react'
import { Tractor, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function OtpConfirmation() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [showOtpSection, setShowOtpSection] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Please enter a valid phone number')
      return
    }
    setIsLoading(true)
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false)
      setShowOtpSection(true)
    }, 2000)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    
    // Move to next input if current field is filled
    if (value !== '' && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement
      if (nextInput) nextInput.focus()
    }
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (otp.some(digit => digit === '')) {
      setError('Please enter the complete OTP')
      return
    }
    setIsLoading(true)
    // Simulate API call to verify OTP
    setTimeout(() => {
      setIsLoading(false)
      alert('OTP verified successfully!')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Tractor className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Farmtex</CardTitle>
          <CardDescription className="text-center">
            Verify your phone number to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={showOtpSection || isLoading}
              />
            </div>
            {!showOtpSection && (
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP
                  </>
                ) : (
                  'Get OTP'
                )}
              </Button>
            )}
          </form>

          {showOtpSection && (
            <form onSubmit={handleOtpSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp-0">Enter OTP</Label>
                <div className="flex justify-between">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className="w-12 h-12 text-center text-lg"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      disabled={isLoading}
                    />
                  ))}
                </div>
              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying OTP
                  </>
                ) : (
                  'Verify OTP'
                )}
              </Button>
            </form>
          )}

          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </CardContent>
        <CardFooter>
          <p className="text-xs text-center w-full text-gray-600">
            By verifying your phone number, you agree to receive SMS messages from Farmtex.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}