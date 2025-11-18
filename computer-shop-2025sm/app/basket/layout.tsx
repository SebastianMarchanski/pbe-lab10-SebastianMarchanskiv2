export default function BasketLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <h2>Koszyk</h2>
      {children}
    </section>
  );
}
