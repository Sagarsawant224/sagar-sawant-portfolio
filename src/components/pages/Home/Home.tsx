import "./Home.css";
import profilePhoto from "../../../assets/sagarsawant.jpg";

function Home() {
  return (
    <section className="home">
      <div className="home__container">
        <div className="home__photo">
          <img
            src={profilePhoto}
            alt="Sagar Sawant"
            className="home__photo-image"
          />
        </div>

        <div className="home__content">
          <h1 className="home__heading">Hello</h1>

          <h2 className="home__subheading">
            A Bit About Me
          </h2>

          <p className="home__text">
            I'm Sagar Sawant, a Software Engineer with experience building
            scalable cloud-native applications using AWS, Node.js, and modern
            engineering practices.
          </p>

          <p className="home__text">
            Over the past few years, I have worked on backend services,
            serverless architectures, automation solutions, and large-scale
            cloud platforms. I enjoy solving complex technical challenges and
            creating systems that are reliable, efficient, and easy to maintain.
          </p>

        </div>
      </div>
    </section>
  );
}

export default Home;