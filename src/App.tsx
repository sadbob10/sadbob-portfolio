import { useState, useCallback } from 'react'
import Navbar        from './components/layout/Navbar'
import Footer        from './components/layout/Footer'
import Hero          from './components/sections/Hero'
import About         from './components/sections/About'
import Skills        from './components/sections/Skills'
import Projects      from './components/sections/Projects'
import Contact       from './components/sections/Contact'
import RevealSection from './components/ui/RevealSection'
import CustomCursor  from './components/ui/CustomCursor'
import Preloader     from './components/ui/Preloader'
import FloatingCTA   from './components/ui/FloatingCTA'

function App() {
  const [loading, setLoading] = useState<boolean>(true)
  const handleDone = useCallback(() => setLoading(false), [])

  return (
    <>
      <CustomCursor />
      <FloatingCTA />

      {loading && <Preloader onDone={handleDone} />}

      <main style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <Navbar />
        <Hero />

        <RevealSection direction="up">
          <About />
        </RevealSection>

        <RevealSection direction="left" delay={100}>
          <Skills />
        </RevealSection>

        <RevealSection direction="depth" delay={80}>
          <Projects />
        </RevealSection>

        <RevealSection direction="right" delay={100}>
          <Contact />
        </RevealSection>

        <RevealSection direction="up" delay={80}>
          <Footer />
        </RevealSection>
      </main>
    </>
  )
}

export default App