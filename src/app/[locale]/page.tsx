import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <div id="experiencia" className="h-1" />
      <div id="projetos" className="h-1" />
      <div id="formacao" className="h-1" />
      <div id="certificacoes" className="h-1" />
      <div id="contato" className="h-1" />
    </main>
  )
}
