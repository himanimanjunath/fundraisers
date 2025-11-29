"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, Calendar, MapPin, ExternalLink, Sparkles } from "lucide-react"
import styles from "./fundraisers.module.css"

interface Fundraiser {
  _id: string
  clubName: string
  eventName: string
  location: string
  date: string
  time: string
  proceedsInfo?: string
  instagramLink?: string
  createdAt?: string
  updatedAt?: string
}

export default function FundraisersPage() {
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "week" | "month">("all")

  const fetchFundraisers = async () => {
    try {
      setIsLoading(true)
      console.log("[v0] Fetching fundraisers...")
      const response = await fetch("/api/fundraisers")

      if (response.ok) {
        const data = await response.json()
        console.log("[v0] Fetched fundraisers:", data)
        setFundraisers(data)
      } else {
        console.error("Failed to fetch fundraisers")
      }
    } catch (error) {
      console.error("Error fetching fundraisers:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFundraisers()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      fetchFundraisers()
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  // ---- DATE HELPERS -------------------------------------------------------

  const getEventDate = (f: Fundraiser): Date | null => {
    if (!f.date) return null

    const time = f.time || "00:00"
    const iso = `${f.date}T${time}`
    const dt = new Date(iso)
    return isNaN(dt.getTime()) ? null : dt
  }

  const formatDateTime = (f: Fundraiser) => {
    const dt = getEventDate(f)

    if (!dt) {
      return {
        dateStr: f.date || "Date TBA",
        timeStr: f.time || "",
      }
    }

    const dateStr = dt.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })

    const timeStr = dt.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })

    return { dateStr, timeStr }
  }

  // ---- FILTERING ----------------------------------------------------------

  const getFilteredFundraisers = () => {
    if (filter === "all") return fundraisers

    const now = new Date()

    if (filter === "week") {
      const inSevenDays = new Date()
      inSevenDays.setDate(now.getDate() + 7)

      return fundraisers.filter((f) => {
        const dt = getEventDate(f)
        if (!dt) return false
        return dt >= now && dt <= inSevenDays
      })
    }

    if (filter === "month") {
      const currentMonth = now.getMonth()
      const currentYear = now.getFullYear()

      return fundraisers.filter((f) => {
        const dt = getEventDate(f)
        if (!dt) return false
        return dt.getMonth() === currentMonth && dt.getFullYear() === currentYear
      })
    }

    return fundraisers
  }

  const filteredFundraisers = getFilteredFundraisers()
  const hasAny = fundraisers.length > 0
  const noneForFilter = filteredFundraisers.length === 0 && hasAny

  const count = filteredFundraisers.length
  const isEmptyCount = count === 0
  const countLabel = `${count} active fundraiser${count === 1 ? "" : "s"}`

  // ---- RENDER -------------------------------------------------------------

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo}>
            <Heart className={styles.logoIcon} />
            <span className={styles.logoText}>Aggie Fundraisers</span>
          </Link>
          <nav className={styles.nav}>
            <Link href="/create">
              <button className={styles.navButton}>Create</button>
            </Link>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.pageTitle}>Active Fundraisers</h1>
              <p className={styles.pageDescription}>
                Browse all active fundraisers and choose a cause to support
              </p>
            </div>
          </div>

          <div className={styles.filterBar}>
            <div className={styles.filterGroup}>
              <button
                type="button"
                className={`${styles.filterButton} ${
                  filter === "week" ? styles.filterButtonActive : ""
                }`}
                onClick={() => setFilter("week")}
              >
                This Week
              </button>
              <button
                type="button"
                className={`${styles.filterButton} ${
                  filter === "month" ? styles.filterButtonActive : ""
                }`}
                onClick={() => setFilter("month")}
              >
                This Month
              </button>
              <button
                type="button"
                className={`${styles.filterButton} ${
                  filter === "all" ? styles.filterButtonActive : ""
                }`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
            </div>

            <div
              className={`${styles.countPill} ${
                isEmptyCount ? styles.countPillRed : styles.countPillGreen
              }`}
            >
              <Sparkles className={styles.countIcon} />
              <span>{countLabel}</span>
            </div>
          </div>

          {/* Global empty state: no fundraisers at all */}
          {!hasAny && !isLoading ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyHero}>
                <span
                  className={styles.emptyIcon}
                  style={{ fontSize: "60px" }}
                  aria-hidden="true"
                >
                  💔
                </span>
                <h3 className={styles.emptyTitle}>No fundraisers yet</h3>
                <div style={{ marginTop: "4px" }}>
                  <p className={styles.emptyText}>
                    Downtown Davis is ready for your next event. Start a
                    fundraiser to help your club reach its goals.
                  </p>
                  <p className={styles.emptyText}>
                    You&apos;re one step closer to making a difference.
                  </p>
                </div>
              </div>

              <div className={styles.emptyProgress}>
                <div className={styles.progressBar}>
                  <div className={styles.progressBarFill} />
                </div>
              </div>

              <div className={styles.emptyActions}>
                <Link href="/create">
                  <button className={styles.primaryButton}>
                    Make an impact now
                  </button>
                </Link>
                <Link href="/how-it-works">
                  <button className={styles.secondaryButton}>Learn more</button>
                </Link>
              </div>
            </div>
          ) : noneForFilter ? (
            <p className={styles.filterEmpty}>
              No fundraisers match{" "}
                <strong>{filter === "week" ? "this week" : "this month"}</strong>.
              Try another filter.
            </p>
          ) : isLoading ? (
            <div className={styles.grid}>
              {[1, 2, 3].map((i) => (
                <div key={i} className={`${styles.card} ${styles.skeleton}`}>
                  <div className={styles.skeletonHeader} />
                  <div className={styles.skeletonBody} />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.grid}>
              {filteredFundraisers.map((fundraiser) => {
                const { dateStr, timeStr } = formatDateTime(fundraiser)

                return (
                  <div key={fundraiser._id} className={styles.card}>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.cardTitle}>
                        {fundraiser.eventName}
                      </h3>
                      <span className={styles.badge}>
                        {fundraiser.clubName}
                      </span>
                    </div>

                    {fundraiser.proceedsInfo && (
                      <p className={styles.cardDescription}>
                        {fundraiser.proceedsInfo}
                      </p>
                    )}

                    <div className={styles.cardDetails}>
                      <div className={styles.detail}>
                        <MapPin className={styles.detailIcon} />
                        <span>{fundraiser.location}</span>
                      </div>
                      <div className={styles.detail}>
                        <Calendar className={styles.detailIcon} />
                        <span>
                          {dateStr}
                          {timeStr ? ` at ${timeStr}` : ""}
                        </span>
                      </div>
                    </div>

                    {fundraiser.instagramLink && (
                      <div className={styles.cardFooter}>
                        <a
                          href={fundraiser.instagramLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.instagramButton}
                        >
                          View on Instagram
                          <ExternalLink className={styles.buttonIcon} />
                        </a>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
