import { useState } from 'react';
import { Upload, FileText, Image, CheckCircle, Loader, Plus, X, AlertCircle } from 'lucide-react';
import { Navigation } from '../components/Navigation';

interface Transaction {
  date: string;
  description: string;
  amount: string;
  category: string;
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

export function UploadPage() {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'processing' | 'complete' | 'error'>('idle');
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [transactionsAdded, setTransactionsAdded] = useState<number>(0);
  const [showManualForm, setShowManualForm] = useState(false);
  const [manualTransaction, setManualTransaction] = useState<Transaction>({
    date: '',
    description: '',
    amount: '',
    category: 'Food',
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;

    // Validate file type
    const validTypes = [
      'text/csv',
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png'
    ];
    
    if (!validTypes.includes(file.type)) {
      setUploadStatus('error');
      setErrorMessage('Invalid file type. Please upload CSV, PDF, JPG, or PNG files only.');
      setTimeout(() => setUploadStatus('idle'), 4000);
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setUploadStatus('error');
      setErrorMessage('File size exceeds 10MB. Please upload a smaller file.');
      setTimeout(() => setUploadStatus('idle'), 4000);
      return;
    }

    // Set uploaded file info
    setUploadedFile({
      name: file.name,
      size: file.size,
      type: file.type
    });

    setUploadStatus('processing');
    setErrorMessage('');

    try {
      // Process the file based on type
      if (file.type === 'text/csv') {
        await processCSVFile(file);
      } else if (file.type === 'application/pdf') {
        await processPDFFile(file);
      } else {
        await processImageFile(file);
      }

      // Simulate random number of transactions added
      const randomTransactions = Math.floor(Math.random() * 20) + 10;
      setTransactionsAdded(randomTransactions);
      
      setUploadStatus('complete');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setUploadStatus('idle');
        setUploadedFile(null);
      }, 5000);
      
    } catch (error) {
      setUploadStatus('error');
      setErrorMessage('An error occurred while processing the file. Please try again.');
      setTimeout(() => setUploadStatus('idle'), 4000);
    }

    // Reset the input so the same file can be uploaded again
    e.target.value = '';
  };

  const processCSVFile = async (file: File): Promise<void> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const text = e.target?.result as string;
        
        // Parse CSV (basic parsing)
        const lines = text.split('\n');
        const transactions: Transaction[] = [];
        
