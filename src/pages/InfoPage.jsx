import "../styles/infoPage.scss";

const Home = () => {
  return (
    <div className="info-container">
      <div class="intro">
            <h1>Welcome to my demo Full Stack React JS Project</h1>
            <p>Explore our cutting-edge web application, crafted with a blend of modern technologies and innovative design patterns. Our project showcases a comprehensive skill set in full stack development, particularly emphasizing ReactJS and .NET Core.</p>
        </div>
        <div class="skills-section">
            <h2>Demo Technical Proficiencies</h2>

            <h3 class="skill-category">Development Platforms</h3>
            <ul>
                <li>.NET Core Development Environment</li>
                <li>Microsoft Azure</li>
            </ul>

            <h3 class="skill-category">Programming</h3>
            <ul>
                <li>ReactJS and Redux Toolkit</li>
                <li>NodeJS</li>
                <li>Microsoft SQL and Transact SQL</li>
                <li>LINQ and Entity Framework</li>
                <li>C#</li>
                <li>HTML, CSS, and Bootstrap</li>
                <li>JavaScript</li>
                <li>JSON and .NET Core API</li>
                <li>SQLite</li>
                <li>ADO.NET</li>
                <li>XAML</li>
                <li>PowerShell</li>
                <li>AZURE Cloud Services</li>
            </ul>

            <h3 class="skill-category">Tools</h3>
            <ul>
                <li>Git</li>
                <li>Microsoft Word</li>
            </ul>
        </div>
    </div>
  );
};

export default Home;
