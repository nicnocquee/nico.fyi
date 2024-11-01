import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { Bluesky } from './social-icons/icons'

export default function Footer() {
  return (
    <footer className="flex flex-col space-y-8 divide-y divide-gray-200 dark:divide-gray-700">
      <div className="mb-4 mt-16 flex flex-col items-center">
        <div className="mb-4 flex flex-col space-y-2 text-center">
          <p>Boost Your Team's Efficiency with my new book!</p>
          <p className="text-2xl font-bold text-primary-600 underline">
            <a href="https://pr.nico.fyi">Pull Request Best Practices</a>
          </p>
          <p>Master the Art of Writing & Reviewing Pull Requests!</p>
        </div>
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
          <a href="https://bsky.app/profile/nico.fyi">
            <Bluesky />
          </a>
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
      </div>
    </footer>
  )
}
