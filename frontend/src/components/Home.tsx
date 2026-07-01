import Hero from './Hero'
import About from './About'
import HowItWorks from './HowItWorks'
import Stats from './Stats'
import Portfolio from './Portfolio'
import SystemManual from './SystemManual'
import RemoteAccess from './RemoteAccess'
import Testimonial from './Testimonial'

export default function Home() {
  return (
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
  )
}
