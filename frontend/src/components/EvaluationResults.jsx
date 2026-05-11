import { useState } from 'react'

function Badge({ label, value }) {
  return (
    <span className="text-xs text-gray-500">
      {label}: <span className="font-medium text-gray-900">{value}</span>
    </span>
  )
}

function VerdictBanner({ verdict, summary }) {
  const colors = {
    proceed: 'bg-green-50 border-green-200 text-green-800',
    modify: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    drop: 'bg-red-50 border-red-200 text-red-800'
  }

  return (
    <div className={`border rounded-xl p-5 ${colors[verdict] || 'bg-gray-50 border-gray-200 text-gray-800'}`}>
      <span className="text-sm font-bold uppercase tracking-wide">Verdict: {verdict}</span>
      <p className="text-sm mt-2">{summary}</p>
    </div>
  )
}

function Section({ title, children }) {
    const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col gap-3">
        <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between text-xs font-medium text-gray-600 uppercase tracking-wide hover:text-gray-900 transition-colors duration-200"
            >
                {title}
                <span>{open ? '▴' : '▾'}</span>
            </button>
      {open && children}
    </div>
  )
}

function EvaluationResults({ evaluation }) {
  return (
    <div className="flex flex-col gap-6 border border-gray-200 rounded-xl p-6 bg-white">

      <VerdictBanner verdict={evaluation.verdict} summary={evaluation.summary} />

      <div className="flex gap-4 flex-wrap">
        <Badge label="Complexity" value={`${evaluation.complexity_score}/10`} />
        <Badge label="Feasibility" value={evaluation.overall_feasibility} />
        <Badge label="Learning Value" value={evaluation.learning_value} />
        <Badge label="Resume Impact" value={evaluation.resume_impact} />
        <Badge label="Estimated Time" value={evaluation.estimated_time} />
      </div>

      <Section title="Tasks">
        {evaluation.tasks.map((task, i) => (
          <div key={i} className="flex items-start justify-between border border-gray-100 rounded-lg px-4 py-3">
            <span className="text-sm text-gray-800">{task.name}</span>
            <div className="flex gap-3 text-xs text-gray-400 shrink-0 ml-4">
              <span>{task.estimated_time}</span>
              <span>{task.difficulty}</span>
            </div>
          </div>
        ))}
      </Section>

      <Section title="Skill Gaps">
        {evaluation.skill_gaps.map((gap, i) => (
          <div key={i} className="border border-gray-100 rounded-lg px-4 py-3 flex flex-col gap-1">
            <span className="text-sm text-gray-800">{gap.skill}</span>
            {gap.resources && (
              <div className="flex gap-2 flex-wrap">
                {gap.resources.map((r, j) => (
                  <span key={j} className="text-xs text-gray-400">{r}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </Section>

      <Section title="Risk Flags">
        {evaluation.risk_flags.map((risk, i) => (
          <div key={i} className="border border-gray-100 rounded-lg px-4 py-3 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-800">{risk.challenge}</span>
              <span className="text-xs text-gray-400">{risk.severity}</span>
            </div>
            <p className="text-xs text-gray-400">{risk.mitigation}</p>
          </div>
        ))}
      </Section>

      <Section title="Recommendations">
        {evaluation.recommendations.map((rec, i) => (
          <div key={i} className="border border-gray-100 rounded-lg px-4 py-3">
            <p className="text-sm text-gray-700">{rec}</p>
          </div>
        ))}
      </Section>

      {evaluation.alternatives && evaluation.alternatives.length > 0 && (
        <Section title="Alternative Projects">
          {evaluation.alternatives.map((alt, i) => (
            <div key={i} className="border border-gray-100 rounded-lg px-4 py-3 flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-800">{alt.name}</span>
              <p className="text-xs text-gray-400">{alt.description}</p>
            </div>
          ))}
        </Section>
      )}

    </div>
  )
}

export default EvaluationResults