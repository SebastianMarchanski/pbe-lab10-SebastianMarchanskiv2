import "../app/global.css";

export default function Footer() {
  const currentDate = new Date().toLocaleDateString();

  return (
    <footer className="footer">
      <p>Autor: Sebastian Marchańskis</p>
      <p>Data: {currentDate}</p>
      <p>
        <a href="https://pk.edu.pl" target="_blank" rel="noopener noreferrer">
          Politechnika Krakowska
        </a>
      </p>
    </footer>
  );
}
