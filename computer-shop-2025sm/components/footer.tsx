import "../app/global.css";

export default function Footer() {
  const currentDate = new Date().toLocaleDateString();

  return (
    <footer className="bg-blue-900 text-center text-sm p-4">
      <p className="mb-1">Autor: Sebastian Marchański</p>
      <p className="mb-1">Data: {currentDate}</p>
      <p>
        <a
          href="https://pk.edu.pl"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:underline"
        >
          Politechnika Krakowska
        </a>
      </p>
    </footer>
  );
}

