import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { CursorUsagePage } from './CursorUsagePage'
import { WorkbookPage } from './WorkbookPage'
import { Reveal } from './Reveal'
import { Seo } from './Seo'
import './App.css'

const videoFiles = ['Architects_of_the_Mind.mp4', 'Architects_of_the_Mind (1).mp4']

const imageFiles = [
  'Blueprint for Digital Wellness (1).png',
  'Gemini_Generated_Image_boebs9boebs9boeb.png',
  'Gemini_Generated_Image_evt11devt11devt1.png',
  'Our Amazing Brain (1) (1).png',
  'Screenshot 2026-03-26 at 12.32.45 PM.png',
  'Study Guide Brain Diagram.png',
]

const pdfFiles = [
  'ANSWER KEY_ Architects of the Mind AssessmentPare.pdf',
  'Architects of the Mind Materials (1).pdf',
  'Brain Diagram Worksheets (1) (1).pdf',
  'Brain Science of Tech Project Info Packet.pdf',
  'Connect SEL to the Brain _ Thoughtful Learning K-12.pdf',
  'Link Brain Anatomy to Creative Tech Use (1) (1).pdf',
  "Master Builder's Brain Lab (1) (1).pdf",
  'Neural Audit Screen Time Application (1) (1).pdf',
  'Neural Audit Screen Time Application (1).pdf',
  'Neural_Blueprints (1).pdf',
  'Research Project Phase 1_ Impacts of Technology on the Brain (1).pdf',
  'Study Guide Brain Diagram.pdf',
  'Ways to Unleash Dopamine in Your Students’ Brains.pdf',
]

const mediaUrl = (fileName) => `/media/${encodeURIComponent(fileName)}`

