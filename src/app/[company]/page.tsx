import { notFound } from "next/navigation"

export default async function Home({ params }: { params: { company: string } }) {
    if (params.company !== "1" && params.company !== "2") {
        return notFound()
    }
    return <div></div>
}