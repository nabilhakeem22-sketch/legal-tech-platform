import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "file:./dev.db"
        }
    }
})

async function main() {
    console.log('Connecting...');
    try {
        const count = await prisma.user.count();
        console.log('User count:', count);

        const password = await bcrypt.hash('admin', 10);
        const admin = await prisma.user.upsert({
            where: { email: 'admin@legal.tech' },
            update: { password }, // Ensure pass is updated
            create: {
                email: 'admin@legal.tech',
                name: 'Admin User',
                password,
                role: 'admin',
                image: 'https://ui-avatars.com/api/?name=Admin+User&background=4f46e5&color=fff'
            },
        });
        console.log('Admin user upserted:', admin);
    } catch (e) {
        console.error('Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
