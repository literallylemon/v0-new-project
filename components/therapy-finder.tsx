"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, Globe, DollarSign, Clock, Star } from "lucide-react"

interface TherapyResource {
  name: string
  description: string
  website: string
  phone?: string
  features: string[]
}

const therapyResources: TherapyResource[] = [
  {
    name: "Psychology Today",
    description: "Comprehensive directory of therapists, psychiatrists, and treatment centers",
    website: "https://www.psychologytoday.com/us/therapists",
    features: ["Insurance filters", "Specialty search", "Therapist profiles", "Online therapy options"],
  },
  {
    name: "BetterHelp",
    description: "Online therapy platform with licensed professionals",
    website: "https://www.betterhelp.com",
    features: ["Online sessions", "Text/video options", "Flexible scheduling", "Financial aid available"],
  },
  {
    name: "Talkspace",
    description: "Digital therapy platform for individuals, couples, and teens",
    website: "https://www.talkspace.com",
    features: ["Text therapy", "Video sessions", "Psychiatry services", "Insurance accepted"],
  },
  {
    name: "SAMHSA Treatment Locator",
    description: "Government resource for finding mental health and substance abuse treatment",
    website: "https://findtreatment.samhsa.gov",
    phone: "1-800-662-4357",
    features: ["Free service", "Crisis support", "Treatment facilities", "Support groups"],
  },
  {
    name: "Open Path Collective",
    description: "Affordable therapy network with sessions $30-$60",
    website: "https://openpathcollective.org",
    features: ["Reduced rates", "Sliding scale", "In-person & online", "No insurance required"],
  },
]

const professionalTypes = [
  {
    title: "Psychologist",
    description: "Doctoral-level professionals who provide therapy and psychological testing",
    credentials: "PhD, PsyD",
  },
  {
    title: "Licensed Clinical Social Worker (LCSW)",
    description: "Master's-level therapists specializing in mental health and social services",
    credentials: "MSW, LCSW",
  },
  {
    title: "Licensed Professional Counselor (LPC)",
    description: "Master's-level counselors providing individual and group therapy",
    credentials: "MA, MS, LPC",
  },
  {
    title: "Psychiatrist",
    description: "Medical doctors who can prescribe medication and provide therapy",
    credentials: "MD, DO",
  },
  {
    title: "Marriage & Family Therapist (MFT)",
    description: "Specialists in relationship and family counseling",
    credentials: "MA, MS, MFT",
  },
]

export default function TherapyFinder() {
  const [location, setLocation] = useState("")
  const [specialty, setSpecialty] = useState("")

  const handleSearch = () => {
    const searchQuery = `${specialty} ${location}`.trim()
    const psychologyTodayUrl = `https://www.psychologytoday.com/us/therapists${location ? `/${location.toLowerCase().replace(/\s+/g, "-")}` : ""}${specialty ? `?search=${encodeURIComponent(specialty)}` : ""}`
    window.open(psychologyTodayUrl, "_blank")
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Find Mental Health Professionals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Location (City, State or ZIP)</label>
              <Input
                placeholder="e.g., New York, NY or 10001"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Specialty (Optional)</label>
              <Input
                placeholder="e.g., anxiety, depression, couples therapy"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleSearch} className="w-full md:w-auto">
            <MapPin className="w-4 h-4 mr-2" />
            Search Therapists
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="resources" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="resources">Find Providers</TabsTrigger>
          <TabsTrigger value="types">Professional Types</TabsTrigger>
          <TabsTrigger value="tips">Getting Started</TabsTrigger>
        </TabsList>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {therapyResources.map((resource, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{resource.name}</CardTitle>
                  <p className="text-sm text-gray-600">{resource.description}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {resource.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(resource.website, "_blank")}
                      className="w-full"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Visit Website
                    </Button>
                    {resource.phone && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`tel:${resource.phone}`, "_self")}
                        className="w-full"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        {resource.phone}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="types" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {professionalTypes.map((type, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                  <Badge variant="outline">{type.credentials}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tips" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Cost & Insurance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Check if your insurance covers mental health services</p>
                <p>• Ask about sliding scale fees if cost is a concern</p>
                <p>• Consider online therapy platforms for more affordable options</p>
                <p>• Look into community mental health centers</p>
                <p>• Employee Assistance Programs (EAP) often provide free sessions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Finding the Right Fit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• It's okay to "shop around" for the right therapist</p>
                <p>• Consider their specialties and treatment approaches</p>
                <p>• Think about practical factors (location, scheduling)</p>
                <p>• Trust your instincts about feeling comfortable</p>
                <p>• Don't hesitate to switch if it's not working</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  What to Expect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• First session is usually an assessment/intake</p>
                <p>• Sessions typically last 45-50 minutes</p>
                <p>• Weekly sessions are most common initially</p>
                <p>• Progress takes time - be patient with the process</p>
                <p>• You can discuss goals and treatment plans</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Crisis Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  • <strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988
                </p>
                <p>
                  • <strong>Crisis Text Line:</strong> Text HOME to 741741
                </p>
                <p>
                  • <strong>SAMHSA Helpline:</strong> 1-800-662-4357
                </p>
                <p>
                  • <strong>Emergency:</strong> Call 911 or go to nearest ER
                </p>
                <p>
                  • <strong>LGBTQ+ Crisis:</strong> 1-866-488-7386
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
