import { useState } from "react"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Discover from "./components/Discover"
import Evaluate from "./components/Evaluate"
import Build from "./components/Build"

function App() {
  const [activeTab, setActiveTab] = useState('Home')

  const renderTab = () => {
    switch(activeTab) {
      case 'Home': return <Home setActiveTab={setActiveTab} />
      case 'Discover': return <Discover />
      case 'Evaluate': return <Evaluate />
      case 'Build': return <Build />
      default: return <Home setActiveTab={setActiveTab} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-4xl mx-auto px-8 py-10">
        {renderTab()}
      </main>
    </div>
  )
}

export default App