        // Skip header row and process data
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim()) {
            const values = lines[i].split(',');
            if (values.length >= 3) {
              transactions.push({
                date: values[0]?.trim() || '',
                description: values[1]?.trim() || '',
                amount: values[2]?.trim() || '',
                category: values[3]?.trim() || 'Others'
              });
            }
          }
        }
        
        // Here you would typically send this data to your backend/database
        console.log('Parsed CSV transactions:', transactions);
        
        // Simulate processing time
        setTimeout(() => resolve(), 2000);
      };
      
      reader.onerror = () => {
        throw new Error('Failed to read CSV file');
      };
      
      reader.readAsText(file);
    });
  };

  const processPDFFile = async (file: File): Promise<void> => {
    return new Promise((resolve) => {
      // In a real application, you would use a PDF parsing library
      // or send to backend for OCR processing
      console.log('Processing PDF file:', file.name);
      
      // Simulate OCR processing
      setTimeout(() => {
        console.log('PDF processed successfully');
        resolve();
      }, 3000);
    });
  };

  const processImageFile = async (file: File): Promise<void> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        // In a real application, you would send this to an OCR service
        const imageData = e.target?.result;
        console.log('Processing image file:', file.name);
        
        // Simulate OCR processing
        setTimeout(() => {
          console.log('Image processed successfully');
          resolve();
        }, 2500);
      };
      
      reader.onerror = () => {
        throw new Error('Failed to read image file');
      };
      
      reader.readAsDataURL(file);
    });
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadStatus('processing');
    
    // Here you would typically send this data to your backend/database
    console.log('Manual transaction:', manualTransaction);
    
    setTimeout(() => {
      setUploadStatus('complete');
      setTransactionsAdded(1);
      setShowManualForm(false);
      setManualTransaction({ date: '', description: '', amount: '', category: 'Food' });
      setTimeout(() => setUploadStatus('idle'), 2000);
    }, 1500);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-white mb-2">Data Upload & Entry</h1>
          <p className="text-zinc-400">Add transactions manually or upload documents for AI processing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* File Upload Section */}
          <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-4">Upload Documents</h3>
            <p className="text-sm text-zinc-400 mb-6">
              Upload CSV files or bank statements (PDF) for automatic processing
            </p>

            <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:border-green-500 transition-colors cursor-pointer bg-zinc-800/50">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".csv,.pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4 border border-zinc-700">
                    <Upload className="h-8 w-8 text-green-500" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Drop files here or click to browse</h4>
                  <p className="text-sm text-zinc-500 mb-4">Supports CSV, PDF, JPG, PNG (Max 10MB)</p>
                  <span className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-block">
                    Choose File
                  </span>
                </div>
              </label>
            </div>

            {/* File Info */}
            {uploadedFile && uploadStatus !== 'idle' && (
              <div className="mt-4 p-3 rounded-lg bg-zinc-800 border border-zinc-700">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{uploadedFile.name}</p>
                    <p className="text-xs text-zinc-400">{formatFileSize(uploadedFile.size)}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Processing Status */}
            {uploadStatus !== 'idle' && (
              <div className="mt-6 p-4 rounded-lg bg-zinc-800 border border-zinc-700">
                {uploadStatus === 'processing' && (
                  <div className="flex items-center gap-3">
                    <Loader className="h-5 w-5 text-green-500 animate-spin flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">Processing with AI OCR...</p>
                      <p className="text-xs text-zinc-400">Extracting and structuring data</p>
                    </div>
                  </div>
                )}
                {uploadStatus === 'complete' && (
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">Data structured & saved!</p>
                      <p className="text-xs text-green-400">
                        {transactionsAdded} transaction{transactionsAdded !== 1 ? 's' : ''} added to your account
                      </p>
                    </div>
                  </div>
                )}
                {uploadStatus === 'error' && (
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">Upload Failed</p>
                      <p className="text-xs text-red-400">{errorMessage}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Supported Formats */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg border border-zinc-700">
                <FileText className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">CSV Files</p>
                  <p className="text-xs text-zinc-400">Transaction exports</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg border border-zinc-700">
                <Image className="h-5 w-5 text-purple-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">PDF & Images</p>
                  <p className="text-xs text-zinc-400">Bank statements</p>
                </div>
              </div>
            </div>
          </div>

          {/* Manual Entry Section */}
          <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Manual Entry</h3>
              {!showManualForm && (
                <button
                  onClick={() => setShowManualForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  <Plus className="h-4 w-4" />
                  Add Transaction
                </button>
              )}
            </div>

            {!showManualForm ? (
              <div className="text-center py-12">
                <div className="h-16 w-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4 border border-zinc-700">
                  <Plus className="h-8 w-8 text-zinc-600" />
                </div>
                <p className="text-zinc-500 mb-4">No manual entries yet</p>
                <button
                  onClick={() => setShowManualForm(true)}
                  className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors border border-zinc-700"
                >
                  Add Your First Transaction
                </button>
              </div>
            ) : (
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Date</label>
                  <input
                    type="date"
                    value={manualTransaction.date}
                    onChange={(e) =>
                      setManualTransaction({ ...manualTransaction, date: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-zinc-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
                  <input
                    type="text"
                    value={manualTransaction.description}
                    onChange={(e) =>
                      setManualTransaction({ ...manualTransaction, description: e.target.value })
                    }
                    placeholder="e.g., Grocery shopping"
                    className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-zinc-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={manualTransaction.amount}
                      onChange={(e) =>
                        setManualTransaction({ ...manualTransaction, amount: e.target.value })
                      }
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-zinc-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Category</label>
                  <select
                    value={manualTransaction.category}
                    onChange={(e) =>
                      setManualTransaction({ ...manualTransaction, category: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
                  >
                    <option value="Food">Food & Dining</option>
                    <option value="Transport">Transport</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Housing">Housing</option>
                    <option value="Income">Income</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg transition-colors font-medium"
                  >
                    Save Transaction
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowManualForm(false)}
                    className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors border border-zinc-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* AI Features */}
        <div className="mt-8 bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-xl p-8 shadow-lg text-white border border-green-500/20">
          <h3 className="text-xl font-semibold mb-4">AI-Powered Processing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                <FileText className="h-5 w-5 text-green-400" />
              </div>
              <h4 className="font-medium mb-1">Smart OCR</h4>
              <p className="text-sm text-zinc-300">
                Automatically extract data from bank statements and receipts
              </p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <h4 className="font-medium mb-1">Auto-Categorization</h4>
              <p className="text-sm text-zinc-300">
                Intelligent categorization based on merchant and description
              </p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                <Upload className="h-5 w-5 text-green-400" />
              </div>
              <h4 className="font-medium mb-1">Bulk Import</h4>
              <p className="text-sm text-zinc-300">
                Process hundreds of transactions in seconds with AI
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}