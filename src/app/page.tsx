"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Link from "next/link"

interface Book {
  id: string
  title: string
  author: string
  genre: string
  createdAt: string
}

export default function Home() {
  const { data: session } = useSession()
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await fetch("/api/books")
      if (response.ok) {
        const data = await response.json()
        setBooks(data)
      } else {
        setError("Failed to fetch books")
      }
    } catch (err) {
      setError("Failed to fetch books")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return

    try {
      const response = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      })
      
      if (response.ok) {
        setBooks(books.filter(book => book.id !== id))
      } else {
        alert("Failed to delete book")
      }
    } catch (err) {
      alert("Failed to delete book")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading books...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Catalog</h1>
        {session && (
          <Link
            href="/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Add New Book
          </Link>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {books.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No books found</div>
          {session && (
            <Link
              href="/add"
              className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Add the first book
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {book.title}
              </h3>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Author:</span> {book.author}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-medium">Genre:</span> {book.genre}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Added: {new Date(book.createdAt).toLocaleDateString()}
              </p>
              {session && (
                <button
                  onClick={() => handleDelete(book.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
