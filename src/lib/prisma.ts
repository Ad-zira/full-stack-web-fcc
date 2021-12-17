import Prisma, * as PrismaAll from "@prisma/client"

// using optional chaining
// depending on whether we run on our environment here or on vercel, Prisma or PrismaAll will be undefined, one of the two, and it's the opposite way depending on the environment we're on 
const PrismaClient = Prisma?.PrismaClient || PrismaAll?.PrismaClient;
export default PrismaClient; 
// with this, we don't have to worry anywhere else in the code whether `Prisma` approach loaded to correct client, or `* as PrismaAll` approach do, either one is picked and export to PrismaClient 