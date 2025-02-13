"use client"

export default function Error({error} : {error: Error}) {
    return <div>{error.message || "Something went wrong !"}</div>
}