function BioPage() {
  return (
    <main className="page page--bio">
      <Seo
        title="Peter Valastro | Director of Innovation"
        description="A portrait of practice—technology and the human mind, intentional creation, growth-minded teaching, and work that lives in classrooms and communities."
      />
      <Reveal as="section" className="hero" stagger="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Director of Innovation | Educator | Maker</p>
            <h1>Peter Valastro</h1>
            <p className="credential">M.S. Educational Technology · Walden University</p>
            <p className="walden-note">
              My Walden work lived in reflective writing and community—greens, open
              sky, and calm blues still shape how I design learning.{' '}
              <strong>Growth in good company</strong> stays at the heart of that
              work.
            </p>
            <p className="intro intro-lead">
              I design systems that help people make things that matter—where
              technology, strategy, and learning meet. This site is a window into
              that craft: clear, human, and built to grow with the people it serves.
            </p>
            <div className="hero-actions">
              <a className="cta" href="mailto:peteravalastro@gmail.com">
                Contact Peter
              </a>
              <a
                className="cta secondary"
                href="https://www.linkedin.com/in/peter-valastro-6b8682116/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn Profile
              </a>
            </div>
            <nav className="hero-connect" aria-label="Connect">
              <a href="mailto:peteravalastro@gmail.com">Email</a>
              <span className="hero-connect-sep" aria-hidden>
                ·
              </span>
              <a
                href="https://www.linkedin.com/in/peter-valastro-6b8682116/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <span className="hero-connect-sep" aria-hidden>
                ·
              </span>
              <a href="https://github.com/petersvalastro-ship-it" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </nav>
          </div>
          <div className="hero-photo">
            <img
              src="/peter-valastro-headshot.png?v=2"
              alt="Peter Valastro headshot"
              className="headshot"
            />
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="welcome-letter editorial-section" aria-labelledby="welcome-heading">
        <div className="editorial-section-inner">
          <span className="chapter-num" aria-hidden="true">
            01
          </span>
          <div className="editorial-section-main">
        <h2 id="welcome-heading" className="welcome-letter-heading">
          Welcome
        </h2>
        <p className="welcome-letter-body welcome-letter-lead">
          I’m glad you’re here. Pausing to explore someone’s work is its own kind
          of generosity—whether you arrive as a colleague, a caregiver, a student,
          or simply curious. What follows is meant to read like a conversation:
          plain language, honest detail, and room for wonder. If something
          resonates or raises a question, I welcome the exchange.
        </p>

        <h3 className="welcome-segment-heading">How I teach—and what I ask of technology</h3>
        <p className="welcome-letter-body">
          Technology is at its best when it invites{' '}
          <em>creation</em> and <em>intentional communication</em>—not an endless
          loop of passive scrolling. I care about work that is composed with
          care: purposeful making, messages that land, and artifacts that still
          mean something after the feed has moved on.
        </p>
        <p className="welcome-letter-body">
          Patience, iteration, and a growth mindset are the through-line—whether
          we’re shaping an experience, strengthening community, or leaving room
          for kindness in a busy day. Nature and photography keep me honest about
          light, framing, and attention to detail; I carry that same sensibility
          into teaching and leadership.
        </p>
        <ul className="welcome-letter-list">
          <li>
            I stay with students through the messy middle and focus on{' '}
            <em>how</em> to think, not what to think—so they can see their own
            potential unfold over time.
          </li>
          <li>
            Digital citizenship is non-negotiable. With Google’s Be Internet
            Awesome and related approaches—for younger and older learners alike—I
            treat safety, empathy, and smart choices online as habits, not
            one-off lessons.
          </li>
          <li>
            I still live by a ship-it mindset: finish the lesson or the build, put
            it in front of people, gather feedback, and improve—so the work
            actually reaches the audience it’s meant to serve.
          </li>
        </ul>

        <h3 className="welcome-segment-heading">Technology &amp; the brain</h3>
        <p className="welcome-letter-body">
          Much of my work lives where technology meets the mind—how reward and
          attention take shape, and how creating lights up different pathways than
          endless consumption alone. The aim is for learners to recognize themselves
          as architects of their own habits: curious, capable, and awake to
          choice.
        </p>
        <h4 className="welcome-subheading">Neural audits</h4>
        <p className="welcome-letter-body">
          Students practice live neural audits: they notice how they’re using a
          device or platform and ask, in the moment, whether it’s helpful and
          intentional—or mostly a cheap dopamine rush. When it’s the latter, they
          learn to adapt quickly—tweaking the app, the time window, or the goal—so
          the technology serves the work, not the other way around.
        </p>
        <h4 className="welcome-subheading">Spaces that fit how each learner thinks</h4>
        <p className="welcome-letter-body">
          I design learning spaces so not everyone has to do the same thing, in
          the same way, at the same time. Students break problems down in ways
          that matter to them, collaborate in patterns that fit how they learn
          together, trade ideas, explore new concepts, make plenty of mistakes,
          and still feel supported as they move toward a solution.
        </p>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="editorial-section editorial-section--cards" stagger="cards">
        <div className="editorial-section-inner">
          <span className="chapter-num" aria-hidden="true">
            02
          </span>
          <div className="editorial-section-main">
        <div className="cards">
        <article className="card">
          <h2>Where the work lives</h2>
          <p>
            At Centner Academy, I shape technology and innovation across K-8—woven
            curriculum, makerspaces, and programs that help students and colleagues
            move from idea to something tangible in the world.
          </p>
        </article>
        <article className="card">
          <h2>Growth &amp; craft</h2>
          <p>
            Coaching stays slow enough to stick: question, prototype, revise, and
            say it clearly. Those habits outlast any single tool, unit, or school
            year.
          </p>
        </article>
        <article className="card">
          <h2>Impact in motion</h2>
          <p>
            The Bee Happy Marketplace supports 100+ student ventures and more
            than $50k in annual sales—proof that young makers can run real systems
            when the structure around them is designed with care.
          </p>
        </article>
        </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="bio-section editorial-section editorial-section--bio" stagger="list">
        <div className="editorial-section-inner">
          <span className="chapter-num" aria-hidden="true">
            03
          </span>
          <div className="editorial-section-main">
        <h2>Professional Highlights</h2>
        <ul className="pdf-list">
          <li>
            Designed and integrated K-8 technology and innovation-focused
            curricula.
          </li>
          <li>Oversaw creation of two makerspaces with advanced fabrication tools.</li>
          <li>Leads robotics and physical computing initiatives for student teams.</li>
          <li>
            FIRST LEGO League — recognized as Coach of the Year for the Masterpiece
            season (2023–24). Recently led a team to two first-place awards at two
            separate regional tournaments.
          </li>
          <li>
            Member of the FIRST LEGO League South Florida Regional Planning
            Committee.
          </li>
          <li>
            Speaker at MIT Media Lab, ISTE, and FCIS on learning innovation and
            technology integration.
          </li>
          <li>Apple Education Certified and Google Education Certified.</li>
        </ul>

        <h2>Education</h2>
        <ul className="pdf-list">
          <li>M.S. Educational Technology - Walden University.</li>
          <li>B.S. Business Marketing - University of Massachusetts Dartmouth.</li>
        </ul>
          </div>
        </div>
      </Reveal>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Peter Valastro',
            jobTitle: 'Director of Innovation',
            url: 'https://www.linkedin.com/in/peter-valastro-6b8682116/',
            sameAs: [
              'https://www.linkedin.com/in/peter-valastro-6b8682116/',
              'https://github.com/petersvalastro-ship-it',
            ],
          }),
        }}
      />
    </main>
  )
}

