import { useEffect, useMemo, useState } from 'react'
import { parseUsageLogMarkdown, donutArc } from './parseUsageLog.js'
import { Reveal } from './Reveal'

function Seo({ title, description }) {
  useEffect(() => {
    document.title = title
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) metaDescription.setAttribute('content', description)
  }, [title, description])
  return null
}

const PIN_COLORS = {
  cursor: 'var(--photo-blue)',
  browser: 'var(--photo-warm)',
  other: 'var(--photo-slate)',
  unknown: 'var(--photo-cloud)',
}

function formatSpan(firstMs, lastMs) {
  if (firstMs == null || lastMs == null) return '—'
  const mins = Math.round((lastMs - firstMs) / 60000)
  if (mins < 60) return `${mins} min`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m ? `${h}h ${m}m` : `${h}h`
}

function UsagePinwheel({ summary }) {
  const { catCounts, totalEntries } = summary
  if (!totalEntries) return null

  const segments = [
    { key: 'cursor', label: 'Cursor (frontmost)', count: catCounts.cursor, color: PIN_COLORS.cursor },
    { key: 'browser', label: 'Browser', count: catCounts.browser, color: PIN_COLORS.browser },
    {
      key: 'other',
      label: 'Other / idle window',
      count: catCounts.other + catCounts.unknown,
      color: PIN_COLORS.other,
    },
  ].filter((s) => s.count > 0)

  const cx = 100
  const cy = 100
  const R = 88
  const r = 48
  let angle = -Math.PI / 2

  return (
    <figure className="usage-pinwheel-wrap" aria-label="Share of samples where each app was frontmost">
      <svg className="usage-pinwheel" viewBox="0 0 200 200" role="img">
        <title>Frontmost app at each sample</title>
        <g className="usage-pinwheel-rotor">
          {segments.map((s) => {
            const frac = s.count / totalEntries
            const a0 = angle
            const a1 = angle + frac * 2 * Math.PI
            angle = a1
            const d = donutArc(cx, cy, R, r, a0, a1)
            return <path key={s.key} d={d} fill={s.color} className="usage-pinwheel-slice" />
          })}
        </g>
        <circle cx={cx} cy={cy} r={r - 6} fill="rgba(255,255,255,0.92)" className="usage-pinwheel-hub" />
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          className="usage-pinwheel-hub-label"
          fill="var(--ink-soft)"
          fontSize="11"
          fontWeight="600"
        >
          samples
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" className="usage-pinwheel-hub-num" fill="var(--ink)" fontSize="22" fontWeight="600">
          {totalEntries}
        </text>
      </svg>
      <figcaption>
        <ul className="usage-legend">
          {segments.map((s) => (
            <li key={s.key}>
              <span className="usage-legend-swatch" style={{ background: s.color }} aria-hidden />
              <span className="usage-legend-text">
                <strong>{s.label}</strong>
                <span className="usage-legend-pct">
                  {Math.round((100 * s.count) / totalEntries)}% · {s.count}×
                </span>
              </span>
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  )
}

function TranscriptSplitBar({ userPct, assistantPct, userMsgs, assistantMsgs }) {
  const total = userMsgs + assistantMsgs
  if (!total) {
    return <p className="usage-muted">No transcript lines in this log yet.</p>
  }
  return (
    <div className="usage-split-bar-wrap">
      <div className="usage-split-bar" role="img" aria-label={`User ${userPct} percent, assistant ${assistantPct} percent`}>
        <div className="usage-split-user" style={{ width: `${userPct}%` }} title={`User messages: ${userMsgs}`} />
        <div className="usage-split-assistant" style={{ width: `${assistantPct}%` }} title={`Assistant messages: ${assistantMsgs}`} />
      </div>
      <ul className="usage-split-legend">
        <li>
          <span className="usage-legend-swatch usage-swatch-user" aria-hidden />
          User prompts <strong>{userPct}%</strong> ({userMsgs})
        </li>
        <li>
          <span className="usage-legend-swatch usage-swatch-assistant" aria-hidden />
          Assistant replies <strong>{assistantPct}%</strong> ({assistantMsgs})
        </li>
      </ul>
    </div>
  )
}

export function CursorUsagePage() {
  const [raw, setRaw] = useState(null)
  const [err, setErr] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch('/cursor-usage-log.md')
      .then((res) => {
        if (!res.ok) throw new Error(`Could not load log (${res.status})`)
        return res.text()
      })
      .then((text) => {
        if (!cancelled) setRaw(text)
      })
      .catch((e) => {
        if (!cancelled) setErr(String(e.message || e))
      })
    return () => {
      cancelled = true
    }
  }, [])

  const parsed = useMemo(() => (raw ? parseUsageLogMarkdown(raw) : null), [raw])

  return (
    <main className="page page--usage">
      <Seo
        title="Peter Valastro | Cursor usage"
        description="A living timeline from Peter's usage monitor—where focus landed, browser context, and the shape of AI pair-programming in Cursor."
      />

      <Reveal as="section" className="usage-hero">
        <p className="eyebrow">
          {parsed?.meta?.logTitle ?? "Local monitor · Peter's data day one"}
        </p>
        <h1>Cursor usage</h1>
        {parsed?.meta?.generatedBy ? (
          <p className="usage-muted usage-hero-meta">
            Header in file: <code>{parsed.meta.generatedBy}</code>
          </p>
        ) : null}
        <p className="intro intro-lead">
          Rolling samples from <code>peter-usage-monitor.sh</code>: macOS frontmost app, Chrome/Safari tab title and
          URL when a browser is forward, and recent Cursor agent transcript lines (JSONL under{' '}
          <code>.cursor/projects/…/agent-transcripts</code>). Each markdown block is one tick—by default about{' '}
          <strong>every five minutes</strong>, up to <strong>90</strong> blocks in the rotating log. Percentages
          below are <em>per sample</em> (a moment in time), not wall-clock time, but they still show where focus
          and chat volume lean.
        </p>
        <p className="usage-sync-hint">
          This site reads <code>public/cursor-usage-log.md</code>. Update it from your Desktop export with{' '}
          <code>npm run sync-usage-log</code> (copies <code>~/Desktop/Peter&apos;s data day one.md</code>).
        </p>
      </Reveal>

      {err ? (
        <div className="usage-error" role="alert">
          {err}. Run <code>npm run sync-usage-log</code> after the monitor updates the Desktop log.
        </div>
      ) : null}

      {!raw && !err ? <p className="usage-loading">Loading log…</p> : null}

      {parsed ? (
        <>
          <Reveal as="section" className="usage-dashboard" aria-labelledby="usage-dash-heading" stagger="usageCards">
            <h2 id="usage-dash-heading" className="welcome-letter-heading">
              At a glance
            </h2>
            <div className="usage-dashboard-grid">
              <div className="usage-card usage-card--viz">
                <h3>Frontmost app (pinwheel)</h3>
                <UsagePinwheel summary={parsed.summary} />
              </div>
              <div className="usage-card">
                <h3>Transcript mix</h3>
                <TranscriptSplitBar
                  userPct={parsed.summary.userPct}
                  assistantPct={parsed.summary.assistantPct}
                  userMsgs={parsed.summary.userMsgs}
                  assistantMsgs={parsed.summary.assistantMsgs}
                />
              </div>
              <div className="usage-card usage-card--stats">
                <h3>Session span</h3>
                <dl className="usage-stat-list">
                  <div>
                    <dt>Samples</dt>
                    <dd>{parsed.summary.totalEntries}</dd>
                  </div>
                  <div>
                    <dt>First → last</dt>
                    <dd>{formatSpan(parsed.summary.firstMs, parsed.summary.lastMs)}</dd>
                  </div>
                  <div>
                    <dt>Cursor share</dt>
                    <dd>{parsed.summary.cursorPct}%</dd>
                  </div>
                  <div>
                    <dt>Browser share</dt>
                    <dd>{parsed.summary.browserPct}%</dd>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>

          <Reveal as="section" className="usage-timeline-section" aria-labelledby="usage-timeline-heading" stagger="timeline">
            <h2 id="usage-timeline-heading" className="welcome-letter-heading">
              Timeline
            </h2>
            <p className="usage-muted usage-timeline-intro">Newest first. Each row is one monitor tick.</p>
            <ol className="usage-timeline">
              {[...parsed.entries].reverse().map((e, i) => (
                <li key={`${e.when}-${i}`} className={`usage-timeline-item usage-cat-${e.category}`}>
                  <div className="usage-timeline-marker" aria-hidden />
                  <div className="usage-timeline-body">
                    <div className="usage-timeline-head">
                      <time dateTime={e.dateMs ? new Date(e.dateMs).toISOString() : undefined}>{e.when}</time>
                      <span className="usage-timeline-badge">{e.category}</span>
                    </div>
                    <p className="usage-timeline-app">
                      <strong>Frontmost:</strong> {e.frontmost || '—'}
                    </p>
                    {e.browserShort ? (
                      <p className="usage-timeline-browser">
                        <strong>Browser:</strong> {e.browserShort}
                      </p>
                    ) : null}
                    {e.transcriptCount > 0 ? (
                      <p className="usage-timeline-meta">{e.transcriptCount} transcript line(s) captured</p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </>
      ) : null}
    </main>
  )
}
