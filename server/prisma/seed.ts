import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main(){
  const user = await prisma.user.create({
    data: { 
      name: "John Doe",
      email: "johndoes@example.com",
      avatarUrl: "https://github.com/manoellvitor",
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: "Example Pool",
      code: "BOL123",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-05T15:35:39.704Z',
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "DE"
    }
  })


  await prisma.game.create({
    data: {
      date: '2022-11-07T15:35:39.704Z',
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "DE",

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,
          
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })
}

main()