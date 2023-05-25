import Head from 'next/head'

import { Card } from '@/components/card'
import { Section } from '@/components/section'
import { SimpleLayout } from '@/components/simple-layout'
import { profile } from '@/../data/profile';
import { ReactNode } from "react";

function ToolsSection({ children, ...props }: { title: ReactNode, children?: ReactNode }) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({ title, href, children }: JSX.IntrinsicElements['li'] & { href?: string }) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

const grouped: Record<string, (typeof profile.uses.entries[0] & { link?: string })[]> = {};

for (let entry of profile.uses.entries) {
  const group = entry.group || 'Other';
  grouped[group] = grouped[group] || [];
  grouped[group].push(entry);
}

export default function Uses() {
  return (
    <>
      <Head>
        <title>{`Uses - ${profile.author.name}`}</title>
        <meta name="description" content={profile.uses.title} />
      </Head>
      <SimpleLayout title={profile.uses.title} intro={profile.uses.intro}>
        <div className="space-y-20">
          {Object.entries(grouped).map(([title, entries]) => (
            <ToolsSection key={title} title={title}>
              {entries.map(entry => (
                <Tool key={entry.title} title={entry.title} href={entry.link}>
                  {entry.description}
                </Tool>
              ))}
            </ToolsSection>
          ))}
        </div>
      </SimpleLayout>
    </>
  )
}
