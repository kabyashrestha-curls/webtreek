'use server'

import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

type User = {
  id: string
  name: string
  email: string
  password: string
  createdAt: string
}

const dataPath = path.join(process.cwd(), 'data', 'users.json')

function readUsers(): User[] {
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body || {}
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
    }
    const users = readUsers()
    const user = users.find((u) => u.email.toLowerCase() === String(email).toLowerCase())
    if (!user || user.password !== String(password)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    return NextResponse.json({ ok: true, user: { id: user.id, name: user.name, email: user.email } }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}


