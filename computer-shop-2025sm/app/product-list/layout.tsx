import styles from "./page.module.css";
export default function ProductListLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <h2 className={styles.title}>Lista produktów</h2>
      {children}
    </section>
  );
}
