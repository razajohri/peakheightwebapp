import AppAuthLayout from '@/components/AppAuthLayout'

export default function AuthRouteLayout({ children }: { children: React.ReactNode }) {
  return <AppAuthLayout>{children}</AppAuthLayout>
}
