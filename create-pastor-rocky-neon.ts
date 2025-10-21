import bcrypt from 'bcryptjs';
import { db } from './server/db';
import { users } from './shared/schema';

async function createPastorRocky() {
  try {
    console.log('Creating Pastor Rocky user in Neon database...');
    
    // Hash the password
    const hashedPassword = await bcrypt.hash('Rocky123', 10);
    
    // Create the user
    const [newUser] = await db.insert(users).values({
      id: 'pastor-rocky-' + Date.now(),
      username: 'pastorrocky',
      email: 'pastor@sfgmboston.com',
      password: hashedPassword,
      firstName: 'Pastor',
      lastName: 'Rocky',
      role: 'dean',
      gender: 'Male',
      profileCompleted: true,
      emailVerified: true,
      createdAt: new Date()
    }).returning();
    
    console.log('✅ Pastor Rocky user created successfully!');
    console.log('Username: pastorrocky');
    console.log('Password: Rocky123');
    console.log('Role: dean');
    console.log('User ID:', newUser.id);
    
  } catch (error) {
    console.error('❌ Error creating Pastor Rocky user:', error);
  }
}

createPastorRocky();
