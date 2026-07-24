export default function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-neon-green font-bold text-lg">
          VL<span className="text-neon-blue">.</span>
        </span>
        <p className="text-muted text-sm font-mono">
          © {new Date().getFullYear()} Vinicius Lago Cruz
        </p>
        <div className="flex gap-5">
          <a
            href="https://github.com/ViniciusLgo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-neon-green transition-colors text-sm font-mono"
          >
            github
          </a>
          <a
            href="https://linkedin.com/in/viniciuslagocruz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-neon-blue transition-colors text-sm font-mono"
          >
            linkedin
          </a>
        </div>
      </div>
    </footer>
  )
}
