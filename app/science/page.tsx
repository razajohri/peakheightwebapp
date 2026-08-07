import { Metadata } from 'next'
import ScienceClient from './science-client'

export const metadata: Metadata = {
    title: 'Science & Methodology - PeakHeight',
    description: 'Learn the biological and physiological methodology behind PeakHeight, including spinal decompression, nutrition, and HGH optimization.',
    alternates: {
        canonical: '/science',
    },
}

export default function SciencePage() {
    return <ScienceClient />
}
