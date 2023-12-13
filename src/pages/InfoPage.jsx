import "../styles/infoPage.scss";
import screenshot from "../static/img/Screenshot-MyDraft-Demo.png";

const Home = () => {
  return (
    <div className="info-container">
      <div style={{ marginRight: '0.5rem' }}>
        <img className="draft-player-info-card__image" src={screenshot} height={500} style={{ border: '' }}  alt="MyDraft Logo" />
        <div className="intro">
          <h1>Welcome to my demo Full Stack React JS Project</h1>
          <p>
            Explore MyDraft Fantasy Demo single-page web application, crafted with a blend
            of modern technologies and innovative design patterns. The project
            showcases a comprehensive skill set in full stack development,
            particularly emphasizing ReactJS and .NET Core.
          </p>
          <br />
          <p>
            <span style={{ fontWeight: "700", paddingRight: "0.5rem" }}>
              NOTE:
            </span>
            The demo serves as a platform to showcase technical discipline. It leverages legacy 
            data from the Windows Universal App, 'MyDraft Fantasy,' which was released on the 
            Windows App Store in 2017. This demonstration is strategically designed to adopt a 
            Software as a Service (SaaS) model, illustrating how outdated resources can be 
            repurposed within modern service-oriented architectures.
          </p>
        </div>
      </div>
      <div className="skills-section">
        <h2>MyDraft Demo Technical Proficiencies</h2>

        <h3 className="skill-category">Development Platforms</h3>
        <ul>
          <li>.NET Core Development Environment</li>
          <li>Microsoft Azure</li>
        </ul>

        <h3 className="skill-category">Programming</h3>
        <ul>
          <li>ReactJS and Redux Toolkit</li>
          <li>NodeJS</li>
          <li>Microsoft SQL and Transact SQL</li>
          <li>LINQ and Entity Framework - Code First</li>
          <li>C#</li>
          <li>ASP.NET Core Identity Framework</li>
          <li>HTML, CSS, and Bootstrap</li>
          <li>JavaScript</li>
          <li>JSON and .NET Core API</li>
          <li>SQLite</li>
          <li>ADO.NET</li>
          <li>SQL Server Integration Service</li>
          <li>XAML</li>
          <li>PowerShell</li>
          <li>AZURE Cloud Services</li>
        </ul>

        <h3 className="skill-category">Tools</h3>
        <ul>
          <li>Git</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
