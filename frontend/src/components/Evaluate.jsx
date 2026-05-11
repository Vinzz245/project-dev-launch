import { useState } from 'react'
import axios from 'axios'
import EvaluationResults from './EvaluationResults'

const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors duration-200 bg-white"

function FormField({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  )
}

function Evaluate() {
  const [projectIdea, setProjectIdea] = useState('')
  const [skills, setSkills] = useState('')
  const [experience, setExperience] = useState('beginner')
  const [timeAvailable, setTimeAvailable] = useState('')
  const [evaluation, setEvaluation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit() {
    if (!projectIdea || !skills || !timeAvailable) {
      setError('Please fill in all fields')
      return
    }
    setLoading(true)
    setError(null)
    setEvaluation(null)
    try {
      const response = await axios.post('http://localhost:8000/evaluate', {
        project_idea: projectIdea,
        skills,
        experience,
        time_available: timeAvailable
      })
      setEvaluation(response.data.evaluation)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">

      <div>
        <h2 className="text-2xl font-bold text-gray-900">Evaluate</h2>
        <p className="text-sm text-gray-500 mt-1">Have a project idea? We'll give you an honest assessment.</p>
      </div>

      <div className="flex flex-col gap-4">
        <FormField label="Project Idea">
          <textarea
            className={`${inputClass} resize-none`}
            rows={3}
            placeholder="Describe your project idea..."
            value={projectIdea}
            onChange={e => setProjectIdea(e.target.value)}
          />
        </FormField>

        <FormField label="Your Skills">
          <input
            className={inputClass}
            placeholder="e.g. Python, React, SQL"
            value={skills}
            onChange={e => setSkills(e.target.value)}
          />
        </FormField>

        <FormField label="Experience Level">
          <select
            className={inputClass}
            value={experience}
            onChange={e => setExperience(e.target.value)}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="senior">Senior</option>
          </select>
        </FormField>

        <FormField label="Time Available">
          <input
            className={inputClass}
            placeholder="e.g. 2 weeks, 1 month"
            value={timeAvailable}
            onChange={e => setTimeAvailable(e.target.value)}
          />
        </FormField>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-2 w-48 self-center bg-gray-900 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Evaluating...' : 'Evaluate Project'}
        </button>
      </div>

      {evaluation && <EvaluationResults evaluation={evaluation} />}

    </div>
  )
}

export default Evaluate