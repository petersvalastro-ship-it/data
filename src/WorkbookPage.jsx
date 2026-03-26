import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Reveal } from './Reveal'
import { Seo } from './Seo'

/** Paths must match files under public/workbook/ (synced from architects-of-the-mind-workbook). */
const WORKBOOK_SECTIONS = [
  {
    title: 'Start here',
    items: [
      { path: 'README.md', label: 'Workbook suite overview' },
      { path: 'ARTIFACTS-AND-LINKS.md', label: 'Artifacts & library links' },
    ],
  },
  {
    title: 'Cross-grade',
    items: [
      { path: 'cross-grade/unit-at-a-glance.md', label: 'Unit at a glance' },
      { path: 'cross-grade/vocabulary-progression.md', label: 'Vocabulary progression' },
    ],
  },
  {
    title: 'Teacher guide',
    items: [
      { path: 'teacher-guide/overview.md', label: 'Overview' },
      { path: 'teacher-guide/pacing-and-standards.md', label: 'Pacing & standards' },
      { path: 'teacher-guide/assessment-rubric.md', label: 'Assessment rubric' },
    ],
  },
  {
    title: 'Grades 3–4',
    items: [
      { path: 'grades-3-4/student-workbook.md', label: 'Student workbook' },
      { path: 'grades-3-4/answer-key.md', label: 'Answer key' },
    ],
  },
  {
    title: 'Grades 5–6',
    items: [
      { path: 'grades-5-6/student-workbook.md', label: 'Student workbook' },
      { path: 'grades-5-6/answer-key.md', label: 'Answer key' },
    ],
  },
  {
    title: 'Grades 7–8',
    items: [
      { path: 'grades-7-8/student-workbook.md', label: 'Student workbook' },
      { path: 'grades-7-8/answer-key.md', label: 'Answer key' },
    ],
  },
]

const ALLOWED_PATHS = new Set(
  WORKBOOK_SECTIONS.flatMap((s) => s.items.map((i) => i.path)),
)

export function WorkbookPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requested = searchParams.get('f') || 'README.md'
  const activePath = ALLOWED_PATHS.has(requested) ? requested : 'README.md'

  const [markdown, setMarkdown] = useState('')
  const [loadState, setLoadState] = useState('idle')
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    /* eslint-disable react-hooks/set-state-in-effect -- reset UI when `activePath` changes; fetch is async */
    setLoadState('loading')
    setError(null)
    /* eslint-enable react-hooks/set-state-in-effect */
    const url = `/workbook/${activePath.split('/').map(encodeURIComponent).join('/')}`
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Could not load document (${res.status})`)
        return res.text()
      })
      .then((text) => {
        if (!cancelled) {
          setMarkdown(text)
          setLoadState('ok')
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e.message)
          setLoadState('error')
        }
      })
    return () => {
      cancelled = true
    }
  }, [activePath])

  const selectDoc = useCallback(
    (path) => {
      setSearchParams({ f: path })
    },
    [setSearchParams],
  )

  const activeLabel = useMemo(() => {
    for (const sec of WORKBOOK_SECTIONS) {
      const hit = sec.items.find((i) => i.path === activePath)
      if (hit) return hit.label
    }
    return activePath
  }, [activePath])

  return (
    <main className="page page--workbook">
      <Seo
        title="Peter Valastro | Brain Blueprint Workbooks"
        description="Brain Blueprint: Architects of the Mind — full workbook suite for grades 3–4, 5–6, and 7–8, with teacher guides and answer keys."
      />
      <Reveal as="section" className="workbook-layout" stagger="workbook">
        <header className="workbook-header">
          <h1>Brain Blueprint: Architects of the Mind</h1>
          <p className="intro workbook-intro">
            Full workbook suite (grades 3–4, 5–6, 7–8). Choose a document below.
            Content lives in this site under <code>/workbook/</code>; originals stay in the{' '}
            <code>architects-of-the-mind-workbook</code> folder for editing—run{' '}
            <code>npm run sync-workbook</code> after you change those files to refresh what
            visitors see.
          </p>
          <p className="workbook-links">
            <Link to="/library">Library &amp; media</Link>
            {' · '}
            <a
              href="https://www.canva.com/design/DAHFA_PfHjs/unckjhxwPRJzvvhIZWCXjA/view?utm_content=DAHFA_PfHjs&utm_campaign=designshare&utm_medium=link&utm_source=editor"
              target="_blank"
              rel="noreferrer"
            >
              Canva: Brain Blueprint
            </a>
          </p>
        </header>

        <div className="workbook-panels">
          <nav className="workbook-nav" aria-label="Workbook documents">
            {WORKBOOK_SECTIONS.map((section) => (
              <div key={section.title} className="workbook-nav-group">
                <h2 className="workbook-nav-heading">{section.title}</h2>
                <ul className="workbook-nav-list">
                  {section.items.map((item) => (
                    <li key={item.path}>
                      <button
                        type="button"
                        className={`workbook-nav-btn ${item.path === activePath ? 'is-active' : ''}`}
                        onClick={() => selectDoc(item.path)}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <article className="workbook-doc" aria-live="polite">
            <div className="workbook-doc-bar">
              <span className="workbook-doc-title">{activeLabel}</span>
              <a
                className="workbook-doc-raw"
                href={`/workbook/${activePath.split('/').map(encodeURIComponent).join('/')}`}
                target="_blank"
                rel="noreferrer"
              >
                Open raw .md
              </a>
            </div>
            {loadState === 'loading' ? (
              <p className="workbook-status">Loading…</p>
            ) : null}
            {loadState === 'error' ? (
              <p className="workbook-status workbook-status--error" role="alert">
                {error}
              </p>
            ) : null}
            {loadState === 'ok' ? (
              <div className="markdown-body">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
              </div>
            ) : null}
          </article>
        </div>
      </Reveal>
    </main>
  )
}

