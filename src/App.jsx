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

      <section className="media-section">
        <h2>Canva + Media Library</h2>
        <p className="intro">
          Your Desktop Canva assets have been uploaded to this website and are
          now available on the homepage.
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
      </section>
    </main>
  )
}

export default App
