import Header from "../components/Header";
import About from "../components/About";
import Skills from "../components/Skills";

const mySkills = ["Python", "DBMS", "DSA", "Node.js"];

function Home() {
  return (
    <>
      <Header name="Janvi" themeColor="#3e4c59" />
      <About />
      <Skills skillList={mySkills} />
    </>
  );
}

export default Home;
