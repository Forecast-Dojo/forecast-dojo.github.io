import type { CSSProperties } from 'react'
import { CheckIcon, FlagIcon, LockIcon, QuestionIcon } from './icons'

// A schematic of one replayed event, mirroring the example used in Figure 1 of the paper.
// Each column is one historical forecast date: the dated news available grows, the agent
// forecasts again, and the realized outcome stays hidden until every step has been scored.
const steps = [
  { date: 'Jun', articles: 1, forecast: [0.3, 0.46, 0.24] },
  { date: 'Aug', articles: 2, forecast: [0.44, 0.4, 0.16] },
  { date: 'Oct', articles: 3, forecast: [0.64, 0.28, 0.08] },
  { date: 'Nov', articles: 4, forecast: [0.85, 0.12, 0.03] },
]
const outcomes = ['cut', 'hold', 'hike']
const realized = 0

const delay = (seconds: number) => ({ '--d': `${seconds}s` }) as CSSProperties

function NewsStack({ count, index }: { count: number; index: number }) {
  return (
    <svg className="replay-news" viewBox="0 0 64 48" aria-hidden="true">
      {Array.from({ length: count }, (_, card) => {
        const x = 6 + card * 5
        const y = 19 - card * 5
        return <g className="replay-news-card" key={card} style={delay(0.15 + index * 0.22 + card * 0.07)}>
          <rect x={x} y={y} width="38" height="26" rx="3.5" />
          <path d={`M${x + 6} ${y + 8}h10M${x + 6} ${y + 13.5}h20M${x + 6} ${y + 19}h15`} />
          <rect x={x + 20} y={y + 6} width="12" height="4.5" rx="1.2" className="replay-news-photo" />
        </g>
      })}
    </svg>
  )
}

function ForecastBars({ forecast, index }: { forecast: number[]; index: number }) {
  const height = 60
  return (
    <svg className="replay-bars" viewBox="0 0 64 64" aria-hidden="true">
      <line x1="2" y1="62" x2="62" y2="62" />
      {forecast.map((probability, option) => {
        const barHeight = Math.max(3, probability * height)
        return <rect key={option} className={option === realized ? 'replay-bar realized' : 'replay-bar'} x={8 + option * 18} y={62 - barHeight} width="12" height={barHeight} rx="2" style={delay(0.35 + index * 0.22 + option * 0.04)} />
      })}
    </svg>
  )
}

export function ReplayIllustration() {
  const description = 'Schematic of one replayed event, “Fed rate decision in Dec. 2025?”: across four historical forecast dates the dated news grows and the agent’s forecast sharpens toward the outcome, which stays hidden until the event closes and every forecast is scored.'
  return (
    <figure className="replay-illustration" role="img" aria-label={description}>
      <div className="replay-head">
        <span className="replay-question"><i aria-hidden="true"><QuestionIcon /></i><span>Fed rate decision in Dec.&nbsp;2025?</span></span>
        <span className="replay-hidden"><LockIcon />Outcome hidden from agent</span>
      </div>
      <div className="replay-outcomes" aria-hidden="true">
        <span>outcomes</span>
        {outcomes.map((label, option) => <i key={label} className={option === realized ? 'realized' : ''}>{label}</i>)}
      </div>
      <div className="replay-grid" aria-hidden="true">
        <span className="replay-row-label">News dated by then</span>
        {steps.map((step, index) => <div className="replay-cell" key={step.date}><NewsStack count={step.articles} index={index} /></div>)}
        <span className="replay-end" />

        <span className="replay-row-label">Forecast date</span>
        <div className="replay-timeline">
          {steps.map((step, index) => <div className="replay-node" key={step.date} style={delay(0.1 + index * 0.22)}><i /><span>{step.date}</span></div>)}
        </div>
        <span className="replay-end replay-close"><FlagIcon /><span>close</span></span>

        <span className="replay-row-label">Agent forecast</span>
        {steps.map((step, index) => <div className="replay-cell" key={step.date}><ForecastBars forecast={step.forecast} index={index} /></div>)}
        <span className="replay-end" />
      </div>
      <div className="replay-foot" style={delay(1.35)}>
        <span className="replay-reveal"><CheckIcon />Revealed after close: <strong>cut</strong></span>
        <span className="replay-scored">Schematic · every forecast is scored against it</span>
      </div>
    </figure>
  )
}
