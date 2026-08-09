import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Calendar, Tag, AlertCircle, FileText, CheckCircle2, Image, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // reset errors
    setError({});

    // File validation
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
      setError(prev => ({ ...prev, file: 'File exceeds maximum size of 10 MB.' }));
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

    // Mock success
    setSuccess(true);
    setShowToast(true);
    // clear form after short delay
    setTimeout(() => {
      setName('');
      // Reset status computation if needed

      setCategory('');
      setIssueDate('');
      setExpiryDate('');
      setDescription('');
      setFile(null);
      setSuccess(false);
      setShowToast(false);
    }, 2500);
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
        <div className="fixed top-4 right-4 bg-emerald-100 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-xl shadow-md">
          Document saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left 2 cols: Drag & Drop File Zone */}
        <div className="lg:col-span-2 space-y-4">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Document File</label>
          
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[300px] transition-all duration-200 ${
              isDragActive 
                ? 'border-blue-500 bg-blue-50/50' 
                : file 
                  ? 'border-emerald-300 bg-emerald-50/10' 
                  : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50/50'
            }`}
          >
            {file ? (
                <div className="space-y-4 text-center">
                  {file.type && file.type.startsWith('image/') ? (
                    <img src={URL.createObjectURL(file)} alt="preview" className="max-h-48 mx-auto rounded-md" />
                  ) : (
                    <div className="p-4 bg-emerald-50 rounded-2xl inline-block text-emerald-600 border border-emerald-100">
                      <FileText className="h-12 w-12" />
                    </div>
                  )}
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 text-sm truncate max-w-[200px] mx-auto">{file.name}</h4>
                    <p className="text-xs text-slate-400 font-medium">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline"
                  >
                    Remove File
                  </button>
                </div>
              ) : (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl inline-block text-slate-400 border border-slate-100">
                  <Upload className="h-12 w-12" />
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-slate-800 text-sm">Drag and drop file here</p>
                  <p className="text-xs text-slate-400 font-medium">Supports PDF, PNG, JPG, or JPEG (Max 10 MB)</p>
                </div>
                <div>
                  <label className="inline-flex items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-colors border border-blue-100/50">
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
        <div className="lg:col-span-3 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-800 text-lg">Document Metadata</h3>
          
          {/* General error (e.g., file validation) */}
          {error.file && (
            <div className="p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl text-xs font-semibold flex items-center space-x-2">
              <AlertCircle className="h-4 w-4" />
              <span>{error.file}</span>
            </div>
          )}

          {/* Success toast is handled separately; keep placeholder for any future use */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Document Name */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Document Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Passport or Car Insurance Policy"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
              />
              {error.name && (
                  <p className="text-rose-600 text-xs mt-1">{error.name}</p>
                )}
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Category</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium appearance-none cursor-pointer"
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                  <Tag className="h-4 w-4" />
                </div>
              </div>
              {error.category && (
                  <p className="text-rose-600 text-xs mt-1">{error.category}</p>
                )}
            </div>

            {/* Issue Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Issue Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Expiry Date */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Expiry Date</label>
                {expiryDate && <StatusBadge status={calculateStatus(expiryDate)} />}
              </div>
              <div className="relative">
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Description / Notes</label>
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional notes e.g., Policy number or issuing authority"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium resize-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={success}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-blue-500/10 cursor-pointer"
              >
                Save Document
              </button>
              <button
                type="button"
                onClick={() => navigate('/documents')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-xl transition-all"
              >
                Cancel
              </button>
            </div>          </div>
        </div>

      </form>
    </div>
  )
}
