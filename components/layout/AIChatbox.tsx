'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send } from 'lucide-react'
import Link from 'next/link'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const SUPPORT_EMAIL = 'tereeekingview@gmail.com'
const SUPPORT_PHONE = '98713432654'

type PriceEntry = {
  keywords: string[]
  label: string
  priceUsd: number
  basics: string
}

const PRICE_LIST: PriceEntry[] = [
  {
    keywords: ['everest', 'nepal', 'ebc', 'everest base'],
    label: 'Everest Base Camp (Nepal)',
    priceUsd: 1299,
    basics: '14 days · Hard difficulty · High altitude acclimatization included.'
  },
  {
    keywords: ['annapurna', 'nepal circuit'],
    label: 'Annapurna Circuit (Nepal)',
    priceUsd: 1599,
    basics: '18 days · Hard difficulty · Teahouse lodging and permits included.'
  },
  {
    keywords: ['inca', 'machu', 'peru'],
    label: 'Inca Trail to Machu Picchu (Peru)',
    priceUsd: 899,
    basics: '4 days · Moderate difficulty · Camps, porter support, Machu Picchu entry.'
  },
  {
    keywords: ['swiss', 'switzerland', 'alps'],
    label: 'Swiss Alps Adventure (Switzerland)',
    priceUsd: 1499,
    basics: '7 days · Moderate difficulty · Mountain huts and scenic passes.'
  },
  {
    keywords: ['patagonia', 'chile', 'torres'],
    label: 'Patagonia Wilderness (Chile)',
    priceUsd: 1899,
    basics: '10 days · Hard difficulty · Torres del Paine region highlights.'
  },
  {
    keywords: ['kilimanjaro', 'tanzania', 'kili'],
    label: 'Mount Kilimanjaro (Tanzania)',
    priceUsd: 2499,
    basics: '8 days · Hard difficulty · Certified guides and summit support.'
  }
]

export default function AIChatbox() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi! I'm your trekking assistant. Ask me about treks, booking, or contact info."
    }
  ])
  const [input, setInput] = useState('')
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isOpen])

  const respond = (text: string): string => {
    const lower = text.toLowerCase()
    // Pricing intent
    if (lower.includes('price') || lower.includes('cost') || lower.includes('how much')) {
      const match = PRICE_LIST.find((p) => p.keywords.some((k) => lower.includes(k)))
      if (match) {
        return `${match.label}: $${match.priceUsd} USD. ${match.basics}\nLearn more: /treks?q=${encodeURIComponent(match.label.split('(')[0].trim())}`
      }
      return (
        'Our treks range approximately from $899 to $2499 USD depending on route and duration. '
        + 'Tell me the destination (e.g., Everest, Inca Trail, Kilimanjaro) and I\'ll give you the exact price.'
      )
    }
    if (lower.includes('contact') || lower.includes('email') || lower.includes('phone')) {
      return `You can reach us at ${SUPPORT_EMAIL} or call ${SUPPORT_PHONE}.`
    }
    if (lower.includes('book') || lower.includes('booking')) {
      return 'To book a trek, open a trek and click "View Details" to proceed.'
    }
    if (lower.includes('trek') || lower.includes('search') || lower.includes('where')) {
      return 'Try searching treks by location here: ' + '/treks'
    }
    if (lower.includes('about')) {
      return 'Learn about us on the About page: ' + '/about'
    }
    return "I'm here to help with treks, routes, prices, and contact details. Ask me anything!"
  }

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    const userMsg: ChatMessage = { id: String(Date.now()), role: 'user', content: text }
    const reply = respond(text)
    const botMsg: ChatMessage = { id: String(Date.now() + 1), role: 'assistant', content: reply }
    setMessages((prev) => [...prev, userMsg, botMsg])
    setInput('')
  }

  return (
    <div className="fixed right-4 bottom-4 z-[60]">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          aria-label="Open chat"
          onClick={() => setIsOpen(true)}
          className="rounded-full p-4 shadow-lg bg-trek-500 hover:bg-trek-600 text-white transition-colors"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[340px] h-[460px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between bg-gradient-to-r from-trek-600 to-trek-700 text-white px-4 py-3">
            <div className="font-semibold">Trek Assistant</div>
            <button aria-label="Close chat" onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={listRef} className="flex-1 p-3 space-y-2 overflow-y-auto">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`${
                    m.role === 'user'
                      ? 'bg-trek-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  } px-3 py-2 rounded-xl max-w-[80%] whitespace-pre-wrap`}
                >
                  {m.content.startsWith('/') ? (
                    <Link href={m.content} className="underline">
                      {m.content}
                    </Link>
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-2 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend()
              }}
              placeholder="Ask about treks, booking, contact..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-trek-500"
            />
            <button
              onClick={handleSend}
              className="px-3 py-2 bg-trek-500 hover:bg-trek-600 text-white rounded-lg flex items-center gap-1"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  )
}


