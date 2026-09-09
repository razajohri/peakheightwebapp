/** Curated country + major cities for onboarding location step */

export type CountryOption = {
  code: string
  name: string
  flag: string
  cities: string[]
}

export const COUNTRIES: CountryOption[] = [
  {
    code: 'PK',
    name: 'Pakistan',
    flag: '🇵🇰',
    cities: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta'],
  },
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Miami', 'Seattle', 'Austin'],
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    cities: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Liverpool', 'Bristol', 'Edinburgh'],
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton', 'Winnipeg', 'Quebec City'],
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Canberra', 'Gold Coast', 'Hobart'],
  },
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    cities: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad'],
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah'],
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    cities: ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Khobar'],
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    cities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne', 'Stuttgart'],
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    cities: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes'],
  },
  {
    code: 'NL',
    name: 'Netherlands',
    flag: '🇳🇱',
    cities: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven'],
  },
  {
    code: 'TR',
    name: 'Turkey',
    flag: '🇹🇷',
    cities: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya'],
  },
  {
    code: 'BD',
    name: 'Bangladesh',
    flag: '🇧🇩',
    cities: ['Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet'],
  },
  {
    code: 'NG',
    name: 'Nigeria',
    flag: '🇳🇬',
    cities: ['Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt'],
  },
  {
    code: 'BR',
    name: 'Brazil',
    flag: '🇧🇷',
    cities: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza'],
  },
  {
    code: 'MX',
    name: 'Mexico',
    flag: '🇲🇽',
    cities: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana'],
  },
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    cities: ['Singapore'],
  },
  {
    code: 'MY',
    name: 'Malaysia',
    flag: '🇲🇾',
    cities: ['Kuala Lumpur', 'George Town', 'Johor Bahru', 'Ipoh', 'Kota Kinabalu'],
  },
  {
    code: 'ID',
    name: 'Indonesia',
    flag: '🇮🇩',
    cities: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Bali'],
  },
  {
    code: 'PH',
    name: 'Philippines',
    flag: '🇵🇭',
    cities: ['Manila', 'Cebu', 'Davao', 'Quezon City', 'Makati'],
  },
]

export function findCountry(codeOrName: string): CountryOption | undefined {
  const q = codeOrName.trim().toLowerCase()
  return COUNTRIES.find(
    (c) => c.code.toLowerCase() === q || c.name.toLowerCase() === q
  )
}
