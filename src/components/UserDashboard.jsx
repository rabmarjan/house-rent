import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Heart, 
  Search, 
  Truck,
  Bell,
  Settings,
  MapPin,
  Bed,
  Bath,
  Square,
  Star,
  Calendar,
  Package,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'

const UserDashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  // Mock user data
  const user = {
    name: "John Smith",
    email: "john.smith@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    memberSince: "January 2024",
    savedProperties: 12,
    viewedProperties: 45,
    movingRequests: 3
  }

  // Mock saved properties
  const savedProperties = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      address: "123 Main St, Downtown",
      price: 2500,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      agent: "Sarah Johnson",
      rating: 4.8,
      savedDate: "2 days ago"
    },
    {
      id: 2,
      title: "Cozy Suburban House",
      address: "456 Oak Ave, Suburbia",
      price: 3200,
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 1800,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      agent: "Mike Chen",
      rating: 4.9,
      savedDate: "1 week ago"
    },
    {
      id: 3,
      title: "Luxury Penthouse",
      address: "789 Sky Tower, Uptown",
      price: 5500,
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2200,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      agent: "Emily Davis",
      rating: 5.0,
      savedDate: "2 weeks ago"
    }
  ]

  // Mock search alerts
  const searchAlerts = [
    {
      id: 1,
      name: "Downtown 2BR under $3000",
      criteria: "Downtown, 2 bedrooms, max $3000",
      frequency: "Daily",
      active: true,
      newMatches: 3
    },
    {
      id: 2,
      name: "Pet-friendly apartments",
      criteria: "Pet-friendly, any area, max $2500",
      frequency: "Weekly",
      active: true,
      newMatches: 1
    },
    {
      id: 3,
      name: "Luxury condos",
      criteria: "Luxury, 3+ bedrooms, Uptown",
      frequency: "Weekly",
      active: false,
      newMatches: 0
    }
  ]

  // Mock moving requests
  const movingRequests = [
    {
      id: 1,
      from: "123 Old St, Current City",
      to: "456 New Ave, New City",
      date: "2024-01-15",
      status: "completed",
      company: "Swift Movers",
      cost: 850
    },
    {
      id: 2,
      from: "789 Previous Rd, Old Town",
      to: "123 Current St, Downtown",
      date: "2024-01-20",
      status: "in_progress",
      company: "Reliable Moving Co.",
      cost: 1200
    },
    {
      id: 3,
      from: "456 Current Ave, Downtown",
      to: "789 Future Blvd, Uptown",
      date: "2024-02-01",
      status: "pending",
      company: "City Movers Express",
      cost: 950
    }
  ]

  // Mock recent activity
  const recentActivity = [
    {
      id: 1,
      type: "property_viewed",
      title: "Viewed Modern Downtown Apartment",
      time: "2 hours ago",
      icon: <Search className="h-4 w-4" />
    },
    {
      id: 2,
      type: "property_saved",
      title: "Saved Cozy Suburban House",
      time: "1 day ago",
      icon: <Heart className="h-4 w-4" />
    },
    {
      id: 3,
      type: "moving_request",
      title: "Submitted moving request",
      time: "3 days ago",
      icon: <Truck className="h-4 w-4" />
    },
    {
      id: 4,
      type: "alert_created",
      title: "Created search alert for Downtown 2BR",
      time: "1 week ago",
      icon: <Bell className="h-4 w-4" />
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600'
      case 'in_progress':
        return 'bg-blue-600'
      case 'pending':
        return 'bg-yellow-600'
      default:
        return 'bg-gray-600'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      case 'in_progress':
        return <Clock className="h-4 w-4" />
      case 'pending':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.name.split(' ')[0]}!
              </h1>
              <p className="text-gray-600">
                Member since {user.memberSince}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{user.savedProperties}</div>
                <div className="text-sm text-gray-600">Saved Properties</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Search className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{user.viewedProperties}</div>
                <div className="text-sm text-gray-600">Properties Viewed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Truck className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{user.movingRequests}</div>
                <div className="text-sm text-gray-600">Moving Requests</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Bell className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{searchAlerts.filter(a => a.active).length}</div>
                <div className="text-sm text-gray-600">Active Alerts</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="saved">Saved Properties</TabsTrigger>
            <TabsTrigger value="alerts">Search Alerts</TabsTrigger>
            <TabsTrigger value="moving">Moving Requests</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3">
                        <div className="text-gray-400">
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.title}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => navigate('/search')}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Search Properties
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => navigate('/furniture-moving')}
                    >
                      <Truck className="h-4 w-4 mr-2" />
                      Request Moving Service
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Create Search Alert
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Saved Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedProperties.map((property) => (
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
                        <Button
                          size="sm"
                          variant="secondary"
                          className="absolute top-4 right-4"
                        >
                          <Heart className="h-4 w-4 fill-current text-red-500" />
                        </Button>
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
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{property.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
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
                        <div className="text-xs text-gray-500">
                          Saved {property.savedDate}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Search Alerts</CardTitle>
                  <Button size="sm">
                    <Bell className="h-4 w-4 mr-2" />
                    Create Alert
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {searchAlerts.map((alert) => (
                    <div key={alert.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{alert.name}</h3>
                        <div className="flex items-center space-x-2">
                          {alert.newMatches > 0 && (
                            <Badge variant="secondary">
                              {alert.newMatches} new
                            </Badge>
                          )}
                          <Badge variant={alert.active ? "default" : "secondary"}>
                            {alert.active ? "Active" : "Paused"}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{alert.criteria}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Frequency: {alert.frequency}
                        </span>
                        <div className="space-x-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            {alert.active ? "Pause" : "Activate"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="moving" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Moving Requests</CardTitle>
                  <Button size="sm" onClick={() => navigate('/furniture-moving')}>
                    <Truck className="h-4 w-4 mr-2" />
                    New Request
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {movingRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(request.status)}>
                            {getStatusIcon(request.status)}
                            <span className="ml-1 capitalize">{request.status.replace('_', ' ')}</span>
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(request.date).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="text-gray-600">From:</span>
                          <span className="text-gray-900">{request.from}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="text-gray-600">To:</span>
                          <span className="text-gray-900">{request.to}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="text-gray-600">Company:</span>
                          <span className="text-gray-900">{request.company}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-blue-600">
                          ${request.cost}
                        </span>
                        <div className="space-x-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          {request.status === 'pending' && (
                            <Button size="sm" variant="outline">
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="(555) 123-4567"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Email notifications</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Property alerts</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Moving updates</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Marketing emails</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <Button>Update Preferences</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default UserDashboard

