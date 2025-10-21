import { db } from './server/db';

export default async function handler(req, res) {
  try {
    // Simple database test
    const result = await db.execute('SELECT 1 as test');
    res.status(200).json({ 
      success: true, 
      message: 'Database connected',
      test: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Database connection failed',
      error: error.message 
    });
  }
}
