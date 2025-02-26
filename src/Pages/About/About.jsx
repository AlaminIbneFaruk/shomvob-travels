import { Helmet } from "react-helmet";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Helmet>
        <title>About | Shomvob Travels</title>
      </Helmet>

      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">About Shomvob Travels</h1>
        <p className="text-lg text-gray-600">
          Your trusted platform for unforgettable travel experiences. We connect tourists with experienced guides to ensure smooth and memorable journeys.
        </p>
      </div>

      <div className="mt-10">
        <div className="card bg-base-100 shadow-xl p-6">
          <div className="avatar flex justify-center">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="your-profile-image-url.jpg" alt="Developer" />
            </div>
          </div>
          <div className="text-center mt-4">
            <h2 className="text-2xl font-semibold text-primary">Al-Amin Ibne Faruk (Ayon)</h2>
            <p className="text-gray-600">Full-Stack Web Developer | Passionate about building scalable applications</p>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-center text-secondary">Projects</h3>
            <ul className="list-none text-center space-y-2 mt-2">
              <li>
                <a href="your-project-link-1" className="link link-primary">
                  🌍 Tourism Management System
                </a>
              </li>
              <li>
                <a href="your-project-link-2" className="link link-primary">
                  🏛️ Artifacts Management
                </a>
              </li>
              <li>
                <a href="your-project-link-3" className="link link-primary">
                  ✍️ Blog Management System
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold text-secondary">Connect with Me</h3>
            <div className="flex justify-center gap-4 mt-2">
              <a href="your-portfolio-link" className="btn btn-primary btn-sm">Portfolio</a>
              <a href="your-github-link" className="btn btn-accent btn-sm">GitHub</a>
              <a href="your-linkedin-link" className="btn btn-secondary btn-sm">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
