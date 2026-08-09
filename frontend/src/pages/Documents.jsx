import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Filter, FileText } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import DocumentCard from '../components/DocumentCard'
import DocumentDetailModal from '../components/DocumentDetailModal'
import { getDocuments, deleteDocument } from '../services/api'

const categories = ['All', 'Identity', 'Travel', 'Insurance', 'Vehicle', 'Health', 'Property', 'Finance', 'Other']
const statuses = ['All', 'Valid', 'Expiring Soon', 'Critical', 'Expired']
const sortOptions = [
  { key: 'recent', label: 'Recently Added' },
  { key: 'name', label: 'Name A‑Z' },
  { key: 'expiry', label: 'Expiry Date' },
]

export default function Documents() {
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [sortKey, setSortKey] = useState('recent')
  const [selectedDoc, setSelectedDoc] = useState(null)

  const fetchDocs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getDocuments();
      setDocs(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load documents.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleView = (doc) => {
    setSelectedDoc(doc)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    try {
      await deleteDocument(id);
      setDocs(docs.filter((doc) => doc._id !== id));
    } catch (err) {
      alert(err.message || 'Failed to delete document.');
    }
  }

  const filteredDocs = docs
    .filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.category.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory
      const matchesStatus = selectedStatus === 'All' || doc.status === selectedStatus
      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      if (sortKey === 'name') return a.name.localeCompare(b.name)
      if (sortKey === 'expiry') {
        const aDate = a.expiryDate ? new Date(a.expiryDate) : new Date('2100-01-01')
        const bDate = b.expiryDate ? new Date(b.expiryDate) : new Date('2100-01-01')
        return aDate - bDate
      }
      // recent (default)
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

  const clearFilters = () => {
    setSearch('')
    setSelectedCategory('All')
    setSelectedStatus('All')
    setSortKey('recent')
  }

  return (
    <div className="space-y-6">
      <PageHeader title="My Documents" description="Keep all your important documents organized and easy to find.">
        <Link
          to="/upload"
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-all shadow-sm shadow-blue-500/10"
        >
          <Plus className="h-4 w-4" />
          <span>+ Upload Document</span>
        </Link>
      </PageHeader>

      {/* Error */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl text-sm font-semibold">
          {error}
        </div>
      )}

      {/* Search & Category */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search documents by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200/80 rounded-2xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium shadow-xs"
          />
        </div>
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <Filter className="h-4 w-4 text-slate-400 mr-1 flex-shrink-0 hidden sm:block" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Status & Sort */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedStatus === st
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-sm text-slate-600 font-medium">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="rounded-md border border-slate-200 bg-white py-1.5 pl-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {sortOptions.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 animate-pulse h-40" />
          ))}
        </div>
      )}

      {/* Document Grid */}
      {!loading && filteredDocs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 animate-fade-in">
          {filteredDocs.map((doc) => (
            <DocumentCard
              key={doc._id}
              doc={{ ...doc, id: doc._id }}
              onView={() => handleView(doc)}
              onDelete={() => handleDelete(doc._id)}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredDocs.length === 0 && (
        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 shadow-sm mt-8">
          <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 inline-block">
            <FileText className="h-10 w-10" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800 text-lg">
              {docs.length === 0 ? 'No documents yet' : 'No documents found'}
            </h3>
            <p className="text-sm text-slate-500 font-medium">
              {docs.length === 0 ? 'Upload your first document to get started.' : 'Try adjusting your filters.'}
            </p>
          </div>
          {docs.length > 0 && (
            <button onClick={clearFilters} className="mt-3 text-blue-600 hover:underline text-sm font-medium">
              Clear Filters
            </button>
          )}
          <Link
            to="/upload"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-semibold mt-2"
          >
            <Plus className="h-4 w-4" />
            <span>Upload Document</span>
          </Link>
        </div>
      )}

      {/* Modal */}
      {selectedDoc && (
        <DocumentDetailModal
          doc={selectedDoc}
          onClose={() => setSelectedDoc(null)}
          onDelete={() => {
            setSelectedDoc(null)
            handleDelete(selectedDoc._id)
          }}
        />
      )}
    </div>
  )
}
