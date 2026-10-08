import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const config: Config = {
  title: 'Kukso Studios',
  tagline: 'Independent products. Thoughtfully built.',
  favicon: 'brand/favicon.ico',
  future: { v4: true },
  url: 'https://kukso.com',
  baseUrl: '/',
  organizationName: 'KuksoHQ',
  projectName: 'KuksoHQ.GitHub.io',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  markdown: { hooks: { onBrokenMarkdownLinks: 'throw' } },
  i18n: { defaultLocale: 'en', locales: ['en', 'tr'] },
  plugins: [function preserveHomepageEmailMarkup() {
    return {
      name: 'preserve-homepage-email-markup',
      async postBuild({ outDir }: { outDir: string }) {
        const homepage = join(outDir, 'index.html');
        const html = await readFile(homepage, 'utf8');
        // Cloudflare email rewriting changes React's server-rendered text nodes.
        // Keep the homepage's intentionally public contact markup intact.
        // https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/
        const protectedHtml = html.replace(
          /<a\b[^>]*href="mailto:tech@kukso\.com(?:\?[^\"]*)?"[^>]*>[\s\S]*?<\/a>/g,
          '<!--email_off-->$&<!--/email_off-->',
        );
        await writeFile(homepage, protectedHtml);
      },
    };
  }],
  presets: [
    ['classic', {
      docs: { sidebarPath: './sidebars.ts' },
      blog: {
        showReadingTime: true,
        feedOptions: { type: ['rss', 'atom'], xslt: true },
        onInlineTags: 'warn',
        onInlineAuthors: 'warn',
        onUntruncatedBlogPosts: 'warn',
      },
      theme: { customCss: './src/css/custom.css' },
    } satisfies Preset.Options],
  ],
  themeConfig: {
    colorMode: { defaultMode: 'dark', disableSwitch: true, respectPrefersColorScheme: false },
    image: 'meta/studio-social.png',
    navbar: {
      title: 'Kukso Studios',
      logo: { alt: 'Kukso Studios', src: 'brand/studio-mark.svg', width: 32, height: 32 },
      items: [
        { to: '/', label: 'Studio', position: 'left', activeBaseRegex: '^/$' },
        { to: '/gyrolog', label: 'Gyrolog', position: 'left' },
        { to: '/projects', label: 'Projects', position: 'left' },
        { type: 'dropdown', label: 'Resources', position: 'left', items: [
          { type: 'docSidebar', sidebarId: 'docSidebar', label: 'Documentation' },
          { label: 'Minecraft API', href: 'https://kukso.com/api/minecraft/lib/latest/' },
          { label: 'Hytale API', href: 'https://kukso.com/api/hytale/lib/latest/' },
          { label: 'GitHub', href: 'https://github.com/KuksoHQ' },
          { label: 'Discord', href: 'https://discord.gg/Hqq3CdnenN' },
        ] },
        { href: 'mailto:tech@kukso.com', label: 'Get in touch ↗', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        { title: 'Studio', items: [
          { label: 'About Kukso', to: '/' },
          { label: 'Gyrolog', to: '/gyrolog' },
          { label: 'All projects', to: '/projects' },
          { label: 'tech@kukso.com', href: 'mailto:tech@kukso.com' },
        ] },
        { title: 'Community & resources', items: [
          { label: 'Documentation', to: '/docs/intro' },
          { label: 'GitHub', href: 'https://github.com/KuksoHQ' },
          { label: 'Discord', href: 'https://discord.gg/Hqq3CdnenN' },
          { label: 'X', href: 'https://x.com/KuksoHQ' },
        ] },
        { title: 'Game tools', items: [
          { label: 'SpigotMC', href: 'https://www.spigotmc.org/resources/authors/394490/' },
          { label: 'BuiltByBit', href: 'https://builtbybit.com/search/member?user_id=621438' },
          { label: 'Modrinth', href: 'https://modrinth.com/user/DevBD1' },
        ] },
        { title: 'Legal', items: [
          { label: 'Privacy policy', to: '/privacy-policy' },
          { label: 'Terms of service', to: '/terms-of-service' },
          { label: 'Cookie policy', to: '/cookie-policy' },
        ] },
      ],
      copyright: `© ${new Date().getFullYear()} Kukso Studios. Independent products. Thoughtfully built.`,
    },
    prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
  } satisfies Preset.ThemeConfig,
};

export default config;
