import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [videoUrl, setVideoUrl] = useState('')
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [format, setFormat] = useState('json')

  const fetchTranscript = async () => {
    setError('')
    setTranscript('')
    setIsLoading(true)
    try {
      const apiUrl = `/api/transcript?video_url=${encodeURIComponent(videoUrl)}&format=${format}`;
      const response = await fetch(apiUrl)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'An error occurred while fetching the transcript')
      }

      const data = await response.text()
      setTranscript(data)
    } catch (error) {
      console.error('Error fetching transcript:', error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadTranscript = () => {
    if (!transcript) return;

    const blob = new Blob([transcript], { type: format === 'json' ? 'application/json' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcript.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <Head>
        <title>YouTube Transcript Downloader</title>
        <meta name="description" content="Fetch YouTube video transcripts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6 text-center">YouTube Transcript Fetcher</h1>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="Enter YouTube Video URL"
                    disabled={isLoading}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <select 
                    value={format} 
                    onChange={(e) => setFormat(e.target.value)} 
                    disabled={isLoading}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  >
                    <option value="json">JSON</option>
                    <option value="txt">Plain Text</option>
                    <option value="srt">SRT</option>
                  </select>
                  <button 
                    onClick={fetchTranscript} 
                    disabled={isLoading}
                    className="btn-primary"
                  >
                    {isLoading ? 'Fetching...' : 'Fetch Transcript'}
                  </button>
                </div>
              </div>
              {error && <p className="mt-2 text-red-600">{error}</p>}
              {isLoading && (
                <div className="mt-4 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              )}
              {transcript && (
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <button 
                    onClick={downloadTranscript}
                    className="btn-secondary"
                  >
                    Download Transcript
                  </button>
                  <pre className="mt-4 bg-gray-100 rounded p-4 overflow-auto max-h-96 text-sm">{transcript}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}