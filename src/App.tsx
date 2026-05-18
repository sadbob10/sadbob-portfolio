import Navbar      from './components/layout/Navbar'
import Footer      from './components/layout/Footer'
import Hero        from './components/sections/Hero'
import About       from './components/sections/About'
import Skills      from './components/sections/Skills'
import Projects    from './components/sections/Projects'
import Contact     from './components/sections/Contact'
import RevealSection from './components/ui/RevealSection'

function App() {
  return (
    <main>
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
  )
}

export default App