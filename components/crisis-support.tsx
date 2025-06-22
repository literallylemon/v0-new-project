"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Phone, MessageSquare, Heart, Clock, Shield, MapPin } from "lucide-react"

interface CrisisResource {
  name: string
  phone: string
  text?: string
  description: string
  available: string
  urgent?: boolean
}

const crisisResources: CrisisResource[] = [
  {
    name: "988 Suicide & Crisis Lifeline",
    phone: "988",
    text: "988",
    description: "24/7 crisis support for suicidal thoughts and mental health emergencies",
    available: "24/7",
    urgent: true,
  },
  {
    name: "Crisis Text Line",
    phone: "741741",
    text: "HOME to 741741",
    description: "Free, 24/7 crisis support via text message",
    available: "24/7",
    urgent: true,
  },
  {
    name: "SAMHSA National Helpline",
    phone: "1-800-662-4357",
    description: "Treatment referral and information service",
    available: "24/7",
  },
  {
    name: "National Domestic Violence Hotline",
    phone: "1-800-799-7233",
    text: "START to 88788",
    description: "Support for domestic violence situations",
    available: "24/7",
  },
  {
    name: "LGBTQ+ National Hotline",
    phone: "1-888-843-4564",
    description: "Support for LGBTQ+ individuals in crisis",
    available: "Mon-Fri 4pm-12am ET, Sat 12pm-5pm ET",
  },
  {
    name: "Veterans Crisis Line",
    phone: "1-800-273-8255",
    text: "838255",
    description: "Crisis support specifically for veterans",
    available: "24/7",
  },
]

const copingStrategies = [
  {
    title: "5-4-3-2-1 Grounding Technique",
    description: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste",
    icon: "👁️",
  },
  {
    title: "Box Breathing",
    description: "Breathe in for 4, hold for 4, out for 4, hold for 4. Repeat.",
    icon: "🫁",
  },
  {
    title: "Cold Water",
    description: "Splash cold water on your face or hold ice cubes",
    icon: "❄️",
  },
  {
    title: "Call Someone",
    description: "Reach out to a trusted friend, family member, or crisis line",
    icon: "📞",
  },
  {
    title: "Safe Space",
    description: "Go to a safe, comfortable place where you feel secure",
    icon: "🏠",
  },
  {
    title: "Remove Means",
    description: "Put distance between yourself and anything harmful",
    icon: "🛡️",
  },
]

const safetyPlanSteps = [
  "Recognize your warning signs and triggers",
  "Use coping strategies that help you feel better",
  "Contact people who provide distraction and support",
  "Reach out to family members or friends who can help",
  "Contact mental health professionals or agencies",
  "Make your environment safe by removing harmful items",
]

export default function CrisisSupport() {
  const [selectedResource, setSelectedResource] = useState<CrisisResource | null>(null)

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, "_self")
  }

  const handleText = (number: string, message?: string) => {
    const smsUrl = message ? `sms:${number}?body=${encodeURIComponent(message)}` : `sms:${number}`
    window.open(smsUrl, "_self")
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Emergency Alert */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="w-6 h-6" />
            Crisis Support - You Are Not Alone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700 mb-4">
            If you are in immediate danger or having thoughts of suicide, please reach out for help right now.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button onClick={() => handleCall("988")} className="bg-red-600 hover:bg-red-700 text-white h-12" size="lg">
              <Phone className="w-5 h-5 mr-2" />
              Call 988 - Crisis Lifeline
            </Button>
            <Button
              onClick={() => handleText("741741", "HOME")}
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-50 h-12"
              size="lg"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Text HOME to 741741
            </Button>
          </div>
          <p className="text-sm text-red-600 mt-3 text-center">
            For immediate medical emergency, call 911 or go to your nearest emergency room
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="resources" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="resources">Crisis Lines</TabsTrigger>
          <TabsTrigger value="coping">Coping Now</TabsTrigger>
          <TabsTrigger value="safety">Safety Plan</TabsTrigger>
          <TabsTrigger value="support">Find Help</TabsTrigger>
        </TabsList>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crisisResources.map((resource, index) => (
              <Card key={index} className={resource.urgent ? "border-red-200 bg-red-50" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{resource.name}</CardTitle>
                    {resource.urgent && <Badge className="bg-red-600">URGENT</Badge>}
                  </div>
                  <p className="text-sm text-gray-600">{resource.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {resource.available}
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    onClick={() => handleCall(resource.phone)}
                    className="w-full"
                    variant={resource.urgent ? "default" : "outline"}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call {resource.phone}
                  </Button>
                  {resource.text && (
                    <Button
                      onClick={() =>
                        handleText(
                          resource.phone,
                          resource.text.includes("to") ? resource.text.split(" to ")[0] : undefined,
                        )
                      }
                      variant="outline"
                      className="w-full"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Text {resource.text}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="coping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Immediate Coping Strategies
              </CardTitle>
              <p className="text-sm text-gray-600">Try these techniques right now to help manage intense feelings</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {copingStrategies.map((strategy, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{strategy.icon}</span>
                      <div>
                        <h4 className="font-semibold text-sm">{strategy.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{strategy.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-700">Breathing Exercise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-blue-200 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
                <p className="text-blue-700">
                  Follow the circle: <br />
                  <strong>Breathe in slowly for 4 counts</strong> <br />
                  <strong>Hold for 4 counts</strong> <br />
                  <strong>Breathe out slowly for 4 counts</strong> <br />
                  <strong>Hold for 4 counts</strong>
                </p>
                <p className="text-sm text-blue-600">Repeat this cycle 4-6 times</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="safety" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                Personal Safety Plan
              </CardTitle>
              <p className="text-sm text-gray-600">A safety plan helps you stay safe during difficult times</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {safetyPlanSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-yellow-700">Important Reminders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-yellow-700">
              <p>• Crisis feelings are temporary - they will pass</p>
              <p>• You have survived difficult times before</p>
              <p>• Reaching out for help is a sign of strength</p>
              <p>• You matter and your life has value</p>
              <p>• There are people who want to help you</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Emergency Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={() => handleCall("911")} className="w-full bg-red-600 hover:bg-red-700" size="lg">
                  <Phone className="w-4 h-4 mr-2" />
                  Call 911 - Emergency
                </Button>
                <p className="text-sm text-gray-600">
                  For immediate medical emergencies or if you are in immediate danger
                </p>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>When to call 911:</strong>
                  </p>
                  <p>• Immediate risk of self-harm</p>
                  <p>• Medical emergency</p>
                  <p>• Immediate danger from others</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mobile Crisis Teams</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">Many areas have mobile crisis teams that can come to you</p>
                <Button
                  onClick={() => window.open("https://www.samhsa.gov/find-help/national-helpline", "_blank")}
                  variant="outline"
                  className="w-full"
                >
                  Find Local Crisis Services
                </Button>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Crisis teams can help with:</strong>
                  </p>
                  <p>• On-site crisis intervention</p>
                  <p>• Safety planning</p>
                  <p>• Connection to services</p>
                  <p>• Alternative to emergency room</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-700">After the Crisis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-green-700">
              <p>• Follow up with a mental health professional</p>
              <p>• Review and update your safety plan</p>
              <p>• Consider ongoing therapy or counseling</p>
              <p>• Build a support network of trusted people</p>
              <p>• Practice self-care and stress management</p>
              <p>• Remember that recovery is possible</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
