'use client'

import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Bot, Send, Tractor, Wheat, Sun, CloudRain, Sprout, Leaf, Zap } from "lucide-react"

export function FarmBotChat() {
  const [messages, setMessages] = useState([
    { type: 'bot', content: "Hello! I'm FarmBot, your AI assistant for all things farming. How can I help you today?" },
  ])
  const [input, setInput] = useState('')

  const suggestions = [
    { text: "Rent a tractor", icon: <Tractor className="h-4 w-4" /> },
    { text: "Best crops for summer", icon: <Sun className="h-4 w-4" /> },
    { text: "Organic fertilizers", icon: <Leaf className="h-4 w-4" /> },
    { text: "Water conservation tips", icon: <CloudRain className="h-4 w-4" /> },
    { text: "Pest control methods", icon: <Zap className="h-4 w-4" /> },
    { text: "Soil health analysis", icon: <Sprout className="h-4 w-4" /> },
  ]

  const handleSend = (message = input) => {
    if (message.trim()) {
      setMessages([...messages, { type: 'user', content: message }])
      setInput('')
      // Simulate bot response
      setTimeout(() => {
        let botResponse: { type: string; content: string; card?: string; m?: any; here?: any; to?: any; help?: any; with?: any; farming?: any; questions?: any; ""?: any; free?: any; ask?: any; about?: any; rentals?: any; products?: any; or?: any; crop?: any; recommendations?: any; " }"?: any }
        if (message.toLowerCase().includes('rental') || message.toLowerCase().includes('rent')) {
          botResponse = { type: 'bot', content: 'Here are some rental options for farm equipment:', card: 'rental' }
        } else if (message.toLowerCase().includes('product') || message.toLowerCase().includes('fertilizer')) {
          botResponse = { type: 'bot', content: 'I recommend these products for your farm:', card: 'products' }
        } else if (message.toLowerCase().includes('crop') || message.toLowerCase().includes('summer')) {
          botResponse = { type: 'bot', content: 'Based on your location and climate, here are suitable crops:', card: 'crops' }
        } else {
          botResponse = { type: 'bot', content: 'I'm here to help with any farming questions. Feel free to ask about rentals, products, or crop recommendations!' }
        }
        setMessages(prev => [...prev, botResponse])
      }, 1000)
    }
  }

  const renderCard = (type) => {
    switch (type) {
      case 'rental':
        return (
          <Card className="w-full max-w-sm mx-auto mt-4">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Equipment Rental Options</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Tractor className="mr-2 h-5 w-5 text-green-600" />
                    <span>Tractor</span>
                  </div>
                  <span className="font-medium">$100/day</span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Wheat className="mr-2 h-5 w-5 text-amber-600" />
                    <span>Harvester</span>
                  </div>
                  <span className="font-medium">$150/day</span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CloudRain className="mr-2 h-5 w-5 text-blue-600" />
                    <span>Irrigation System</span>
                  </div>
                  <span className="font-medium">$75/day</span>
                </li>
              </ul>
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">Book Equipment</Button>
            </CardContent>
          </Card>
        )
      case 'products':
        return (
          <Card className="w-full max-w-sm mx-auto mt-4">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recommended Products</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <span>Organic Fertilizer</span>
                  <span className="font-medium text-green-600">$29.99</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Pest Control Solution</span>
                  <span className="font-medium text-green-600">$39.99</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Soil pH Tester</span>
                  <span className="font-medium text-green-600">$19.99</span>
                </li>
              </ul>
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">View All Products</Button>
            </CardContent>
          </Card>
        )
      case 'crops':
        return (
          <Card className="w-full max-w-sm mx-auto mt-4">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Suitable Crops</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Sun className="mr-2 h-5 w-5 text-yellow-500" />
                  <span>Corn - High yield, moderate water needs</span>
                </li>
                <li className="flex items-center">
                  <CloudRain className="mr-2 h-5 w-5 text-blue-500" />
                  <span>Rice - Ideal for wet conditions</span>
                </li>
                <li className="flex items-center">
                  <Wheat className="mr-2 h-5 w-5 text-amber-500" />
                  <span>Wheat - Drought-resistant variety</span>
                </li>
              </ul>
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">Get Detailed Guide</Button>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50">
      <header className="flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="FarmBot" />
            <AvatarFallback>FB</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-semibold text-green-700">FarmBot</h1>
        </div>
        <Button variant="outline" className="text-green-700 border-green-700 hover:bg-green-50">New Chat</Button>
      </header>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-lg p-3 max-w-[80%] ${message.type === 'user' ? 'bg-green-600 text-white' : 'bg-white shadow-md'}`}>
                <p>{message.content}</p>
                {message.card && renderCard(message.card)}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <Separator />
      <div className="p-4 bg-white">
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSend(suggestion.text)}
              className="flex items-center justify-between px-3 py-1.5 bg-gray-100 text-sm text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
              <span>{suggestion.text}</span>
              <span className="ml-2 text-gray-500">{suggestion.icon}</span>
            </button>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex space-x-2">
          <Input
            placeholder="Ask about rentals, products, or crop recommendations..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border-green-200 focus:ring-green-500 focus:border-green-500"
          />
          <Button type="submit" size="icon" className="bg-green-600 hover:bg-green-700">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  )
}