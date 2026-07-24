import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <div id="formacao" className="h-1" />
      <div id="certificacoes" className="h-1" />
      <div id="contato" className="h-1" />
    </main>
  )
}
