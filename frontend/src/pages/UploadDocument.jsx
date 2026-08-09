import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Tag, AlertCircle, FileText } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { createDocument } from '../services/api';
import StatusBadge from '../components/StatusBadge';

const categories = ['Identity', 'Travel', 'Vehicle', 'Insurance', 'Health', 'Property', 'Finance', 'Other'];

export default function UploadDocument() {
  const navigate = useNavigate();
  
  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState(''); // default empty, force selection
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  
  const [error, setError] = useState({}); // object for field-specific errors
  const [success, setSuccess] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const validateAndSetFile = (selected) => {
    setFile(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selected = e.dataTransfer.files[0];
      validateAndSetFile(selected);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      validateAndSetFile(selected);
    }
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});

    // Client-side validation
    if (!file) {
      setError(prev => ({ ...prev, file: 'Please select or drag a document file.' }));
      return;
    }
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setError(prev => ({ ...prev, file: 'Unsupported file type. Allowed: PDF, JPG, JPEG, PNG.' }));
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError(prev => ({ ...prev, file: 'File exceeds maximum size of 10 MB.' }));
      return;
    }
    if (!name.trim()) {
      setError(prev => ({ ...prev, name: 'Document name is required.' }));
      return;
    }
    if (!category) {
      setError(prev => ({ ...prev, category: 'Please select a category.' }));
      return;
    }

    // Build FormData and send to backend
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', name.trim());
      formData.append('category', category);
      if (issueDate) formData.append('issueDate', issueDate);
      if (expiryDate) formData.append('expiryDate', expiryDate);
      if (description) formData.append('description', description);

      await createDocument(formData);

      setSuccess(true);
      setShowToast(true);
      setTimeout(() => {
        navigate('/documents');
      }, 1500);
    } catch (err) {
      setError(prev => ({ ...prev, file: err.message || 'Upload failed. Please try again.' }));
    } finally {
      setSubmitting(false);
    }
  };

  // Helper to calculate status based on expiry date
  const calculateStatus = (expiry) => {
    if (!expiry) return '';
    const now = new Date();
    const exp = new Date(expiry);
    const diffDays = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
    if (diffDays > 30) return 'Valid';
    if (diffDays > 0) return 'Expiring Soon';
    return 'Expired';
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Add a Document" 
        description="Keep your important documents organized and easy to access."
      />

      {showToast && (
        <div className="fixed top-4 right-4 z-50 flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-2xl shadow-card backdrop-blur-xl text-sm font-semibold">
          <span>✓</span>
          <span>Document saved! Redirecting…</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        <div className="lg:col-span-2 space-y-3">
          <label className="text-xs font-bold text-[--text-muted] uppercase tracking-widest block">Document File</label>
          
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[300px] transition-all duration-300 ${
              isDragActive 
                ? 'border-indigo-500 bg-indigo-500/5' 
                : file 
                  ? 'border-emerald-500/40 bg-emerald-500/5' 
                  : 'border-[--border-strong] hover:border-indigo-500/40 hover:bg-indigo-500/5'
            }`}
          >
            {file ? (
                <div className="space-y-4 text-center">
                  {file.type && file.type.startsWith('image/') ? (
                    <img src={URL.createObjectURL(file)} alt="preview" className="max-h-48 mx-auto rounded-xl border border-[--border]" />
                  ) : (
                    <div className="p-4 bg-emerald-500/10 rounded-2xl inline-block text-emerald-400 border border-emerald-500/20">
                      <FileText className="h-12 w-12" />
                    </div>
                  )}
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-sm truncate max-w-[200px] mx-auto">{file.name}</h4>
                    <p className="text-xs text-[--text-muted] font-medium">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-xs font-bold text-rose-400 hover:text-rose-300 hover:underline"
                  >
                    Remove File
                  </button>
                </div>
              ) : (
              <div className="space-y-4">
                <div className="p-4 bg-[--bg-elevated] rounded-2xl inline-block text-[--text-muted] border border-[--border]">
                  <Upload className="h-12 w-12" />
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-white text-sm">Drag and drop file here</p>
                  <p className="text-xs text-[--text-muted] font-medium">PDF, PNG, JPG, JPEG — max 10 MB</p>
                </div>
                <div>
                  <label className="inline-flex items-center justify-center bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-colors border border-indigo-500/20">
                    <span>Choose File</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange}
                      accept=".pdf,.png,.jpg,.jpeg"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 3 cols: Meta Data Fields */}
        <div className="lg:col-span-3 glass rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="font-bold text-white text-lg">Document Details</h3>
          
          {error.file && (
            <div className="flex items-start space-x-3 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>{error.file}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Document Name */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-[--text-muted] uppercase tracking-widest block">Document Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Passport or Car Insurance Policy"
                className="w-full px-4 py-3 bg-[--bg-elevated] border border-[--border] hover:border-[--border-strong] focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 rounded-xl text-sm text-white placeholder-[--text-muted] outline-none transition-all"
              />
              {error.name && <p className="text-rose-400 text-xs mt-1">{error.name}</p>}
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[--text-muted] uppercase tracking-widest block">Category</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-[--bg-elevated] border border-[--border] hover:border-[--border-strong] focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 rounded-xl text-sm text-white outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[--bg-elevated]">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-[--bg-elevated]">{cat}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[--text-muted]">
                  <Tag className="h-4 w-4" />
                </div>
              </div>
              {error.category && <p className="text-rose-400 text-xs mt-1">{error.category}</p>}
            </div>

            {/* Issue Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[--text-muted] uppercase tracking-widest block">Issue Date</label>
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full px-4 py-3 bg-[--bg-elevated] border border-[--border] hover:border-[--border-strong] focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 rounded-xl text-sm text-white outline-none transition-all"
              />
            </div>

            {/* Expiry Date */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-[--text-muted] uppercase tracking-widest block">Expiry Date</label>
                {expiryDate && <StatusBadge status={calculateStatus(expiryDate)} />}
              </div>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-4 py-3 bg-[--bg-elevated] border border-[--border] hover:border-[--border-strong] focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 rounded-xl text-sm text-white outline-none transition-all"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-[--text-muted] uppercase tracking-widest block">Notes (optional)</label>
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Policy number, issuing authority, or any other notes"
                className="w-full px-4 py-3 bg-[--bg-elevated] border border-[--border] hover:border-[--border-strong] focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 rounded-xl text-sm text-white placeholder-[--text-muted] outline-none transition-all resize-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[--border] flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/documents')}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[--text-secondary] border border-[--border] hover:border-[--border-strong] hover:text-white transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={success || submitting}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-glow-sm hover:shadow-glow"
            >
              {submitting ? 'Uploading…' : 'Save Document'}
            </button>
          </div>
        </div>

      </form>
    </div>
  )
}
