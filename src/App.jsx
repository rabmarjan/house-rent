import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './components/HomePage'
import SearchResults from './components/SearchResults'
import PropertyDetails from './components/PropertyDetails'
import AgentProfile from './components/AgentProfile'
import FurnitureMoving from './components/FurnitureMoving'
import UserDashboard from './components/UserDashboard'
import MapView from './components/MapView'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/agent/:id" element={<AgentProfile />} />
          <Route path="/furniture-moving" element={<FurnitureMoving />} />
          <Route path="/dashboard" element={<UserDashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

