import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

// Temporary HomePage component (we'll move this to separate file later)
function HomePage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">Samplify</h1>
        <p className="text-xl text-gray-600 mb-8">
          Fashion E-Commerce Platform
        </p>
        <div className="space-y-2 text-sm text-gray-500">
          <p>✅ React + Vite working</p>
          <p>✅ Tailwind CSS configured</p>
          <p>✅ React Router installed</p>
          <p>✅ Ready to build features!</p>
        </div>
      </div>
    </div>
  );
}

export default App;
