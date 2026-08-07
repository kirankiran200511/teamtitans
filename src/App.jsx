import { Routes, Route } from 'react-router-dom'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/sections/Hero'
import ChoosePath from './components/sections/ChoosePath'
import EventSpotlight from './components/sections/EventSpotlight'
import Benefits from './components/sections/Benefits'
import Journey from './components/sections/Journey'
import Membership from './components/sections/Membership'
import PropertyEvents from './components/sections/PropertyEvents'
import Testimonials from './components/sections/Testimonials'
import Partners from './components/sections/Partners'
import Faq from './components/sections/Faq'
import FinalCta from './components/sections/FinalCta'
import StickyCta from './components/StickyCta'
import SocialProofToast from './components/SocialProofToast'
import Footer from './components/Footer'
import BecomeHost from './pages/BecomeHost'
import useScrollReveal from './hooks/useScrollReveal'

function HomePage() {
  useScrollReveal();

  return (
    <>
      <Preloader />
      <ScrollProgress />

      <main>
        <Hero />
        <ChoosePath />
        <EventSpotlight />
        <Benefits />
        <Journey />
        <Membership />
        <PropertyEvents />
        <Testimonials />
        <Partners />
        <Faq />
        <FinalCta />
      </main>

      <StickyCta />
      <SocialProofToast />
      <Footer />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/become-a-host" element={<BecomeHost />} />
    </Routes>
  )
}

export default App
