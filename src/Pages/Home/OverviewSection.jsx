import Multimedia from "./Multimedia";

const OverviewSection = () => {
  const features = [
    {
      title: "Easy Booking",
      description:
        "Streamlined tour package booking with real-time availability",
      icon: "📅",
    },
    {
      title: "Expert Guides",
      description: "Choose from experienced travel guides for each tour type",
      icon: "🧑‍🏫",
    },
  ];

  return (
    <section className="bg-sky-200 py-12 px-6 md:px-12 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Overview
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Explore the powerful features of our Tourism Management System,
            designed to enhance user experience and streamline operations.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Features Section */}
          <div className="w-full md:w-1/4">
            <div className="flex flex-col gap-20 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="card bg-white rounded-lg py-6 shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="card-body">
                    <span className="text-3xl mb-4 block">{feature.icon}</span>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Multimedia Section */}
          <div className="w-full h-auto md:w-3/4">
            <Multimedia />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
