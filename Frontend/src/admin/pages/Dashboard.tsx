import React from "react";

const Dashboard: React.FC = () => {
  const metrics = [
    { label: "Total Modules", value: 42, icon: "📦" },
    { label: "Total Category", value: 18, icon: "📱" },
    { label: "Total Apps", value: 55, icon: "📋" },
    { label: "New Entries Today", value: 7, icon: "🆕" },
  ];



  const summaryCards = [
    { label: "Pending Approvals", value: 5, icon: "⏳" },
    { label: "Errors Logged", value: 2, icon: "⚠️" },
    { label: "Active Users", value: 134, icon: "👥" },
  ];

  return (
    <div className="">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h2 className="text-3xl font-light text-gray-800">Dashboard</h2>
        <p className="text-gray-600">Welcome back, Admin!</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map(({ label, value, icon }) => (
          <div
            key={label}
            className="bg-white rounded-lg shadow p-6 flex items-center space-x-5 hover:shadow-lg transition cursor-default"
          >
            <div className="text-4xl">{icon}</div>
            <div>
              <p className="text-3xl font-semibold text-gray-900">{value}</p>
              <p className="text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>


      {/* Summary Cards */}
      <section className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {summaryCards.map(({ label, value, icon }) => (
          <div
            key={label}
            className="bg-white rounded-lg shadow p-6 flex items-center space-x-4 hover:shadow-lg transition cursor-default"
          >
            <div className="text-4xl">{icon}</div>
            <div>
              <p className="text-3xl font-semibold text-gray-900">{value}</p>
              <p className="text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </section>



      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm mb-auto select-none">
        &copy; {new Date().getFullYear()} Sim Solutions. All rights reserved. v1.0.0
      </footer>
    </div>
  );
};

export default Dashboard;
