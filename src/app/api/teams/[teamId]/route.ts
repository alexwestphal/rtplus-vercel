
import { NextRequest } from 'next/server'

import { createObjectResponse } from '@/lib/api/common'
import prisma from '@/lib/prisma'

import type { TeamWithMembers } from '@/lib/api/teams'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest, { params }: { params: { teamId: string } }) {
    

    const team: TeamWithMembers | null = await prisma.team.findFirst({
        include: {
            memberships: {
                include: {
                    person: true
                }
            },
        },
        where: {
            id: params.teamId
        }
    })

    if(team) return Response.json(createObjectResponse(team))
    else return new Response(`Team (${params.teamId}) not found.`, { status: 404 })
}