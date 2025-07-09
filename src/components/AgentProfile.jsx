import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  Award,
  Calendar,
  MessageCircle,
  ArrowLeft,
  Bed,
  Bath,
  Square,
  Building
} from 'lucide-react'

const AgentProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // Mock agent data
  const agent = {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop",
    title: "Senior Real Estate Agent",
    company: "Premier Properties",
    rating: 4.8,
    reviews: 127,
    yearsExperience: 8,
    phone: "(555) 123-4567",
    email: "sarah.johnson@rentease.com",
    bio: "Experienced real estate agent specializing in downtown properties with over 8 years in the industry. I'm passionate about helping clients find their perfect home and providing exceptional service throughout the entire rental process.",
    specialties: ["Downtown Properties", "Luxury Rentals", "First-Time Renters", "Corporate Housing"],
    serviceAreas: ["Downtown", "Midtown", "Financial District", "Arts Quarter"],
    languages: ["English", "Spanish", "French"],
    certifications: ["Licensed Real Estate Agent", "Certified Rental Specialist", "Property Management Certified"],
    achievements: [
      "Top Agent 2023",
      "Customer Service Excellence Award",
      "100+ Successful Rentals"
    ],
    stats: {
      totalRentals: 156,
      averageResponseTime: "2 hours",
      clientSatisfaction: "98%",
      repeatClients: "45%"
    }
  }

  // Mock properties managed by this agent
  const agentProperties = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      address: "123 Main St, Downtown",
      price: 2500,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      status: "Available"
    },
    {
      id: 2,
      title: "Luxury Penthouse Suite",
      address: "789 Sky Tower, Uptown",
      price: 5500,
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2200,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      status: "Available"
    },
    {
      id: 3,
      title: "Cozy Studio Loft",
      address: "456 Art District",
      price: 1800,
      bedrooms: 1,
      bathrooms: 1,
      sqft: 800,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      status: "Rented"
    }
  ]

  // Mock reviews
  const reviews = [
    {
      id: 1,
      author: "Michael Chen",
      rating: 5,
      date: "2 weeks ago",
      comment: "Sarah was absolutely fantastic! She helped me find the perfect apartment in downtown and made the entire process smooth and stress-free. Highly recommend!"
    },
    {
      id: 2,
      author: "Emily Rodriguez",
      rating: 5,
      date: "1 month ago",
      comment: "Professional, responsive, and knowledgeable. Sarah went above and beyond to help us find a place that met all our requirements. Great experience!"
    },
    {
      id: 3,
      author: "David Park",
      rating: 4,
      date: "2 months ago",
      comment: "Very helpful agent who knows the downtown area well. Found us a great apartment within our budget. Would work with her again."
    }
  ]

  const handleContactAgent = () => {
    // In a real app, this would open a contact form or messaging interface
    alert('Contact form would be implemented here')
  }

  const handleScheduleMeeting = () => {
    // In a real app, this would open a scheduling interface
    alert('Scheduling interface would be implemented here')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agent Info Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                {/* Agent Avatar and Basic Info */}
                <div className="text-center mb-6">
                  <Avatar className="h-32 w-32 mx-auto mb-4">
                    <AvatarImage src={agent.avatar} alt={agent.name} />
                    <AvatarFallback className="text-2xl">
                      {agent.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    {agent.name}
                  </h1>
                  <p className="text-gray-600 mb-2">{agent.title}</p>
                  <p className="text-sm text-gray-500 mb-4">{agent.company}</p>
                  
                  <div className="flex items-center justify-center space-x-1 mb-4">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{agent.rating}</span>
                    <span className="text-gray-600">({agent.reviews} reviews)</span>
                  </div>

                  <Badge variant="secondary" className="mb-4">
                    {agent.yearsExperience} Years Experience
                  </Badge>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{agent.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{agent.email}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mb-6">
                  <Button className="w-full" onClick={handleContactAgent}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Agent
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleScheduleMeeting}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Rentals:</span>
                      <span className="font-medium">{agent.stats.totalRentals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Response Time:</span>
                      <span className="font-medium">{agent.stats.averageResponseTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Client Satisfaction:</span>
                      <span className="font-medium">{agent.stats.clientSatisfaction}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Repeat Clients:</span>
                      <span className="font-medium">{agent.stats.repeatClients}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                {/* Bio */}
                <Card>
                  <CardHeader>
                    <CardTitle>About {agent.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {agent.bio}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Specialties */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Specialties</h3>
                        <div className="flex flex-wrap gap-2">
                          {agent.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Service Areas */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Service Areas</h3>
                        <div className="space-y-2">
                          {agent.serviceAreas.map((area, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span>{area}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Languages */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Languages</h3>
                        <div className="flex flex-wrap gap-2">
                          {agent.languages.map((language, index) => (
                            <Badge key={index} variant="outline">
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Certifications */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Certifications</h3>
                        <div className="space-y-2">
                          {agent.certifications.map((cert, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <Award className="h-4 w-4 text-blue-600" />
                              <span>{cert}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="properties" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Properties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {agentProperties.map((property) => (
                        <div 
                          key={property.id} 
                          className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                          onClick={() => navigate(`/property/${property.id}`)}
                        >
                          <div className="relative">
                            <img
                              src={property.image}
                              alt={property.title}
                              className="w-full h-48 object-cover"
                            />
                            <Badge 
                              className={`absolute top-4 left-4 ${
                                property.status === 'Available' ? 'bg-green-600' : 'bg-gray-600'
                              }`}
                            >
                              {property.status}
                            </Badge>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-2">
                              {property.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3 flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {property.address}
                            </p>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xl font-bold text-blue-600">
                                ${property.price.toLocaleString()}/mo
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <div className="flex items-center">
                                <Bed className="h-4 w-4 mr-1" />
                                {property.bedrooms} bed
                              </div>
                              <div className="flex items-center">
                                <Bath className="h-4 w-4 mr-1" />
                                {property.bathrooms} bath
                              </div>
                              <div className="flex items-center">
                                <Square className="h-4 w-4 mr-1" />
                                {property.sqft} sqft
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6 last:border-b-0">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900">{review.author}</h4>
                              <div className="flex items-center space-x-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${
                                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Achievements & Awards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {agent.achievements.map((achievement, index) => (
                        <div key={index} className="text-center p-6 bg-blue-50 rounded-lg">
                          <Award className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                          <h3 className="font-semibold text-gray-900">{achievement}</h3>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentProfile

