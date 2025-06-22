"use client"

import { useChat } from "ai/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StarsIcon, Send, MapPin, MessageCircle, AlertTriangle } from "lucide-react"
import { useEffect, useRef } from "react"
import TherapyFinder from "@/components/therapy-finder"
import CrisisSupport from "@/components/crisis-support"

export default function EmotionalSupportBot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: "Hi, I'm here to listen and help. How are you feeling today? 💙",
      },
    ],
  })

  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <StarsIcon className="w-8 h-8 text-blue-500" />
            Lumen AI
          </h1>
          <p className="text-gray-600">Your compassionate mental health support companion</p>
        </div>

        {/* Crisis Alert Banner */}
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-red-700 font-medium">In Crisis? Get Help Now</p>
                  <p className="text-red-600 text-sm">Call 988 or text HOME to 741741</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => window.open("tel:988", "_self")}
                  size="sm"
                  className="bg-red-600 hover:bg-red-700"
                >
                  Call 988
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Chat Support
            </TabsTrigger>
            <TabsTrigger value="crisis" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Crisis Support
            </TabsTrigger>
            <TabsTrigger value="finder" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Find Therapists
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <div className="flex justify-center">
              <Card className="w-full max-w-2xl shadow-xl border-0 bg-white/95 backdrop-blur">
                <CardHeader className="text-center border-b bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg bg-yellow-300">
                  <CardTitle className="flex items-center justify-center gap-2 text-xl">
                    <StarsIcon className="w-6 h-6 fill-current" />
                    Lumen AI
                  </CardTitle>
                  <p className="text-blue-100 text-sm">
                    I am Lumen and I am here to help with whatever problems you have. I am here to listen and provide
                    help.
                  </p>
                </CardHeader>

                <CardContent className="p-0">
                  <ScrollArea className="h-96 p-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                              message.role === "user"
                                ? "bg-blue-500 text-white rounded-br-md"
                                : "bg-gray-100 text-gray-800 rounded-bl-md"
                            }`}
                          >
                            <div className="text-sm font-medium mb-1">
                              {message.role === "user" ? "You" : "Lumen AI"}
                            </div>
                            <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
                          </div>
                        </div>
                      ))}

                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 max-w-[80%]">
                            <div className="text-sm font-medium mb-1">Lumen AI</div>
                            <div className="flex items-center space-x-1">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div
                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                ></div>
                                <div
                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500 ml-2">Typing...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  <div className="border-t bg-gray-50 p-4">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                      <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Share what's on your mind..."
                        className="flex-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                        disabled={isLoading}
                      />
                      <Button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      This is for emotional support only. For crisis situations, please contact emergency services.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="crisis">
            <CrisisSupport />
          </TabsContent>

          <TabsContent value="finder">
            <TherapyFinder />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
