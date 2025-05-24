import React from "react";

const Dashboard: React.FC = () => {
  const metrics = [
    { label: "Total Modules", value: 42, icon: "📦" },
    { label: "Total Apps", value: 18, icon: "📱" },
    { label: "Total Menus", value: 55, icon: "📋" },
    { label: "New Entries Today", value: 7, icon: "🆕" },
  ];

  const recentEntries = [
    { id: 101, module: "Sales", app: "CRM", menu: "Clients", item: "John Doe", date: "2025-05-23" },
    { id: 102, module: "Inventory", app: "Warehouse", menu: "Stock", item: "Item #223", date: "2025-05-22" },
    { id: 103, module: "Support", app: "Helpdesk", menu: "Tickets", item: "Ticket #556", date: "2025-05-21" },
  ];


  const activityFeed = [
    { id: 1, user: "Admin", action: "Added new module 'Billing'", time: "2 hours ago" },
    { id: 2, user: "Admin", action: "Updated menu 'Clients'", time: "5 hours ago" },
    { id: 3, user: "User123", action: "Submitted new support ticket", time: "1 day ago" },
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

      {/* Recent Entries Table */}
      <section className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Entries</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-5 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                <th className="border border-gray-300 px-5 py-3 text-left text-sm font-medium text-gray-700">Module</th>
                <th className="border border-gray-300 px-5 py-3 text-left text-sm font-medium text-gray-700">App</th>
                <th className="border border-gray-300 px-5 py-3 text-left text-sm font-medium text-gray-700">Menu</th>
                <th className="border border-gray-300 px-5 py-3 text-left text-sm font-medium text-gray-700">Item</th>
                <th className="border border-gray-300 px-5 py-3 text-left text-sm font-medium text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentEntries.map(({ id, module, app, menu, item, date }) => (
                <tr
                  key={id}
                  className="hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => alert(`Clicked entry ${id}`)}
                >
                  <td className="border border-gray-300 px-5 py-3 text-sm text-gray-900">{id}</td>
                  <td className="border border-gray-300 px-5 py-3 text-sm text-gray-900">{module}</td>
                  <td className="border border-gray-300 px-5 py-3 text-sm text-gray-900">{app}</td>
                  <td className="border border-gray-300 px-5 py-3 text-sm text-gray-900">{menu}</td>
                  <td className="border border-gray-300 px-5 py-3 text-sm text-gray-900">{item}</td>
                  <td className="border border-gray-300 px-5 py-3 text-sm text-gray-900">{date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Activity Feed */}
      <section className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Activity Feed</h3>
        <ul className="divide-y divide-gray-200">
          {activityFeed.map(({ id, user, action, time }) => (
            <li key={id} className="py-3 flex justify-between items-center">
              <div>
                <p className="text-gray-900"><strong>{user}</strong> {action}</p>
              </div>
              <div className="text-sm text-gray-500">{time}</div>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm mt-12 mb-4 select-none">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved. v1.0.0
      </footer>
    </div>
  );
};

export default Dashboard;
