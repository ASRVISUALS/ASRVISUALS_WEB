const playlistCategories = {
  Commercial: process.env.YOUTUBE_PLAYLIST_COMMERCIAL || '',
  Weddings: process.env.YOUTUBE_PLAYLIST_WEDDINGS || '',
  'Music Videos': process.env.YOUTUBE_PLAYLIST_MUSIC_VIDEOS || '',
  Corporate: process.env.YOUTUBE_PLAYLIST_CORPORATE || '',
  Reels: process.env.YOUTUBE_PLAYLIST_REELS || ''
};

const keywordCategories = {
  wedding: 'Weddings',
  weddings: 'Weddings',
  commercial: 'Commercial',
  'music video': 'Music Videos',
  'music videos': 'Music Videos',
  corporate: 'Corporate',
  reel: 'Reels',
  reels: 'Reels'
};

module.exports = { playlistCategories, keywordCategories };