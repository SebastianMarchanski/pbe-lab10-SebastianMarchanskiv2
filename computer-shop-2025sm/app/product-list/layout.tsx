export default function ProductListLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <h2>Lista produktów</h2>
      {children}
    </section>
  );
}
