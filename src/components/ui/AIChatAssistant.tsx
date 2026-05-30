import { useState, useRef, useEffect } from 'react'
import type { ReactElement, KeyboardEvent } from 'react'
import { Send, X, Sparkles } from 'lucide-react'
import { useTranslation } from '../../hooks/useTranslation'
import '../../styles/chat.css'

interface Message {
  role:    'user' | 'assistant'
  content: string
}

export default function AIChatAssistant(): ReactElement {
  const { t }    = useTranslation()
  const chat     = t.chat

  const [open,      setOpen]      = useState(false)
  const [messages,  setMessages]  = useState<Message[]>([])
  const [input,     setInput]     = useState('')
  const [loading,   setLoading]   = useState(false)
  const [showBadge, setShowBadge] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLTextAreaElement>(null)

  // Update welcome message when language changes
  useEffect(() => {
    setMessages([{ role: 'assistant', content: chat.welcome }])
  }, [chat.welcome])

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Focus input on open
  useEffect(() => {
    if (open) {
      setShowBadge(false)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  const send = async (text: string): Promise<void> => {
    const msg = text.trim()
    if (!msg || loading) return

    const userMsg: Message      = { role: 'user', content: msg }
    const newMessages: Message[] = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role:    m.role,
            content: m.content,
          })),
        }),
      })
      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.content ?? 'Sorry, something went wrong.' },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Connection error. Email abate.shallo@gmail.com 📧' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  return (
    <>
      {/* Chat Panel */}
      <div className={`chat-panel${open ? ' open' : ''}`} role="dialog">

        {/* Header */}
        <div className="chat-head">
          <div className="chat-head-avatar">🤖</div>
          <div className="chat-head-info">
            <div className="chat-head-name">{chat.title}</div>
            <div className="chat-head-status">
              <span className="chat-status-dot" />
              {chat.status}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            style={{ background:'none', border:'none', color:'var(--muted)', cursor:'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick suggestions */}
        {messages.length <= 1 && (
          <div className="chat-suggestions">
            {chat.suggestions.map((s) => (
              <button
                key={s}
                type="button"
                className="chat-suggestion"
                onClick={() => send(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.role === 'user' ? 'user' : 'ai'}`}>
              <div className="chat-msg-avatar">
                {msg.role === 'assistant' ? '🤖' : '👤'}
              </div>
              <div className="chat-msg-text">{msg.content}</div>
            </div>
          ))}

          {loading && (
            <div className="chat-msg ai">
              <div className="chat-msg-avatar">🤖</div>
              <div className="chat-typing">
                <span /><span /><span />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="chat-input-wrap">
          <textarea
            ref={inputRef}
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder={chat.placeholder}
            rows={1}
            disabled={loading}
          />
          <button
            type="button"
            className="chat-send"
            onClick={() => send(input)}
            disabled={!input.trim() || loading}
          >
            <Send size={15} />
          </button>
        </div>

      </div>

      {/* Floating Bubble */}
      <button
        type="button"
        className={`chat-bubble${open ? ' open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI chat"
      >
        {showBadge && <span className="chat-badge">1</span>}
        {open ? <X size={20} /> : <Sparkles size={20} />}
      </button>
    </>
  )
}