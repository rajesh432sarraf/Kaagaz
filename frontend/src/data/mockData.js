import { 
  CreditCard, 
  Plane, 
  Car, 
  ShieldAlert, 
  HeartPulse, 
  Home 
} from 'lucide-react'

export const mockDocuments = [
  {
    id: 'doc-1',
    name: 'Aadhaar Card',
    category: 'Identity',
    issueDate: '2018-05-12',
    expiryDate: null,
    status: 'Valid',
    description: 'National UIDAI Identity Card'
  },
  {
    id: 'doc-2',
    name: 'Passport',
    category: 'Travel',
    issueDate: '2020-09-01',
    expiryDate: '2030-09-01',
    status: 'Valid',
    description: 'Standard 10-year Passport Book'
  },
  {
    id: 'doc-3',
    name: 'PAN Card',
    category: 'Identity',
    issueDate: '2019-02-28',
    expiryDate: null,
    status: 'Valid',
    description: 'Permanent Account Number Card'
  },
  {
    id: 'doc-4',
    name: 'Car Insurance',
    category: 'Insurance',
    issueDate: '2025-08-01',
    expiryDate: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Expires in 23 days
    status: 'Expiring Soon',
    description: 'Comprehensive Auto Insurance Policy'
  },
  {
    id: 'doc-5',
    name: 'Driving Licence',
    category: 'Vehicle',
    issueDate: '2015-04-10',
    expiryDate: new Date(Date.now() + 84 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Expires in 84 days
    status: 'Expiring Soon',
    description: 'Motor Vehicle Driving License'
  },
  {
    id: 'doc-6',
    name: 'Rent Agreement',
    category: 'Property',
    issueDate: '2024-08-01',
    expiryDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Expired 5 days ago
    status: 'Expired',
    description: 'Residential Tenancy Contract'
  },
  {
    id: 'doc-7',
    name: 'Voter ID Card',
    category: 'Identity',
    issueDate: '2017-10-15',
    expiryDate: null,
    status: 'Valid',
    description: 'Election Commission Voter Identity Card'
  },
  {
    id: 'doc-8',
    name: 'Health Insurance Card',
    category: 'Health',
    issueDate: '2025-01-01',
    expiryDate: '2027-01-01',
    status: 'Valid',
    description: 'Medical & Health Insurance Policy Plan'
  },
  {
    id: 'doc-9',
    name: 'Vehicle Registration RC',
    category: 'Vehicle',
    issueDate: '2021-03-20',
    expiryDate: '2036-03-20',
    status: 'Valid',
    description: 'Official Registration Certificate of Vehicle'
  },
  {
    id: 'doc-10',
    name: 'House Deeds',
    category: 'Property',
    issueDate: '2021-06-18',
    expiryDate: null,
    status: 'Valid',
    description: 'Land Registry Property Certificates'
  },
  {
    id: 'doc-11',
    name: 'Annual Health Report',
    category: 'Health',
    issueDate: '2025-11-20',
    expiryDate: null,
    status: 'Valid',
    description: 'Diagnostic Clearance Certificates'
  },
  {
    id: 'doc-12',
    name: 'Travel Visa (Schengen)',
    category: 'Travel',
    issueDate: '2026-05-01',
    expiryDate: '2027-05-01',
    status: 'Valid',
    description: 'Multi-entry Schengen Travel Authorization'
  }
];

export const mockCategories = [
  { name: 'Identity', count: 3, icon: CreditCard, color: 'text-blue-600 bg-blue-50 border-blue-100' },
  { name: 'Travel', count: 2, icon: Plane, color: 'text-sky-600 bg-sky-50 border-sky-100' },
  { name: 'Vehicle', count: 2, icon: Car, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
  { name: 'Insurance', count: 2, icon: ShieldAlert, color: 'text-purple-600 bg-purple-50 border-purple-100' },
  { name: 'Health', count: 2, icon: HeartPulse, color: 'text-rose-600 bg-rose-50 border-rose-100' },
  { name: 'Property', count: 1, icon: Home, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' }
];

export const mockTasks = [
  {
    id: '1',
    name: 'Renew Passport',
    percentage: 66,
    documents: [
      { name: 'Old Passport', status: 'Available' },
      { name: 'Passport Photo (2x2)', status: 'Available' },
      { name: 'Proof of Address (Utility Bill)', status: 'Missing' },
      { name: 'Application Receipt', status: 'Needs Verification' }
    ]
  },
  {
    id: '2',
    name: 'Apply for Car Insurance',
    percentage: 100,
    documents: [
      { name: 'Driving Licence', status: 'Available' },
      { name: 'Vehicle Registration (RC)', status: 'Available' }
    ]
  }
];
