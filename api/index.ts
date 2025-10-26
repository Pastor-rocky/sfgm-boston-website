// Vercel serverless function - handle all API routes
export default async (req: any, res: any) => {
  // Simple response to verify deployment
  return res.status(200).json({ 
    message: 'SFGM Boston API is running',
    path: req.url 
  });
};
