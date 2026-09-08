import AppAuthLayout from '@/components/AppAuthLayout'

export default function PaywallLayout({ children }: { children: React.ReactNode }) {
  return <AppAuthLayout>{children}</AppAuthLayout>
}
