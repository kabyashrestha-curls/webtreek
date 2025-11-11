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

function writeUsers(users: User[]) {
  fs.mkdirSync(path.dirname(dataPath), { recursive: true })
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2))
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body || {}

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const users = readUsers()
    const exists = users.some((u) => u.email.toLowerCase() === String(email).toLowerCase())
    if (exists) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }

    const newUser: User = {
      id: String(Date.now()),
      name: String(name),
      email: String(email).toLowerCase(),
      // Note: For demo only; do not store plaintext passwords in production
      password: String(password),
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    writeUsers(users)

    return NextResponse.json({ ok: true, user: { id: newUser.id, name: newUser.name, email: newUser.email } }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}


