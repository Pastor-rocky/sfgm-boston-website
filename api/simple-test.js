export default function handler(req, res) {
  try {
    // Simple test without database
    res.status(200).json({ 
      success: true, 
      message: 'API is working',
      timestamp: new Date().toISOString(),
      env: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        nodeEnv: process.env.NODE_ENV
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'API error',
      error: error.message 
    });
  }
}
