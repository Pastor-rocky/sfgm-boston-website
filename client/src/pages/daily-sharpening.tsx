import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowLeft, Play, Share2, ExternalLink, Eye } from "lucide-react";
import { useState, useEffect } from "react";
// import pastorRockyCollage from "@assets/image_1753497882391.png";
// import instagramBg from "@assets/image_1753492650191.png";
// import pastorRockyImg from "@assets/image_1753493148038.png";
// import pastorRockyImg2 from "@assets/image_1753493247506.png";

export default function DailySharpening() {
  const [watchedEpisodes, setWatchedEpisodes] = useState<Set<number>>(new Set());
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [hideWatched, setHideWatched] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'title'>("recent");

  // Load watched episodes from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('dailySharpening_watched');
    if (saved) {
      setWatchedEpisodes(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save watched episodes to localStorage
  const saveWatchedEpisodes = (watched: Set<number>) => {
    localStorage.setItem('dailySharpening_watched', JSON.stringify(Array.from(watched)));
  };

  // Mark episode as watched
  const markAsWatched = (episodeId: number) => {
    const newWatched = new Set(watchedEpisodes);
    newWatched.add(episodeId);
    setWatchedEpisodes(newWatched);
    saveWatchedEpisodes(newWatched);
  };

  // Convert Instagram URL to embed URL
  const getEmbedUrl = (instagramUrl: string) => {
    if (instagramUrl.includes('/p/')) {
      const postId = instagramUrl.split('/p/')[1].split('/')[0];
      return `https://www.instagram.com/p/${postId}/embed/`;
    }
    return instagramUrl;
  };
  const instagramVideos = [
    {
      id: 1,
      title: "Episode 1",
      description: "Daily word of encouragement to sharpen your faith and strengthen your walk with God.",
      thumbnail: "https://via.placeholder.com/300x300/4f46e5/ffffff?text=Episode+1",
      instagramUrl: "https://www.instagram.com/p/DJRyHFeRQKz/",
      date: "Recent"
    },
    {
      id: 2,
      title: "Episode 2",
      description: "Encouragement and spiritual insight for your daily walk with Christ.",
      thumbnail: "https://via.placeholder.com/300x300/7c3aed/ffffff?text=Episode+2",
      instagramUrl: "https://www.instagram.com/p/DJUhdahxBqw/",
      date: "Recent"
    },
    {
      id: 3,
      title: "Episode 3",
      description: "Biblical wisdom and encouragement for your spiritual growth journey.",
      thumbnail: "https://via.placeholder.com/300x300/059669/ffffff?text=Episode+3",
      instagramUrl: "https://www.instagram.com/p/DJXHk-5RIA0/",
      date: "Recent"
    },
    {
      id: 4,
      title: "Episode 4",
      description: "Daily reminder of God's love and faithfulness in your life.",
      thumbnail: "https://via.placeholder.com/300x300/dc2626/ffffff?text=Episode+4",
      instagramUrl: "https://www.instagram.com/p/DJZmiMXRGyk/",
      date: "Recent"
    },
    {
      id: 5,
      title: "Episode 5",
      description: "Spiritual encouragement to help you stay focused on God's purpose.",
      thumbnail: "https://via.placeholder.com/300x300/0891b2/ffffff?text=Episode+5",
      instagramUrl: "https://www.instagram.com/p/DJccpbZSjkw/",
      date: "Recent"
    },
    {
      id: 6,
      title: "Episode 6",
      description: "Words of hope and strength for your daily Christian walk.",
      thumbnail: "https://via.placeholder.com/300x300/ea580c/ffffff?text=Episode+6",
      instagramUrl: "https://www.instagram.com/p/DJfBotxy7Y6/",
      date: "Recent"
    },
    {
      id: 7,
      title: "Episode 7",
      description: "Daily dose of biblical truth and spiritual encouragement.",
      thumbnail: "https://via.placeholder.com/300x300/8b5cf6/ffffff?text=Episode+7",
      instagramUrl: "https://www.instagram.com/p/DJj7ZD8RtHU/",
      date: "Recent"
    },
    {
      id: 8,
      title: "Episode 8",
      description: "Inspiring words to help sharpen your faith and character.",
      thumbnail: "https://via.placeholder.com/300x300/f59e0b/ffffff?text=Episode+8",
      instagramUrl: "https://www.instagram.com/p/DJmg0IuxIIW/",
      date: "Recent"
    },
    {
      id: 9,
      title: "Episode 9",
      description: "Encouragement for spiritual growth and deeper relationship with God.",
      thumbnail: "https://via.placeholder.com/300x300/10b981/ffffff?text=Episode+9",
      instagramUrl: "https://www.instagram.com/p/DJpKyxJxyqR/",
      date: "Recent"
    },
    {
      id: 10,
      title: "Episode 10",
      description: "Daily wisdom and guidance for living a Christ-centered life.",
      thumbnail: "https://via.placeholder.com/300x300/ef4444/ffffff?text=Episode+10",
      instagramUrl: "https://www.instagram.com/p/DJuDqAKRQtu/",
      date: "Recent"
    },
    {
      id: 11,
      title: "Episode 11",
      description: "Spiritual insight and encouragement for your faith journey.",
      thumbnail: "https://via.placeholder.com/300x300/06b6d4/ffffff?text=Episode+11",
      instagramUrl: "https://www.instagram.com/p/DJxFGf-yLA-/",
      date: "Recent"
    },
    {
      id: 12,
      title: "Episode 12",
      description: "Biblical encouragement to strengthen your walk with the Lord.",
      thumbnail: "https://via.placeholder.com/300x300/8b5cf6/ffffff?text=Episode+12",
      instagramUrl: "https://www.instagram.com/p/DJ2BhNbx8BD/",
      date: "Recent"
    },
    {
      id: 13,
      title: "Episode 13",
      description: "Daily word of hope and inspiration from God's truth.",
      thumbnail: "https://via.placeholder.com/300x300/f59e0b/ffffff?text=Episode+13",
      instagramUrl: "https://www.instagram.com/p/DJ43ZJ3Snev/",
      date: "Recent"
    },
    {
      id: 14,
      title: "Episode 14",
      description: "Encouragement for living boldly in your faith and purpose.",
      thumbnail: "https://via.placeholder.com/300x300/10b981/ffffff?text=Episode+14",
      instagramUrl: "https://www.instagram.com/p/DJ9oIoMxqnV/",
      date: "Recent"
    },
    {
      id: 15,
      title: "Episode 15",
      description: "Spiritual wisdom to help you grow stronger in Christ.",
      thumbnail: "https://via.placeholder.com/300x300/ef4444/ffffff?text=Episode+15",
      instagramUrl: "https://www.instagram.com/p/DKANeKxxBq5/",
      date: "Recent"
    },
    {
      id: 16,
      title: "Episode 16",
      description: "Daily reminder of God's goodness and faithful love.",
      thumbnail: "https://via.placeholder.com/300x300/06b6d4/ffffff?text=Episode+16",
      instagramUrl: "https://www.instagram.com/p/DKDULkxy_fr/",
      date: "Recent"
    },
    {
      id: 17,
      title: "Episode 17",
      description: "Words of encouragement for your spiritual development.",
      thumbnail: "https://via.placeholder.com/300x300/4f46e5/ffffff?text=Episode+17",
      instagramUrl: "https://www.instagram.com/p/DKIbHTWSRyA/",
      date: "Recent"
    },
    {
      id: 18,
      title: "Episode 18",
      description: "Biblical truth to guide and strengthen your faith walk.",
      thumbnail: "https://via.placeholder.com/300x300/7c3aed/ffffff?text=Episode+18",
      instagramUrl: "https://www.instagram.com/p/DKLHEQLy7J-/",
      date: "Recent"
    },
    {
      id: 19,
      title: "Episode 19",
      description: "Daily dose of spiritual encouragement and godly wisdom.",
      thumbnail: "https://via.placeholder.com/300x300/059669/ffffff?text=Episode+19",
      instagramUrl: "https://www.instagram.com/p/DKNEujgOyzP/",
      date: "Recent"
    },
    {
      id: 20,
      title: "Episode 20",
      description: "Inspiring message to help you stay focused on God's plan.",
      thumbnail: "https://via.placeholder.com/300x300/dc2626/ffffff?text=Episode+20",
      instagramUrl: "https://www.instagram.com/p/DKP0pqLOegq/",
      date: "Recent"
    },
    {
      id: 21,
      title: "Episode 21",
      description: "Spiritual insight for deepening your relationship with Christ.",
      thumbnail: "https://via.placeholder.com/300x300/0891b2/ffffff?text=Episode+21",
      instagramUrl: "https://www.instagram.com/p/DKUuiQIR2uf/",
      date: "Recent"
    },
    {
      id: 22,
      title: "Episode 22",
      description: "Daily encouragement to live out your faith with boldness.",
      thumbnail: "https://via.placeholder.com/300x300/ea580c/ffffff?text=Episode+22",
      instagramUrl: "https://www.instagram.com/p/DKZ625XR-oa/",
      date: "Recent"
    },
    {
      id: 23,
      title: "Episode 23",
      description: "Words of hope and strength from God's unchanging Word.",
      thumbnail: "https://via.placeholder.com/300x300/8b5cf6/ffffff?text=Episode+23",
      instagramUrl: "https://www.instagram.com/p/DKc1SZ3x1NT/",
      date: "Recent"
    },
    {
      id: 24,
      title: "Episode 24",
      description: "Biblical wisdom for navigating life's challenges with faith.",
      thumbnail: "https://via.placeholder.com/300x300/f59e0b/ffffff?text=Episode+24",
      instagramUrl: "https://www.instagram.com/p/DKfaPU6SqYT/",
      date: "Recent"
    },
    {
      id: 25,
      title: "Episode 25",
      description: "Daily reminder of God's love and purpose for your life.",
      thumbnail: "https://via.placeholder.com/300x300/10b981/ffffff?text=Episode+25",
      instagramUrl: "https://www.instagram.com/p/DKh95R9ygkE/",
      date: "Recent"
    },
    {
      id: 26,
      title: "Episode 26",
      description: "Encouragement to trust God's timing and His perfect plan.",
      thumbnail: "https://via.placeholder.com/300x300/ef4444/ffffff?text=Episode+26",
      instagramUrl: "https://www.instagram.com/p/DKkp5wty6Ap/",
      date: "Recent"
    },
    {
      id: 27,
      title: "Episode 27",
      description: "Spiritual guidance for growing in grace and knowledge.",
      thumbnail: "https://via.placeholder.com/300x300/06b6d4/ffffff?text=Episode+27",
      instagramUrl: "https://www.instagram.com/p/DKm5L-ts1Zr/",
      date: "Recent"
    },
    {
      id: 28,
      title: "Episode 28",
      description: "Daily word to strengthen your faith and inspire your heart.",
      thumbnail: "https://via.placeholder.com/300x300/4f46e5/ffffff?text=Episode+28",
      instagramUrl: "https://www.instagram.com/p/DKsphcUy7Zn/",
      date: "Recent"
    },
    {
      id: 29,
      title: "Episode 29",
      description: "Biblical truth for walking victoriously in your calling.",
      thumbnail: "https://via.placeholder.com/300x300/7c3aed/ffffff?text=Episode+29",
      instagramUrl: "https://www.instagram.com/p/DKxt1ezyJ8x/",
      date: "Recent"
    },
    {
      id: 30,
      title: "Episode 30",
      description: "Encouragement to remain steadfast in your faith journey.",
      thumbnail: "https://via.placeholder.com/300x300/059669/ffffff?text=Episode+30",
      instagramUrl: "https://www.instagram.com/p/DKzl04auRg2/",
      date: "Recent"
    },
    {
      id: 31,
      title: "Episode 31",
      description: "Words of wisdom for living according to God's will.",
      thumbnail: "https://via.placeholder.com/300x300/dc2626/ffffff?text=Episode+31",
      instagramUrl: "https://www.instagram.com/p/DK2rt0tS5Ee/",
      date: "Recent"
    },
    {
      id: 32,
      title: "Episode 32",
      description: "Daily encouragement for your spiritual growth and maturity.",
      thumbnail: "https://via.placeholder.com/300x300/0891b2/ffffff?text=Episode+32",
      instagramUrl: "https://www.instagram.com/p/DK5UnjoSrXL/",
      date: "Recent"
    },
    {
      id: 33,
      title: "Episode 33",
      description: "Biblical insight to help you overcome life's obstacles.",
      thumbnail: "https://via.placeholder.com/300x300/ea580c/ffffff?text=Episode+33",
      instagramUrl: "https://www.instagram.com/p/DK-C8UnMrZq/",
      date: "Recent"
    },
    {
      id: 34,
      title: "Episode 34",
      description: "Spiritual encouragement to keep pressing toward the goal.",
      thumbnail: "https://via.placeholder.com/300x300/8b5cf6/ffffff?text=Episode+34",
      instagramUrl: "https://www.instagram.com/p/DLDRW56OQ5Q/",
      date: "Recent"
    },
    {
      id: 35,
      title: "Episode 35",
      description: "Daily reminder of your identity and purpose in Christ.",
      thumbnail: "https://via.placeholder.com/300x300/f59e0b/ffffff?text=Episode+35",
      instagramUrl: "https://www.instagram.com/p/DLFsKAVOgU4/",
      date: "Recent"
    },
    {
      id: 36,
      title: "Episode 36",
      description: "Words of hope and encouragement for your faith walk.",
      thumbnail: "https://via.placeholder.com/300x300/10b981/ffffff?text=Episode+36",
      instagramUrl: "https://www.instagram.com/p/DLJQJfMu0zD/",
      date: "Recent"
    },
    {
      id: 37,
      title: "Episode 37",
      description: "Biblical truth to guide your steps and strengthen your resolve.",
      thumbnail: "https://via.placeholder.com/300x300/ef4444/ffffff?text=Episode+37",
      instagramUrl: "https://www.instagram.com/p/DLVEZhJMnhJ/",
      date: "Recent"
    },
    {
      id: 38,
      title: "Episode 38",
      description: "Daily dose of spiritual wisdom and godly counsel.",
      thumbnail: "https://via.placeholder.com/300x300/06b6d4/ffffff?text=Episode+38",
      instagramUrl: "https://www.instagram.com/p/DLXoxRJOMaf/",
      date: "Recent"
    },
    {
      id: 39,
      title: "Episode 39",
      description: "Encouragement to walk in faith and trust God's promises.",
      thumbnail: "https://via.placeholder.com/300x300/4f46e5/ffffff?text=Episode+39",
      instagramUrl: "https://www.instagram.com/p/DLc9PnIukif/",
      date: "Recent"
    },
    {
      id: 40,
      title: "Episode 40",
      description: "Spiritual insight for deepening your relationship with the Lord.",
      thumbnail: "https://via.placeholder.com/300x300/7c3aed/ffffff?text=Episode+40",
      instagramUrl: "https://www.instagram.com/p/DLiYRIQygtU/",
      date: "Recent"
    },
    {
      id: 41,
      title: "Episode 41",
      description: "Daily word to inspire and motivate your Christian journey.",
      thumbnail: "https://via.placeholder.com/300x300/059669/ffffff?text=Episode+41",
      instagramUrl: "https://www.instagram.com/p/DLlR3T3yBWt/",
      date: "Recent"
    },
    {
      id: 42,
      title: "Episode 42",
      description: "Biblical encouragement for living boldly for Christ.",
      thumbnail: "https://via.placeholder.com/300x300/dc2626/ffffff?text=Episode+42",
      instagramUrl: "https://www.instagram.com/p/DLnWvq2uOzS/",
      date: "Recent"
    },
    {
      id: 43,
      title: "Episode 43",
      description: "Words of strength and comfort from God's eternal Word.",
      thumbnail: "https://via.placeholder.com/300x300/0891b2/ffffff?text=Episode+43",
      instagramUrl: "https://www.instagram.com/p/DLp2IhPubUg/",
      date: "Recent"
    },
    {
      id: 44,
      title: "Episode 44",
      description: "Daily reminder to stay focused on God's goodness and grace.",
      thumbnail: "https://via.placeholder.com/300x300/ea580c/ffffff?text=Episode+44",
      instagramUrl: "https://www.instagram.com/p/DLu3mp-MM0q/",
      date: "Recent"
    },
    {
      id: 45,
      title: "Episode 45",
      description: "Spiritual wisdom for navigating life with divine purpose.",
      thumbnail: "https://via.placeholder.com/300x300/8b5cf6/ffffff?text=Episode+45",
      instagramUrl: "https://www.instagram.com/p/DLz_8EBMTNg/",
      date: "Recent"
    },
    {
      id: 46,
      title: "Episode 46",
      description: "Encouragement to trust in God's perfect timing and plan.",
      thumbnail: "https://via.placeholder.com/300x300/f59e0b/ffffff?text=Episode+46",
      instagramUrl: "https://www.instagram.com/p/DL3jekiuUG2/",
      date: "Recent"
    },
    {
      id: 47,
      title: "Episode 47",
      description: "Daily dose of hope and inspiration from biblical truth.",
      thumbnail: "https://via.placeholder.com/300x300/10b981/ffffff?text=Episode+47",
      instagramUrl: "https://www.instagram.com/p/DL7pRzIs1gA/",
      date: "Recent"
    },
    {
      id: 48,
      title: "Episode 48",
      description: "Biblical guidance for walking in victory and faith.",
      thumbnail: "https://via.placeholder.com/300x300/ef4444/ffffff?text=Episode+48",
      instagramUrl: "https://www.instagram.com/p/DMDv7L7xb8m/",
      date: "Recent"
    },
    {
      id: 49,
      title: "Episode 49",
      description: "Words of encouragement for your spiritual development.",
      thumbnail: "https://via.placeholder.com/300x300/06b6d4/ffffff?text=Episode+49",
      instagramUrl: "https://www.instagram.com/p/DMGv2NHSEt3/",
      date: "Recent"
    },
    {
      id: 50,
      title: "Episode 50",
      description: "Daily reminder of God's faithfulness and everlasting love.",
      thumbnail: "https://via.placeholder.com/300x300/4f46e5/ffffff?text=Episode+50",
      instagramUrl: "https://www.instagram.com/p/DMJFw7DyBXs/",
      date: "Recent"
    },
    {
      id: 51,
      title: "Episode 51",
      description: "Spiritual insight to help you grow in grace and wisdom.",
      thumbnail: "https://via.placeholder.com/300x300/7c3aed/ffffff?text=Episode+51",
      instagramUrl: "https://www.instagram.com/p/DMMBENXuPZu/",
      date: "Recent"
    },
    {
      id: 52,
      title: "Episode 52",
      description: "Biblical truth for living a life that honors God.",
      thumbnail: "https://via.placeholder.com/300x300/059669/ffffff?text=Episode+52",
      instagramUrl: "https://www.instagram.com/p/DMNzkJMupVJ/",
      date: "Recent"
    },
    {
      id: 53,
      title: "Episode 53",
      description: "Daily encouragement to stay strong in your faith journey.",
      thumbnail: "https://via.placeholder.com/300x300/dc2626/ffffff?text=Episode+53",
      instagramUrl: "https://www.instagram.com/p/DMQ3Ua9SwkT/",
      date: "Recent"
    },
    {
      id: 54,
      title: "Episode 54",
      description: "Words of hope and strength for walking with Christ daily.",
      thumbnail: "https://via.placeholder.com/300x300/0891b2/ffffff?text=Episode+54",
      instagramUrl: "https://www.instagram.com/p/DMTCH5jOSR6/",
      date: "Recent"
    },
    {
      id: 55,
      title: "Episode 55",
      description: "Daily encouragement to strengthen your faith and trust in God's plan.",
      thumbnail: "https://via.placeholder.com/300x300/4f46e5/ffffff?text=Episode+55",
      instagramUrl: "https://www.instagram.com/p/DMYE8XUutR7/",
      date: "Recent"
    },
    {
      id: 56,
      title: "Episode 56",
      description: "Biblical wisdom for navigating life's challenges with divine guidance.",
      thumbnail: "https://via.placeholder.com/300x300/7c3aed/ffffff?text=Episode+56",
      instagramUrl: "https://www.instagram.com/p/DMbgSHzub6P/",
      date: "Recent"
    },
    {
      id: 57,
      title: "Episode 57",
      description: "Spiritual insight to help you grow in grace and godly wisdom.",
      thumbnail: "https://via.placeholder.com/300x300/059669/ffffff?text=Episode+57",
      instagramUrl: "https://www.instagram.com/p/DMdldMQyRNV/",
      date: "Recent"
    },
    {
      id: 58,
      title: "Episode 58",
      description: "Daily reminder of God's faithfulness and everlasting love.",
      thumbnail: "https://via.placeholder.com/300x300/dc2626/ffffff?text=Episode+58",
      instagramUrl: "https://www.instagram.com/p/DMfnJ7qu4_l/",
      date: "Recent"
    },
    {
      id: 59,
      title: "Episode 59",
      description: "Words of encouragement for your spiritual development and growth.",
      thumbnail: "https://via.placeholder.com/300x300/0891b2/ffffff?text=Episode+59",
      instagramUrl: "https://www.instagram.com/p/DMi5HTFyck4/",
      date: "Recent"
    },
    {
      id: 60,
      title: "Episode 60",
      description: "Biblical truth to guide your steps and strengthen your resolve.",
      thumbnail: "https://via.placeholder.com/300x300/ea580c/ffffff?text=Episode+60",
      instagramUrl: "https://www.instagram.com/p/DMlAEMxu19c/",
      date: "Recent"
    },
    {
      id: 61,
      title: "Episode 61",
      description: "Daily dose of spiritual wisdom and godly counsel.",
      thumbnail: "https://via.placeholder.com/300x300/8b5cf6/ffffff?text=Episode+61",
      instagramUrl: "https://www.instagram.com/p/DMshVxJuR_c/",
      date: "Recent"
    },
    {
      id: 62,
      title: "Episode 62",
      description: "Encouragement to walk in faith and trust God's promises.",
      thumbnail: "https://via.placeholder.com/300x300/f59e0b/ffffff?text=Episode+62",
      instagramUrl: "https://www.instagram.com/p/DM3ao5ISaQ9/",
      date: "Recent"
    },
    {
      id: 63,
      title: "Episode 63",
      description: "Spiritual insight for deepening your relationship with the Lord.",
      thumbnail: "https://via.placeholder.com/300x300/10b981/ffffff?text=Episode+63",
      instagramUrl: "https://www.instagram.com/p/DNEeuE_yTSF/",
      date: "Recent"
    },
    {
      id: 64,
      title: "Episode 64",
      description: "Daily word to inspire and motivate your Christian journey.",
      thumbnail: "https://via.placeholder.com/300x300/ef4444/ffffff?text=Episode+64",
      instagramUrl: "https://www.instagram.com/p/DNtRskkXKjp/",
      date: "Recent"
    },
    {
      id: 65,
      title: "Episode 65",
      description: "Biblical encouragement for living boldly for Christ.",
      thumbnail: "https://via.placeholder.com/300x300/06b6d4/ffffff?text=Episode+65",
      instagramUrl: "https://www.instagram.com/p/DNv1vzhXB8O/",
      date: "Recent"
    },
    {
      id: 66,
      title: "Episode 66",
      description: "Words of strength and comfort from God's eternal Word.",
      thumbnail: "https://via.placeholder.com/300x300/4f46e5/ffffff?text=Episode+66",
      instagramUrl: "https://www.instagram.com/p/DNyOc0nXFoX/",
      date: "Recent"
    },
    {
      id: 67,
      title: "Episode 67",
      description: "Daily reminder to stay focused on God's goodness and grace.",
      thumbnail: "https://via.placeholder.com/300x300/7c3aed/ffffff?text=Episode+67",
      instagramUrl: "https://www.instagram.com/p/DN0xlovXCmJ/",
      date: "Recent"
    },
    {
      id: 68,
      title: "Episode 68",
      description: "Spiritual wisdom for navigating life with divine purpose.",
      thumbnail: "https://via.placeholder.com/300x300/059669/ffffff?text=Episode+68",
      instagramUrl: "https://www.instagram.com/p/DN3qqYdYqOm/",
      date: "Recent"
    },
    {
      id: 69,
      title: "Episode 69",
      description: "Encouragement to trust in God's perfect timing and plan.",
      thumbnail: "https://via.placeholder.com/300x300/dc2626/ffffff?text=Episode+69",
      instagramUrl: "https://www.instagram.com/p/DN6GesQkcx-/",
      date: "Recent"
    },
    {
      id: 70,
      title: "Episode 70",
      description: "Daily dose of hope and inspiration from biblical truth.",
      thumbnail: "https://via.placeholder.com/300x300/0891b2/ffffff?text=Episode+70",
      instagramUrl: "https://www.instagram.com/p/DN87KMFEkcI/",
      date: "Recent"
    },
    {
      id: 71,
      title: "Episode 71",
      description: "Biblical guidance for walking in victory and faith.",
      thumbnail: "https://via.placeholder.com/300x300/ea580c/ffffff?text=Episode+71",
      instagramUrl: "https://www.instagram.com/p/DOEd2QBkS5-/",
      date: "Recent"
    },
    {
      id: 72,
      title: "Episode 72",
      description: "Words of encouragement for your spiritual development.",
      thumbnail: "https://via.placeholder.com/300x300/8b5cf6/ffffff?text=Episode+72",
      instagramUrl: "https://www.instagram.com/p/DOHLCydktov/",
      date: "Recent"
    },
    {
      id: 73,
      title: "Episode 73",
      description: "Daily reminder of God's faithfulness and everlasting love.",
      thumbnail: "https://via.placeholder.com/300x300/f59e0b/ffffff?text=Episode+73",
      instagramUrl: "https://www.instagram.com/p/DOKYxHJDiDg/",
      date: "Recent"
    },
    {
      id: 74,
      title: "Episode 74",
      description: "Spiritual insight to help you grow in grace and wisdom.",
      thumbnail: "https://via.placeholder.com/300x300/10b981/ffffff?text=Episode+74",
      instagramUrl: "https://www.instagram.com/p/DOMeW3WkhFz/",
      date: "Recent"
    },
    {
      id: 75,
      title: "Episode 75",
      description: "Biblical truth for living a life that honors God.",
      thumbnail: "https://via.placeholder.com/300x300/ef4444/ffffff?text=Episode+75",
      instagramUrl: "https://www.instagram.com/p/DOR9ZUtkY3M/",
      date: "Recent"
    },
    {
      id: 76,
      title: "Episode 76",
      description: "Daily encouragement to stay strong in your faith journey.",
      thumbnail: "https://via.placeholder.com/300x300/06b6d4/ffffff?text=Episode+76",
      instagramUrl: "https://www.instagram.com/p/DOT-rH_kdIx/",
      date: "Recent"
    },
    {
      id: 77,
      title: "Episode 77",
      description: "Words of hope and strength for walking with Christ daily.",
      thumbnail: "https://via.placeholder.com/300x300/4f46e5/ffffff?text=Episode+77",
      instagramUrl: "https://www.instagram.com/p/DOWx-EfErY4/",
      date: "Recent"
    },
    {
      id: 78,
      title: "Episode 78",
      description: "Biblical wisdom for navigating life's challenges with faith.",
      thumbnail: "https://via.placeholder.com/300x300/7c3aed/ffffff?text=Episode+78",
      instagramUrl: "https://www.instagram.com/p/DOeWYWTkpzS/",
      date: "Recent"
    },
    {
      id: 79,
      title: "Episode 79",
      description: "Daily reminder of God's love and purpose for your life.",
      thumbnail: "https://via.placeholder.com/300x300/059669/ffffff?text=Episode+79",
      instagramUrl: "https://www.instagram.com/p/DOjGajsDgBS/",
      date: "Recent"
    },
    {
      id: 80,
      title: "Episode 80",
      description: "Encouragement to trust God's timing and His perfect plan.",
      thumbnail: "https://via.placeholder.com/300x300/dc2626/ffffff?text=Episode+80",
      instagramUrl: "https://www.instagram.com/p/DPPB8n6kQ4L/",
      date: "Recent"
    },
    {
      id: 81,
      title: "Episode 81",
      description: "Spiritual guidance for growing in grace and knowledge.",
      thumbnail: "https://via.placeholder.com/300x300/0891b2/ffffff?text=Episode+81",
      instagramUrl: "https://www.instagram.com/p/DPWj0BPjub9/",
      date: "Recent"
    },
    {
      id: 82,
      title: "Episode 82",
      description: "Daily word to strengthen your faith and inspire your heart.",
      thumbnail: "https://via.placeholder.com/300x300/ea580c/ffffff?text=Episode+82",
      instagramUrl: "https://www.instagram.com/p/DPwx83DkjRe/",
      date: "Recent"
    },
    {
      id: 83,
      title: "Episode 83",
      description: "Biblical truth for walking victoriously in your calling.",
      thumbnail: "https://via.placeholder.com/300x300/8b5cf6/ffffff?text=Episode+83",
      instagramUrl: "https://www.instagram.com/p/DPzDxpbkc26/",
      date: "Recent"
    }
  ];

  const normalized = (s: string) => s.toLowerCase();
  const visibleVideos = instagramVideos
    .filter(v => !hideWatched || !watchedEpisodes.has(v.id))
    .filter(v => {
      if (!search.trim()) return true;
      const q = normalized(search);
      return [v.title, v.description, v.date].some(x => normalized(x).includes(q));
    })
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return b.id - a.id; // recent by id
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="relative py-16 text-white overflow-hidden">
        {/* Instagram Background Layer */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-purple-700 via-pink-600 to-indigo-700"
        ></div>
        
        {/* Pastor Rocky Collage Overlay */}
        <div 
          className="absolute inset-0"
        >
          {/* Corner decorative elements */}
          {/* Top Left Corner */}
          <div className="absolute top-4 left-4 text-6xl text-yellow-300 opacity-60">
            <i className="fas fa-cross"></i>
          </div>
          
          {/* Top Right Corner */}
          <div className="absolute top-4 right-4 text-6xl text-yellow-300 opacity-60">
            <i className="fas fa-dove"></i>
          </div>
          
          {/* Bottom Left Corner */}
          <div className="absolute bottom-4 left-4 text-6xl text-yellow-300 opacity-60">
            <i className="fas fa-praying-hands"></i>
          </div>
          
          {/* Bottom Right Corner */}
          <div className="absolute bottom-4 right-4 text-6xl text-yellow-300 opacity-60">
            <i className="fas fa-heart"></i>
          </div>
          
          {/* Additional decorative elements along edges */}
          {/* Top edge */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-4xl text-yellow-300 opacity-50">
            <i className="fas fa-star"></i>
          </div>
          
          {/* Bottom edge */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-4xl text-yellow-300 opacity-50">
            <i className="fas fa-crown"></i>
          </div>
          
          {/* Left edge */}
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-4xl text-yellow-300 opacity-50">
            <i className="fas fa-anchor"></i>
          </div>
          
          {/* Right edge */}
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-4xl text-yellow-300 opacity-50">
            <i className="fas fa-flame"></i>
          </div>

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Back Button */}
          <div className="text-left mb-6">
            <Link href="/">
              <Button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border border-white border-opacity-50 backdrop-blur-sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Main Page
              </Button>
            </Link>
          </div>

          <div className="bg-white bg-opacity-20 rounded-lg p-6 max-w-4xl mx-auto mb-6">
            <div className="text-center">
              <div className="mb-4">
                <i className="fas fa-quote-left text-3xl text-yellow-200 mb-3 block"></i>
                <p className="text-2xl text-white italic mb-3">
                  "As iron sharpens iron, so one person sharpens another."
                </p>
                <p className="text-lg text-yellow-200 font-semibold">— Proverbs 27:17 NLT</p>
              </div>
              
              <div className="text-white">
                <p className="text-lg font-semibold mb-2">Welcome to Daily Sharpening</p>
                <p className="text-sm opacity-90">
                  Join Pastor Rocky for daily words of encouragement, biblical insights, and spiritual growth. 
                  Each episode is designed to sharpen your faith and strengthen your walk with God.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-4 mt-8">
            <i className="fab fa-instagram text-4xl text-white"></i>
            <a 
              href="https://instagram.com/sfgm_boston" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white bg-opacity-20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all border border-white border-opacity-30"
            >
              <i className="fab fa-instagram text-xl mr-3"></i>
              Follow @SFGM_Boston
            </a>
          </div>

        </div>
      </div>

      {/* Daily Posts Section */}
      <div className="container mx-auto px-4 py-16">
        {/* DAILY SHARPENING Title moved here */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <i className="fas fa-sun text-5xl mr-4 text-purple-600"></i>
            <div className="flex items-center">
              {/* Crossed Swords */}
              <div className="relative mr-4">
                <i className="fas fa-sword text-3xl text-yellow-500 transform rotate-45"></i>
                <i className="fas fa-sword text-3xl text-yellow-500 transform -rotate-45 absolute top-0 left-0"></i>
              </div>
              <h1 className="text-5xl font-black text-gray-800 flex items-center" 
                  style={{ 
                    fontFamily: 'Impact, "Arial Black", sans-serif',
                    letterSpacing: '2px'
                  }}>
                DAILY SHARPENING <span className="ml-3">🗡️</span>
              </h1>
              {/* Second set of crossed swords */}
              <div className="relative ml-4">
                <i className="fas fa-sword text-3xl text-yellow-500 transform rotate-45"></i>
                <i className="fas fa-sword text-3xl text-yellow-500 transform -rotate-45 absolute top-0 left-0"></i>
              </div>
            </div>
            <i className="fas fa-sun text-5xl ml-4 text-purple-600"></i>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Daily words of encouragement and biblical insights
          </p>
        </div>


        {/* Controls */}
        <div className="max-w-6xl mx-auto mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <div className="md:col-span-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search episodes…"
                className="w-full px-4 py-2 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex items-center justify-between md:justify-end gap-3">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={hideWatched}
                  onChange={(e) => setHideWatched(e.target.checked)}
                />
                Hide watched
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded-full border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="recent">Sort: Recent</option>
                <option value="title">Sort: Title (A–Z)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto">
          {visibleVideos.map((video) => {
            const isWatched = watchedEpisodes.has(video.id);
            return (
              <Card key={video.id} className={`bg-white shadow-md hover:shadow-lg transition-all border-l-4 ${isWatched ? 'border-l-green-500' : 'border-l-yellow-500'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{video.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                        <Eye className="w-3 h-3" />
                        <span>{isWatched ? 'Watched' : 'New'} • {video.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        title="Open on Instagram"
                        onClick={() => window.open(video.instagramUrl, '_blank')}
                        className="p-2 rounded hover:bg-slate-100 text-slate-600"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        title="Copy link"
                        onClick={async () => {
                          try { await navigator.clipboard.writeText(video.instagramUrl); } catch {}
                        }}
                        className="p-2 rounded hover:bg-slate-100 text-slate-600"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      {isWatched && (
                        <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full">
                          <i className="fas fa-check text-white text-xs"></i>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Video Thumbnail Card */}
                    <div 
                      className="relative bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg overflow-hidden cursor-pointer group h-32 flex items-center justify-center"
                      onClick={() => {
                        setSelectedVideo({
                          title: video.title,
                          description: video.description,
                          videoUrl: video.instagramUrl,
                          episodeNumber: video.id
                        });
                        markAsWatched(video.id);
                      }}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
                      <div className="relative z-10 text-center text-white">
                        <div className="bg-white bg-opacity-20 rounded-full p-3 mb-2 mx-auto w-12 h-12 flex items-center justify-center">
                          <Play className="h-6 w-6 ml-1" />
                        </div>
                        <p className="text-xs font-medium">Click to Watch</p>
                      </div>
                    </div>
                    
                    {/* Watch Button */}
                    <button 
                      onClick={() => {
                        setSelectedVideo({
                          title: video.title,
                          description: video.description,
                          videoUrl: video.instagramUrl,
                          episodeNumber: video.id
                        });
                        markAsWatched(video.id);
                      }}
                      className="inline-flex items-center justify-center w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:from-pink-600 hover:to-purple-700 transition-all"
                    >
                      <i className="fab fa-instagram mr-2"></i>
                      Watch Episode
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>



        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Don't Miss Your Daily Sharpening</h3>
            <p className="text-lg text-purple-100 mb-6">
              Follow us on Instagram to receive fresh words of encouragement every day. 
              Let God sharpen your faith one episode at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://instagram.com/sfgm_boston" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <i className="fab fa-instagram text-xl mr-3"></i>
                Follow @SFGM_Boston
              </a>
              <a 
                href="https://instagram.com/sfgm_boston" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
              >
                <i className="fas fa-bell mr-2"></i>
                Turn on Notifications
              </a>
            </div>
          </div>
        </div>


      </div>

      {/* Instagram Video Modal - Mobile Optimized */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="w-[95vw] sm:max-w-2xl max-h-[95vh] p-0 overflow-hidden">
          <DialogHeader className="p-3 sm:p-4 pb-0 border-b">
            <DialogTitle className="flex items-center justify-between text-base sm:text-lg">
              <span className="truncate mr-2 sm:mr-4 text-sm sm:text-base">{selectedVideo?.title}</span>
              <Badge variant="secondary" className="shrink-0 text-xs">Daily Sharpening</Badge>
            </DialogTitle>
            <DialogDescription className="sr-only">
              Watch Daily Sharpening episode content
            </DialogDescription>
            {selectedVideo?.description && (
              <p className="text-gray-600 text-xs sm:text-sm mt-2 overflow-hidden" style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}>{selectedVideo.description}</p>
            )}
          </DialogHeader>
          <div className="flex-1 overflow-y-auto">
            <div className="p-2 sm:p-4">
              <div className="w-full max-w-xs sm:max-w-sm mx-auto">
                {selectedVideo && (
                  <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '9/16', maxHeight: '60vh' }}>
                    <iframe
                      src={getEmbedUrl(selectedVideo.videoUrl)}
                      title={selectedVideo.title}
                      className="w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      style={{ border: 'none' }}
                    />
                  </div>
                )}
              </div>
              <div className="mt-3 sm:mt-4 text-center">
                <p className="text-xs sm:text-sm text-gray-500 mb-2">
                  Instagram Video Content
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedVideo(null)}
                  className="w-full max-w-xs sm:max-w-md text-sm py-2"
                >
                  Close Video
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}