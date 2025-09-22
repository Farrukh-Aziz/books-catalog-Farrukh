import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// DELETE /api/books/[id] - Delete a book
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = params

    const book = await prisma.book.findUnique({
      where: { id }
    })

    if (!book) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      )
    }

    await prisma.book.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Book deleted successfully' })
  } catch (error) {
    console.error('Error deleting book:', error)
    return NextResponse.json(
      { error: 'Failed to delete book' },
      { status: 500 }
    )
  }
}
