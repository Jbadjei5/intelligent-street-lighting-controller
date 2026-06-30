import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import HowItWorks from './components/HowItWorks'
import Stats from './components/Stats'
import Portfolio from './components/Portfolio'
import SystemManual from './components/SystemManual'
import RemoteAccess from './components/RemoteAccess'
import Testimonial from './components/Testimonial'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <Stats />
        <Portfolio />
        <SystemManual />
        <RemoteAccess />
        <Testimonial />
      </main>
      <Footer />
    </div>
  )
}

export default App
