const About = () => {
  return (
    <>
      <div className="card max-w-4xl mx-auto mt-32 mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            About Shomvob Travels
          </h1>
          <p className="text-lg text-gray-600">
            Your trusted platform for unforgettable travel experiences. We
            connect tourists with experienced guides to ensure smooth and
            memorable journeys.
          </p>
        </div>

        <div className="mt-10">
          <div className="card bg-base-100 shadow-lg hover:shadow-2xl p-6">
            <div className="avatar flex justify-center">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="" alt="Developer" />
              </div>
            </div>
            <div className="text-center mt-4">
              <h2 className="text-2xl font-semibold text-primary">
                Al-Amin Ibne Faruk (Ayon)
              </h2>
              <p className="text-gray-600">
                Full-Stack Web Developer | Passionate about building scalable
                applications
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-center text-secondary">
                Projects
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-between space-y-2 mt-2">
                
                  <a
                    href="https://shomvobtravels.netlify.app/"
                    className="link p-6 badge-primary link-white badge shadow-xl hover:shadow-2xl hover:scale-105 border-4 border-black"
                  >
                    🌍 Tourism Management System
                  </a>
                
                
                  <a
                    href="https://assignment-11-62e47.web.app/"
                    className="link p-6 link-primary badge shadow-xl hover:shadow-2xl hover:scale-105 border-4 border-black"
                  >
                    🏛️ Artifacts Management
                  </a>
                
                
                  <a
                    href="https://visabridge2.netlify.app/"
                    className="link p-6 link-black badge badge-info shadow-xl hover:shadow-2xl  hover:scale-105 border-4 border-black"
                  >
                    🛂 Visa Management System
                  </a>
                
              </div>
            </div>

            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold text-secondary">
                Connect with Me
              </h3>
              <div className="flex justify-center gap-4 mt-2">
                <a
                  href="your-portfolio-link"
                  className="btn btn-primary btn-sm"
                >
                  Portfolio
                </a>
                <a href="your-github-link" className="btn btn-accent btn-sm">
                  GitHub
                </a>
                <a
                  href="your-linkedin-link"
                  className="btn btn-secondary btn-sm"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
