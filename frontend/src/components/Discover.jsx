import { useState } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors duration-200"

function FormField({label, children}) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            {children}
        </div>
    )
}

function Badge({label, value}) {
    return (
        <span className="text-gray-500 text-xs">
            {label}: <span className="font-medium text-gray-900">{value}</span>
        </span>
    )
}

function Dropdown({options, value, onChange}) {
    const [open, setOpen] = useState(false)
    return (
        <div className="relative">
            <button
                type='button'
                onClick={() => setOpen(!open)} 
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:border-gray-400 transition-colors duration-200 flex items-center justify-between"
            >
                {value.charAt(0).toUpperCase() + value.slice(1)}
                <span className='text-gray-400'>▾</span>
            </button>
            {open && (
                <div className="absolute z-10 mt-1 w-full border border-gray-200 rounded-lg shadow-md bg-white overflow-hidden">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => {
                                onChange(option.value)
                                setOpen(false)
                            }}
                            className={`px-4 py-3 text-sm cursor-pointer transition-colors duration-200" ${
                                value === option.value ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

function ProjectCard({project}) {
    return (
        <div className="border border-gray-200 rounded-xl p-6 bg-white flex flex-col gap-4 hover:shadow-md transition-all duration-200">
            <h4 className="text-base font-semibold text-gray-900">{project.name}</h4>
            <p className="text-sm text-gray-500">{project.description}</p>
            <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-xs">Why it fits you:</span>
                <p className="text-sm text-gray-600">{project.why_it_fits}</p>
            </div>
            <div className="border-t border-gray-200 pt-3 flex gap-4">
                <Badge label="Resume Impact" value={project.resume_impact} />
                <Badge label="Learning Value" value={project.learning_value} />
                <Badge label="Uniqueness" value={project.uniqueness} />
                <Badge label="Time" value={project.estimated_time} />
            </div>
        </div>
    )
}

function Discover() {
    const [skills, setSkills] = useState('')
    const [interests, setInterests] = useState('')
    const [experience, setExperience] = useState('beginner')
    const [time_available, setTimeAvailable] = useState('')
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function handleSubmit() {
        if (!skills || !interests || !time_available) {
            setError('Please fill in all required fields.')
            return
        }
        setLoading(true)
        setError(null)
        setProjects([])
        try {
            const response = await axios.post('http://localhost:8000/suggest', {
                skills,
                interests,
                experience,
                time_available
            })
            console.log(response.data)
            setProjects(response.data.project_ideas)
        } catch (err) {
            setError('Failed to fetch projects. Please try again later.')
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="flex flex-col gap-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Discover</h2>
                <p className="text-sm text-gray-500 mt-1">Tell me about yourself and I'll suggest projects that are a great fit for you.</p>
            </div>
            
            <div className='flex flex-col gap-4'>
                <FormField label="Skills">
                    <input 
                        type="text"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder='e.g. Python, React, SQL'
                        className={inputClass} 
                    />
                </FormField>

                <FormField label="Interests">
                    <input
                        type="text"
                        value={interests}
                        onChange={(e) => setInterests(e.target.value)}
                        className={inputClass}
                        placeholder='e.g. Web Development, Machine Learning, AI'
                    />
                </FormField>

                <FormField label="Experience Level">
                    <Dropdown
                        value={experience}
                        onChange={setExperience}
                            options={[
                                { label: 'Beginner', value: 'beginner' },
                                { label: 'Intermediate', value: 'intermediate' },
                                { label: 'Advanced', value: 'advanced' }
                            ]}
                        />
                </FormField>

                <FormField label="Time Available">
                    <input
                        value={time_available}
                        onChange={(e) => setTimeAvailable(e.target.value)}
                        className={inputClass}
                        placeholder='e.g. 2 weeks, 1 month, 3 months'
                    />
                </FormField>

                <button
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading ? 'Finding projects...' : 'Suggest Projects'}
                </button>
            </div>

            {projects && projects.length > 0 && (
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold text-gray-900">Here are your projects ideas</h3>
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Discover