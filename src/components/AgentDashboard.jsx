import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  DollarSign, 
  Users, 
  TrendingUp,
  Star,
  Calendar,
  Package,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Eye,
  Edit
} from 'lucide-react'

const AgentDashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [properties, setProperties] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token')
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }

      // Fetch agent stats
      const statsResponse = await fetch('http://localhost:8000/api/v1/dashboard/agent/stats', { headers })
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      // Fetch agent properties
      const propertiesResponse = await fetch('http://localhost:8000/api/v1/dashboard/agent/properties', { headers })
      if (propertiesResponse.ok) {
        const propertiesData = await propertiesResponse.json()
        setProperties(propertiesData.properties || [])
      }

      // Fetch agent inquiries
      const inquiriesResponse = await fetch('http://localhost:8000/api/v1/dashboard/agent/inquiries', { headers })
      if (inquiriesResponse.ok) {
        const inquiriesData = await inquiriesResponse.json()
        setInquiries(inquiriesData.inquiries || [])
      }

      // Fetch recent activity
      const activityResponse = await fetch('http://localhost:8000/api/v1/dashboard/agent/recent-activity', { headers })
      if (activityResponse.ok) {
        const activityData = await activityResponse.json()
        setActivities(activityData.activities || [])
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Agent Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.full_name || 'Agent'}</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total_properties}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.available_properties} available
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.total_revenue?.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  From {stats.total_properties} properties
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Agent Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.agent_rating}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.years_experience} years experience
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Inquiries</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.recent_inquiries_count}</div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList>
            <TabsTrigger value="properties">My Properties</TabsTrigger>
            <TabsTrigger value="inquiries">Moving Requests</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Properties</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </div>

            <div className="grid gap-6">
              {properties.map((property) => (
                <Card key={property.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
                        <p className="text-gray-600 mb-4">{property.address}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                          <span className="flex items-center">
                            <Home className="h-4 w-4 mr-1" />
                            {property.bedrooms} bed
                          </span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {property.bathrooms} bath
                          </span>
                          <span className="flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            {property.square_feet} sqft
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-blue-600">
                            ${property.rent_price?.toLocaleString()}/mo
                          </div>
                          <Badge variant={property.is_available ? "default" : "secondary"}>
                            {property.is_available ? "Available" : "Rented"}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex space-x-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {properties.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties yet</h3>
                    <p className="text-gray-600 mb-4">Start by adding your first property listing</p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Property
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Inquiries Tab */}
          <TabsContent value="inquiries" className="space-y-6">
            <h2 className="text-xl font-semibold">Moving Requests</h2>

            <div className="grid gap-6">
              {inquiries.map((inquiry) => (
                <Card key={inquiry.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">
                          Moving Request #{inquiry.id}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          Property: {inquiry.house_title}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          From: {inquiry.pickup_address} → To: {inquiry.delivery_address}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-semibold text-green-600">
                            ${inquiry.estimated_cost?.toLocaleString()}
                          </div>
                          <Badge variant={
                            inquiry.status === 'pending' ? 'default' :
                            inquiry.status === 'approved' ? 'default' :
                            inquiry.status === 'completed' ? 'default' : 'secondary'
                          }>
                            {inquiry.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex space-x-2 ml-4">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {inquiries.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No moving requests</h3>
                    <p className="text-gray-600">Moving requests for your properties will appear here</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <h2 className="text-xl font-semibold">Recent Activity</h2>

            <div className="space-y-4">
              {activities.map((activity, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {activity.type === 'property_update' && <Home className="h-5 w-5 text-blue-500" />}
                        {activity.type === 'new_inquiry' && <Package className="h-5 w-5 text-green-500" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {activities.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No recent activity</h3>
                    <p className="text-gray-600">Your recent activity will appear here</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AgentDashboard

