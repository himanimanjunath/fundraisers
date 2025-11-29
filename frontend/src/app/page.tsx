import Link from "next/link"
import { Heart, Calendar, MapPin } from "lucide-react"
import styles from "./page.module.css"

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <Heart className={styles.logoIcon} />
            <span className={styles.logoText}>Aggie Fundraisers</span>
          </div>
          <nav className={styles.nav}>
            <Link href="/fundraisers">
              <button className={styles.navButton}>Browse</button>
            </Link>
            <Link href="/login">
              <button
                className={`${styles.navButton} ${styles.navButtonOutline}`}
              >
                Login
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <span>Supporting UC Davis Clubs</span>
            </div>

            <h1 className={styles.heroTitle}>Shop Davis. Fuel UC Davis.</h1>

            <p className={styles.heroDescription}>
              {
                "Shop, dine, and hang out at downtown Davis while supporting campus organizations and their fundraising goals all in one place"
              }
            </p>

            <div className={styles.heroButtons}>
              <Link href="/fundraisers">
                <button className={styles.primaryButton}>Start Supporting</button>
              </Link>

              <Link href="/create">
                <button className={styles.secondaryButton}>
                  Create Fundraiser
                </button>
              </Link>

              {/* NEW navy Learn more button */}
              <Link href="/how-it-works">
                <button className={styles.primaryButton}>Learn more</button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.features}>
          <div className={styles.featuresContent}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Heart />
              </div>
              <h3 className={styles.featureTitle}>Support Local Clubs</h3>
              <p className={styles.featureDescription}>
                Help UC Davis student organizations raise funds for their
                activities and events
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Calendar />
              </div>
              <h3 className={styles.featureTitle}>Find Events</h3>
              <p className={styles.featureDescription}>
                Discover fundraising events happening around downtown Davis in
                one convenient place.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <MapPin />
              </div>
              <h3 className={styles.featureTitle}>Shop & Support</h3>
              <p className={styles.featureDescription}>
              Turn everyday coffee runs, desserts, and dinners into funding for
              UC Davis organizations
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© 2025 #include</p>
        </div>
      </footer>
    </div>
  )
}
