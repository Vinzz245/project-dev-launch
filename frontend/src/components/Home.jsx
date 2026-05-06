function Home({setaActiveTab}) {
    const features = [
        {
            title: "Discover",
            description: "Don't know what to build? Tell me about your skills and interests and I'll suggest projects tailored for you.",
            tab: "Discover"
        },
        {
            title: "Evaluate",
            description: "Already have an idea? I'll help you break it down into manageable steps, identify skill gaps, flag risks and tell you if it's feasible.",
            tab: "Evaluate"
        },
        {
            title: "Build",
            description: "Stuck mid-project? Describe your blocker and I'll help you work through it.",
            tab: "Build"
        }
    ]

    return (
        <div className = "flex flex-col items-center text-center mt-16 gap-12">
            <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                    Welcome to Project DevLaunch
                </h1>
                <div className="text-lg text-gray-500 max-w-3xl mt-4">
                    <p>Turning ideas into reality!</p>
                    <p>Your AI-powered assistant for discovering, evaluating, and building your projects.</p>
                </div>
                <button onClick={() => setActiveTab("Discover")} className="mt-4 self-center px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors duration-200">
                    Get Started
                </button>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-4 w-full">
                {features.map((feature) => (
                    <div key={feature.title} className="cursor-pointer border border-gray-200 rounded-xl p-6 text-left transition-all duration-200 bg-white shadow-md hover:shadow-lg transition" onClick={() => setaActiveTab(feature.tab)}>
                        <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
   
}

export default Home