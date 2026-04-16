/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://figures.finance',
  generateRobotsTxt: true,
  changefreq: 'monthly',
  priority: 0.7,
  additionalPaths: async () => [
    { loc: '/', priority: 1.0, changefreq: 'weekly' },
    { loc: '/mortgage-calculator', priority: 0.9, changefreq: 'monthly' },
    { loc: '/affordability-calculator', priority: 0.9, changefreq: 'monthly' },
    { loc: '/compound-interest-calculator', priority: 0.9, changefreq: 'monthly' },
    { loc: '/loan-repayment-calculator', priority: 0.9, changefreq: 'monthly' },
    { loc: '/savings-goal-calculator', priority: 0.8, changefreq: 'monthly' },
    { loc: '/credit-card-payoff-calculator', priority: 0.8, changefreq: 'monthly' },
    { loc: '/retirement-calculator', priority: 0.8, changefreq: 'monthly' },
    { loc: '/about', priority: 0.5, changefreq: 'yearly' },
    { loc: '/privacy-policy', priority: 0.3, changefreq: 'yearly' },
  ],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
}