import React from 'react';

const Dashboard = () => {
  // Dummy data for demonstration
  const cards = [
    { id: 1, title: "Card 1", content: "Content for card 1" },
    { id: 2, title: "Card 2", content: "Content for card 2" },
    { id: 3, title: "Card 3", content: "Content for card 3" },
    { id: 4, title: "Card 4", content: "Content for card 4" },
  ];

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
            <p>{card.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;