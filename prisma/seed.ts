import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    // 1. Admin User
    const password = await bcrypt.hash('admin', 10)
    const admin = await prisma.user.upsert({
        where: { email: 'admin@legal.tech' },
        update: { password },
        create: {
            email: 'admin@legal.tech',
            name: 'Admin User',
            password,
            role: 'admin',
            image: 'https://ui-avatars.com/api/?name=Admin+User&background=4f46e5&color=fff'
        },
    })
    console.log({ admin })

    // 2. Clients
    const client1 = await prisma.client.create({
        data: {
            name: 'Acme Corp Egypt',
            email: 'contact@acme.eg',
            phone: '+20100000001',
            companyName: 'Acme International',
            status: 'Active',
            totalUnpaid: '15,000 EGP'
        }
    })

    const client2 = await prisma.client.create({
        data: {
            name: 'Nile Tech Solutions',
            email: 'info@niletech.com',
            phone: '+20120000002',
            companyName: 'Nile Tech',
            status: 'Active',
            totalUnpaid: '0 EGP'
        }
    })
    console.log('Seeded Clients:', client1.name, client2.name)

    // 3. Companies
    await prisma.company.create({
        data: {
            name: 'Acme Trade LLC',
            jurisdiction: 'Cairo',
            clientId: client1.id,
            status: 'Compliant'
        }
    })
    await prisma.company.create({
        data: {
            name: 'Nile Systems S.A.E',
            jurisdiction: 'Giza',
            clientId: client2.id,
            status: 'Review Needed'
        }
    })
    console.log('Seeded Companies')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
