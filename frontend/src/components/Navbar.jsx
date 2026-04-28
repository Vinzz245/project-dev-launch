function Navbar({activeTab, setActiveTab}) {
    const tabs = ['Home', 'Discover', 'Evaluate', 'Build']
    return (
        <nav className="w-full border-b border-gray-200 px-12 py-6 flex items-center justify-between bg-white">
            <span className="text-xl font-semibold tracking-tight text-gray-900">
                ProjectDevLaunch
            </span>
            <div className="flex gap-6">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-sm font-medium transitino-colors duration-200 ${
                            activeTab === tab 
                            ? 'text-gray-900 border-b-2 border-gray-900 pb-1' 
                            : 'text-gray-400 hover:text-gray-700'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </nav>
    )
}

export default Navbar