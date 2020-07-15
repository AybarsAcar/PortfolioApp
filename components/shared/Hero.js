function Hero() {
  return (
    <section className="fj-hero">
      <div className="fj-hero-wrapper row">
        <div className="hero-left col-md-6">
          <h1 className="white hero-title">
            Hey I'm Aybars. Experienced full stack developer
          </h1>
          <h2 className="white hero-subtitle">
            Check my portfolio and video tutorials
          </h2>
          <div className="button-container">
            <a href="" className="btn btn-main bg-blue ttu">
              See my work
            </a>
          </div>
        </div>
        <div className="hero-right col-md-6">
          <div className="hero-image-container">
            <a className="grow hero-link">
              <img
                className="hero-image"
                src="https://media-exp1.licdn.com/dms/image/C5603AQE7MqKzyYFt-Q/profile-displayphoto-shrink_400_400/0?e=1600300800&v=beta&t=bYYzjOCExL1oRQxzgDy9ue3qYYwVNTq6NByQREXgC3c"
              ></img>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
