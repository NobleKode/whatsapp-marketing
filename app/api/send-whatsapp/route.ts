import { type NextRequest, NextResponse } from "next/server"

const WHATSAPP_TOKEN =
  "EAAIZBpcIPl1IBO0I3DuAtahnBI7xlJdFJ8QjjyUGUUGvmf4TlrYviu8dQNp7qZC9J6ZAd8eMCvXtVvVBOOFHVYMYZAbqdYIiI02mT1U6YvgWn0ZAf9vrHe6XJmZBiQLq7qY4eUko5GH4hZCD3LL611ZBe4mmgZCVtyuPZCYUDZClpZAWEo4I5OYbBabIzVUkQi7BP4pZAzM4DQotHpDzLLTl0WuT1LcZArLio9B9EQaM4ZD"
const PHONE_NUMBER_ID = "620343271160882"
const FACEBOOK_API_URL = `https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages`

export async function POST(request: NextRequest) {
  try {
    const { to } = await request.json()

    if (!to) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 })
    }

    const messageData = {
      messaging_product: "whatsapp",
      to: to,
      type: "template",
      template: {
        name: "hello_world",
        language: {
          code: "en_US",
        },
      },
    }

    const response = await fetch(FACEBOOK_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("WhatsApp API Error:", data)
      return NextResponse.json(
        {
          error: data.error?.message || "Failed to send WhatsApp message",
          details: data,
        },
        { status: response.status },
      )
    }

    return NextResponse.json({
      success: true,
      message: "WhatsApp message sent successfully",
      data: data,
    })
  } catch (error) {
    console.error("Server Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
