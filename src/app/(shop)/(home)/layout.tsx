import Header2 from '@/components/Header/Header2'
import { ApplicationLayout } from '../application-layout'

export default function Layout({ children, params }: { children: React.ReactNode; params: any }) {
  return <ApplicationLayout header={<Header2 />}>{children}</ApplicationLayout>
}
