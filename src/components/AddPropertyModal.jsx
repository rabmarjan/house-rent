import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { X, Plus, Minus } from 'lucide-react'
import { housesAPI } from '../services/api'

const AddPropertyModal = ({ isOpen, onClose, onPropertyAdded }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  
  const [propertyData, setPropertyData] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    property_type: '',
    bedrooms: 1,
    bathrooms: 1,
    square_feet: '',
    year_built: '',
    rent_price: '',
    security_deposit: '',
    lease_term: '',
    available_date: '',
    pet_policy: '',
    parking: '',
    amenities: [],
    features: [],
    images: [],
    virtual_tour_url: '',
    floor_plan_url: '',
    agent_id: 1 // Default to first agent, will be updated based on user
  })

  const [newAmenity, setNewAmenity] = useState('')
  const [newFeature, setNewFeature] = useState('')
  const [newImage, setNewImage] = useState('')

  const propertyTypes = [
    'Apartment',
    'House',
    'Condo',
    'Townhouse',
    'Studio',
    'Loft',
    'Duplex',
    'Other'
  ]

  const petPolicies = [
    'No Pets',
    'Cats Only',
    'Dogs Only',
    'Cats and Dogs',
    'All Pets Welcome'
  ]

  const parkingOptions = [
    'No Parking',
    'Street Parking',
    'Garage',
    'Driveway',
    'Covered Parking',
    'Assigned Spot'
  ]

  const leaseTerms = [
    '6 months',
    '1 year',
    '2 years',
    'Month-to-month',
    'Flexible'
  ]

  const handleInputChange = (field, value) => {
    setPropertyData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addToList = (listName, value, setter) => {
    if (value.trim()) {
      setPropertyData(prev => ({
        ...prev,
        [listName]: [...prev[listName], value.trim()]
      }))
      setter('')
    }
  }

  const removeFromList = (listName, index) => {
    setPropertyData(prev => ({
      ...prev,
      [listName]: prev[listName].filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Convert string numbers to actual numbers
      const submitData = {
        ...propertyData,
        bedrooms: parseInt(propertyData.bedrooms),
        bathrooms: parseFloat(propertyData.bathrooms),
        square_feet: propertyData.square_feet ? parseInt(propertyData.square_feet) : null,
        year_built: propertyData.year_built ? parseInt(propertyData.year_built) : null,
        rent_price: parseFloat(propertyData.rent_price),
        security_deposit: propertyData.security_deposit ? parseFloat(propertyData.security_deposit) : null,
        available_date: propertyData.available_date || null
      }

      const response = await housesAPI.createHouse(submitData)
      
      if (onPropertyAdded) {
        onPropertyAdded(response)
      }
      
      onClose()
      
      // Reset form
      setPropertyData({
        title: '',
        description: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        property_type: '',
        bedrooms: 1,
        bathrooms: 1,
        square_feet: '',
        year_built: '',
        rent_price: '',
        security_deposit: '',
        lease_term: '',
        available_date: '',
        pet_policy: '',
        parking: '',
        amenities: [],
        features: [],
        images: [],
        virtual_tour_url: '',
        floor_plan_url: '',
        agent_id: 1
      })
      setCurrentStep(1)
    } catch (error) {
      setError(error.message || 'Failed to create property')
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Add New Property - Step {currentStep} of 3</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Property Title *</Label>
                    <Input
                      id="title"
                      value={propertyData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="e.g., Modern Downtown Apartment"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="property_type">Property Type *</Label>
                    <Select value={propertyData.property_type} onValueChange={(value) => handleInputChange('property_type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={propertyData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe the property..."
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={propertyData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="123 Main Street"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={propertyData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="New York"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={propertyData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="NY"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="zip_code">ZIP Code *</Label>
                    <Input
                      id="zip_code"
                      value={propertyData.zip_code}
                      onChange={(e) => handleInputChange('zip_code', e.target.value)}
                      placeholder="10001"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Property Details */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Property Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms *</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      min="0"
                      value={propertyData.bedrooms}
                      onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms *</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      step="0.5"
                      min="0"
                      value={propertyData.bathrooms}
                      onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="square_feet">Square Feet</Label>
                    <Input
                      id="square_feet"
                      type="number"
                      value={propertyData.square_feet}
                      onChange={(e) => handleInputChange('square_feet', e.target.value)}
                      placeholder="1200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rent_price">Monthly Rent *</Label>
                    <Input
                      id="rent_price"
                      type="number"
                      step="0.01"
                      value={propertyData.rent_price}
                      onChange={(e) => handleInputChange('rent_price', e.target.value)}
                      placeholder="2500.00"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="security_deposit">Security Deposit</Label>
                    <Input
                      id="security_deposit"
                      type="number"
                      step="0.01"
                      value={propertyData.security_deposit}
                      onChange={(e) => handleInputChange('security_deposit', e.target.value)}
                      placeholder="2500.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="year_built">Year Built</Label>
                    <Input
                      id="year_built"
                      type="number"
                      value={propertyData.year_built}
                      onChange={(e) => handleInputChange('year_built', e.target.value)}
                      placeholder="2020"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="available_date">Available Date</Label>
                    <Input
                      id="available_date"
                      type="date"
                      value={propertyData.available_date}
                      onChange={(e) => handleInputChange('available_date', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="lease_term">Lease Term</Label>
                    <Select value={propertyData.lease_term} onValueChange={(value) => handleInputChange('lease_term', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select lease term" />
                      </SelectTrigger>
                      <SelectContent>
                        {leaseTerms.map(term => (
                          <SelectItem key={term} value={term}>{term}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="pet_policy">Pet Policy</Label>
                    <Select value={propertyData.pet_policy} onValueChange={(value) => handleInputChange('pet_policy', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pet policy" />
                      </SelectTrigger>
                      <SelectContent>
                        {petPolicies.map(policy => (
                          <SelectItem key={policy} value={policy}>{policy}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="parking">Parking</Label>
                    <Select value={propertyData.parking} onValueChange={(value) => handleInputChange('parking', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select parking option" />
                      </SelectTrigger>
                      <SelectContent>
                        {parkingOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Amenities & Media */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Amenities & Media</h3>
                
                {/* Amenities */}
                <div>
                  <Label>Amenities</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newAmenity}
                      onChange={(e) => setNewAmenity(e.target.value)}
                      placeholder="Add amenity (e.g., Pool, Gym)"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToList('amenities', newAmenity, setNewAmenity))}
                    />
                    <Button type="button" onClick={() => addToList('amenities', newAmenity, setNewAmenity)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {propertyData.amenities.map((amenity, index) => (
                      <div key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1">
                        {amenity}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromList('amenities', index)}
                          className="h-4 w-4 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <Label>Features</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add feature (e.g., Hardwood Floors, Balcony)"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToList('features', newFeature, setNewFeature))}
                    />
                    <Button type="button" onClick={() => addToList('features', newFeature, setNewFeature)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {propertyData.features.map((feature, index) => (
                      <div key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded flex items-center gap-1">
                        {feature}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromList('features', index)}
                          className="h-4 w-4 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Images */}
                <div>
                  <Label>Image URLs</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      placeholder="Add image URL"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToList('images', newImage, setNewImage))}
                    />
                    <Button type="button" onClick={() => addToList('images', newImage, setNewImage)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {propertyData.images.map((image, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <span className="flex-1 text-sm truncate">{image}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromList('images', index)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Virtual Tour & Floor Plan */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="virtual_tour_url">Virtual Tour URL</Label>
                    <Input
                      id="virtual_tour_url"
                      value={propertyData.virtual_tour_url}
                      onChange={(e) => handleInputChange('virtual_tour_url', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="floor_plan_url">Floor Plan URL</Label>
                    <Input
                      id="floor_plan_url"
                      value={propertyData.floor_plan_url}
                      onChange={(e) => handleInputChange('floor_plan_url', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <div>
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
              </div>
              
              <div className="flex gap-2">
                {currentStep < 3 ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create Property'}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddPropertyModal

