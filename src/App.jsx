import './App.css'

function App() {
  return (
    <main className="page">
      {/* Quick starter homepage for Peter Velaster */}
      <section className="hero">
        <p className="eyebrow">Official Website</p>
        <h1>Peter Velaster</h1>
        <p className="intro">
          Welcome to the official online home of Peter Velaster. This site is
          now connected to GitHub and ready for Vercel deployment.
        </p>
        <a className="cta" href="mailto:hello@petervelaster.com">
          Contact Peter
        </a>
      </section>

      <section className="cards">
        <article className="card">
          <h2>About</h2>
          <p>Short bio, achievements, and professional background.</p>
        </article>
        <article className="card">
          <h2>Projects</h2>
          <p>Highlight featured work, recent launches, and collaborations.</p>
        </article>
        <article className="card">
          <h2>Updates</h2>
          <p>Share announcements, events, and new milestones.</p>
        </article>
      </section>
    </main>
  )
}

export default App
