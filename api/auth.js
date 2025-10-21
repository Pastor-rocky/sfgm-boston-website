export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api/auth/login') {
    // Simple login check
    const { username, password } = req.body;
    
    if (username === 'pastorrocky' && password === 'Rocky123') {
      res.status(200).json({
        success: true,
        message: 'Login successful',
        user: {
          id: 'pastor-rocky-123',
          username: 'pastorrocky',
          firstName: 'Pastor',
          lastName: 'Rocky',
          role: 'dean',
          redirectUrl: '/dean'
        },
        token: 'temp-token-' + Date.now()
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    return;
  }

  // Default response
  res.status(200).json({
    success: true,
    message: 'API is working',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url
  });
}
