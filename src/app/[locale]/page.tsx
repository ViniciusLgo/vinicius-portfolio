import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <div id="skills" className="h-1" />
      <div id="experiencia" className="h-1" />
      <div id="projetos" className="h-1" />
      <div id="formacao" className="h-1" />
      <div id="certificacoes" className="h-1" />
      <div id="contato" className="h-1" />
    </main>
  )
}