function LibraryMediaPage() {
  return (
    <main className="page page--library">
      <Seo
        title="Peter Valastro | Library & Media"
        description="Videos, visuals, and downloadable resources—an open shelf of original work for classrooms and curious minds."
      />
      <Reveal as="section" className="media-section" id="library-media">
        <h2>Library &amp; media</h2>
        <p className="intro">
          An organized shelf of original pieces—preview, share, or download.
          Categories and labels can evolve as the collection does; the through-line
          is always usefulness and clarity for the people who use them.
        </p>
        <p className="library-workbook-callout">
          <Link to="/workbook" className="library-workbook-link">
            Open the Brain Blueprint workbook suite (grades 3–8)
          </Link>
          — full student workbooks, answer keys, and teacher guides in your browser.
        </p>

        <h3>Video Previews</h3>
        <div className="media-grid">
          {videoFiles.map((fileName) => (
            <article className="media-card" key={fileName}>
              <video controls preload="metadata" className="media-video">
                <source src={mediaUrl(fileName)} type="video/mp4" />
              </video>
              <a href={mediaUrl(fileName)} target="_blank" rel="noreferrer">
                {fileName}
              </a>
            </article>
          ))}
        </div>

        <h3>Image Gallery</h3>
        <div className="media-grid">
          {imageFiles.map((fileName) => (
            <article className="media-card" key={fileName}>
              <img src={mediaUrl(fileName)} alt={fileName} className="media-image" />
              <a href={mediaUrl(fileName)} target="_blank" rel="noreferrer">
                {fileName}
              </a>
            </article>
          ))}
        </div>

        <h3>PDF Downloads</h3>
        <ul className="pdf-list">
          {pdfFiles.map((fileName) => (
            <li key={fileName}>
              <a href={mediaUrl(fileName)} target="_blank" rel="noreferrer">
                {fileName}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </main>
  )
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="top-nav">
      <div className="nav-wrap">
        <button
          type="button"
          className="nav-menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-nav-panel"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="nav-menu-bars" aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </button>
        <span className="brand">Growing Together</span>
        <span className="nav-wrap-spacer" aria-hidden />
      </div>

      {menuOpen ? (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <div
        id="site-nav-panel"
        className={`nav-panel ${menuOpen ? 'nav-panel--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="nav-panel-nav" aria-label="Site">
          <Link
            to="/"
            onClick={closeMenu}
            className={`nav-panel-link ${location.pathname === '/' ? 'is-active' : ''}`}
          >
            <span className="nav-panel-title">Bio</span>
            <span className="nav-panel-sub">Story, philosophy &amp; professional highlights</span>
          </Link>
          <Link
            to="/library"
            onClick={closeMenu}
            className={`nav-panel-link ${location.pathname === '/library' || location.pathname === '/workshops' ? 'is-active' : ''}`}
          >
            <span className="nav-panel-title">Library &amp; media</span>
            <span className="nav-panel-sub">Video, imagery &amp; downloadable resources</span>
          </Link>
          <Link
            to="/workbook"
            onClick={closeMenu}
            className={`nav-panel-link ${location.pathname === '/workbook' ? 'is-active' : ''}`}
          >
            <span className="nav-panel-title">Brain Blueprint workbooks</span>
            <span className="nav-panel-sub">Grades 3–8 suite — read in the browser</span>
          </Link>
          <Link
            to="/cursor-usage"
            onClick={closeMenu}
            className={`nav-panel-link ${location.pathname === '/cursor-usage' ? 'is-active' : ''}`}
          >
            <span className="nav-panel-title">Cursor usage</span>
            <span className="nav-panel-sub">Timeline &amp; focus from your local monitor log</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}

function App() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <Routes>
        <Route path="/" element={<BioPage />} />
        <Route path="/library" element={<LibraryMediaPage />} />
        <Route path="/workbook" element={<WorkbookPage />} />
        <Route path="/cursor-usage" element={<CursorUsagePage />} />
        <Route path="/workshops" element={<Navigate to="/library" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
