import { cookies } from 'next/headers'

export async function POST(request) {
  try {
    const { access, refresh } = await request.json()
    const cookieStore = cookies()

    // Configuration des cookies sécurisés
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    }

    // Access token avec une durée de vie plus courte (15 minutes)
    cookieStore.set('access_token', access, {
      ...cookieOptions,
      maxAge: 15 * 60 // 15 minutes en secondes
    })

    // Refresh token avec une durée de vie plus longue (7 jours)
    cookieStore.set('refresh_token', refresh, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 // 7 jours en secondes
    })

    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Erreur lors de la définition des cookies' }, { status: 500 })
  }
}

export async function DELETE() {
  const cookieStore = cookies()
  
  cookieStore.delete('access_token')
  cookieStore.delete('refresh_token')
  
  return Response.json({ success: true })
} 