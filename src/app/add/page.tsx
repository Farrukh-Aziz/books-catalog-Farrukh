"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AddBook() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You need to be signed in to add books.</p>
        </div>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!formData.title.trim() || !formData.author.trim() || !formData.genre.trim()) {
      setError("All fields are required")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/")
      } else {
        const data = await response.json()
        setError(data.error || "Failed to add book")
      }
    } catch (err) {
      setError("Failed to add book")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Book</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter book title"
              required
            />
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              Author *
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter author name"
              required
            />
          </div>

          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-2">
              Genre *
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter book genre"
              required
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-md text-sm font-medium"
            >
              {loading ? "Adding..." : "Add Book"}
            </button>
            
            <button
              type="button"
              onClick={() => router.push("/")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
