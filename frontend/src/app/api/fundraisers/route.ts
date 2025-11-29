// frontend/src/app/api/fundraisers/route.ts

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:4001"

// GET /api/fundraisers  – called by the Fundraisers page
export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/fundraisers`, {
      cache: "no-store",
    })

    if (!res.ok) {
      console.error("Backend GET /api/fundraisers failed:", res.status)
      return new Response("Backend error", { status: 500 })
    }

    const data = await res.json()

    // Normalize to match the Fundraiser interface in page.tsx
    const mapped = data.map((f: any) => ({
      _id: f._id,
      clubName: f.clubName,
      // handle both eventName and fundraiserName just in case
      eventName: f.eventName ?? f.fundraiserName ?? "",
      location: f.location,
      date: f.date ?? "",   // 👈 important
      time: f.time ?? "",   // 👈 important
      proceedsInfo: f.proceedsInfo,
      instagramLink: f.instagramLink,
      createdAt: f.createdAt,
      updatedAt: f.updatedAt,
    }))

    return Response.json(mapped)
  } catch (err) {
    console.error("Error fetching fundraisers from backend:", err)
    return new Response("Internal server error", { status: 500 })
  }
}

// POST /api/fundraisers – called by the Create form
export async function POST(request: Request) {
  try {
    const body = await request.json()

    const res = await fetch(`${BACKEND_URL}/api/fundraisers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error("Backend POST /api/fundraisers failed:", res.status, text)
      return new Response("Backend error", { status: 500 })
    }

    const created = await res.json()
    return Response.json(created, { status: 201 })
  } catch (err) {
    console.error("Error creating fundraiser:", err)
    return new Response("Internal server error", { status: 500 })
  }
}
