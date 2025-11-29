import Link from "next/link"

const STARTER_TEMPLATES = [
  "Bake sale in the MU quad",
  "Fundraiser night at a downtown restaurant",
  "Raffle at a club showcase",
  "Merch/table at the CoHo",
]

export default function HowItWorksPage() {
  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "3rem 1.5rem",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Page header */}
      <header style={{ marginBottom: "2rem" }}>
        <p
          style={{
            fontSize: "0.9rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#6b7280",
            marginBottom: "0.25rem",
          }}
        >
          Learn more
        </p>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            margin: 0,
            color: "#111827",
          }}
        >
          How fundraisers work in Aggie Fundraisers
        </h1>
        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "1rem",
            color: "#4b5563",
          }}
        >
          Get inspired by a recent success and explore ideas for your club&apos;s
          first fundraiser.
        </p>
      </header>

      {/* Impact highlight card */}
      <section
        style={{
          borderRadius: "1.25rem",
          border: "1px solid #e5e7eb",
          padding: "1.5rem 1.75rem",
          background: "#f9fafb",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "0.75rem",
            marginBottom: "0.75rem",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              padding: "0.2rem 0.6rem",
              borderRadius: "999px",
              background: "#eff6ff",
              color: "#1d4ed8",
              fontWeight: 500,
            }}
          >
            Impact highlight
          </span>
          <span
            style={{
              fontSize: "0.8rem",
              padding: "0.15rem 0.7rem",
              borderRadius: "999px",
              background: "#fef3c7",
              color: "#92400e",
              fontWeight: 500,
            }}
          >
            AggieTHON
          </span>
        </div>

        <p
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            margin: 0,
            color: "#111827",
          }}
        >
          $2,000
        </p>
        <p
          style={{
            marginTop: "0.35rem",
            fontSize: "0.95rem",
            color: "#4b5563",
          }}
        >
          raised for student wellness at last month&apos;s downtown fundraiser
          night.
        </p>
      </section>

      {/* Starter ideas */}
      <section
        style={{
          borderRadius: "1.25rem",
          border: "1px solid #e5e7eb",
          padding: "1.5rem 1.75rem",
          marginBottom: "2rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.2rem",
            fontWeight: 600,
            margin: 0,
            marginBottom: "0.5rem",
            color: "#111827",
          }}
        >
          Need ideas?
        </h2>
        <p
          style={{
            margin: 0,
            marginBottom: "0.9rem",
            fontSize: "0.95rem",
            color: "#4b5563",
          }}
        >
          Try one of these starter ideas for your first fundraiser:
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {STARTER_TEMPLATES.map((template) => (
            <span
              key={template}
              style={{
                padding: "0.35rem 0.7rem",
                borderRadius: "999px",
                border: "1px solid #e5e7eb",
                background: "#fff",
                fontSize: "0.85rem",
                color: "#374151",
              }}
            >
              {template}
            </span>
          ))}
        </div>
      </section>

      {/* Back link */}
      <footer>
        <Link href="/fundraisers">
          <span
            style={{
              fontSize: "0.9rem",
              color: "#1d4ed8",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            ← Back to Active Fundraisers
          </span>
        </Link>
      </footer>
    </main>
  )
}
