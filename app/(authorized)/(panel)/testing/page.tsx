"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, MessageSquare, Send } from "lucide-react"

export default function WhatsAppTester() {
  const [phoneNumber, setPhoneNumber] = useState("919717434098")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const sendTestMessage = async () => {
    setIsLoading(true)
    setError(null)
    setResponse(null)

    try {
      const result = await fetch("/api/send-whatsapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: phoneNumber,
        }),
      })

      const data = await result.json()

      if (!result.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      setResponse(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">WhatsApp Business API Tester</h1>
          <p className="text-gray-600">Test your WhatsApp Business API integration</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-green-600" />
              Send Test Message
            </CardTitle>
            <CardDescription>
              Send a &quot;hello_world&quot; template message to test your WhatsApp Business API setup
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (with country code)</Label>
              <Input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="919717434098"
                className="font-mono"
              />
              <p className="text-sm text-gray-500">
                Format: Country code + phone number (e.g., 919717434098 for India)
              </p>
            </div>

            <Button onClick={sendTestMessage} disabled={isLoading || !phoneNumber} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Test Message
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )} */}

        {response && (
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Success!</CardTitle>
              <CardDescription>Message sent successfully</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
                {JSON.stringify(response, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>Phone Number ID:</strong>
                <p className="font-mono text-gray-600">620343271160882</p>
              </div>
              <div>
                <strong>Template:</strong>
                <p className="font-mono text-gray-600">hello_world</p>
              </div>
              <div>
                <strong>Language:</strong>
                <p className="font-mono text-gray-600">en_US</p>
              </div>
              <div>
                <strong>API Version:</strong>
                <p className="font-mono text-gray-600">v22.0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
