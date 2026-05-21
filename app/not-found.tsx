import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home, Search, Wrench } from "lucide-react";
import styles from "./not-found.module.scss";

export const metadata: Metadata = {
  title: "404: Page Escaped | Athenatec",
  description: "The page you were looking for has rolled off the line.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className={styles.notFound}>
      <section className={styles.inner} aria-labelledby="not-found-title">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <Wrench size={17} aria-hidden="true" />
            Missing page report
          </p>
          <h1 id="not-found-title">404</h1>
          <h2>This page escaped the production line.</h2>
          <p>
            Our tiny robot inspected the conveyor, checked under the dashboard,
            and filed a very serious note: this URL went out for a snack.
          </p>

          <div className={styles.actions} aria-label="Helpful links">
            <Link href="/" className={styles.primaryAction}>
              <Home size={18} aria-hidden="true" />
              Back home
            </Link>
            <Link href="/solutions/mes" className={styles.secondaryAction}>
              <Search size={18} aria-hidden="true" />
              Browse solutions
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className={styles.stage} aria-hidden="true">
          <div className={styles.statusLight} />
          <div className={styles.sign}>
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </div>

          <div className={styles.runawayPage}>
            <span />
            <span />
            <span />
          </div>

          <div className={styles.robot}>
            <div className={styles.antenna} />
            <div className={styles.head}>
              <span className={styles.eye} />
              <span className={styles.eye} />
              <span className={styles.mouth} />
            </div>
            <div className={styles.body}>
              <span className={styles.gauge} />
              <span className={styles.badge}>?</span>
            </div>
            <span className={styles.leftArm} />
            <span className={styles.rightArm} />
            <span className={styles.leftLeg} />
            <span className={styles.rightLeg} />
          </div>

          <div className={styles.conveyor}>
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className={styles.floorShadow} />
        </div>
      </section>
    </main>
  );
}
