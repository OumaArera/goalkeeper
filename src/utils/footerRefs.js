import { X, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';

export const footerLinks = {
    platform: [
      { name: 'Home', href: '/' },
      { name: 'Players Database', href: '/players' },
      { name: 'Statistics', href: '/statistics' },
      { name: 'Sponsors', href: '/sponsors' },
      { name: 'Leagues', href: '/leagues' }
    ],
    resources: [
      { name: 'Training Resources', href: '/training' },
      { name: 'Coaching Guides', href: '/coaching' },
      { name: 'Equipment Reviews', href: '/equipment' },
      { name: 'News & Updates', href: '/news' },
      { name: 'Community Forum', href: '/community' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Support', href: '/contact' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Data Protection', href: '/data-protection' }
  ]
  };

export const socialLinks = [
    { name: 'X (Twitter)', icon: X, href: 'https://x.com/goalkeepersalliance' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/goalkeepersalliance' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/goalkeepersalliance' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/goalkeepersalliance' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/goalkeepersalliance' }
  ];

export const stats = [
    { number: '200+', label: 'Active Goalkeepers' },
    { number: '20+', label: 'Partner Clubs' },
    { number: '10+', label: 'Leagues Covered' },
    { number: '5+', label: 'Countries' }
  ];