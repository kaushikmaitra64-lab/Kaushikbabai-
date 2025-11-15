
import React, { useState, useCallback } from 'react';
import { generateImage } from './services/geminiService';
import Loader from './components/Loader';
import ImageCard from './components/ImageCard';
import ErrorAlert from './components/ErrorAlert';
import { ImageIcon } from './components/icons/ImageIcon';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const url = await generateImage(prompt);
      setImageUrl(url);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to generate image: ${err.message}`);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
             <ImageIcon className="w-10 h-10 text-cyan-400" />
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              AI Image Generator
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Bring your ideas to life. Describe anything you can imagine and let AI create it for you.
          </p>
        </header>

        <main className="w-full">
          <form onSubmit={handleGenerateImage} className="flex flex-col sm:flex-row items-center gap-3 mb-8 sticky top-4 z-10 bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-700">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A cinematic shot of a raccoon in a library..."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-300 text-gray-200 placeholder-gray-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="w-full sm:w-auto flex-shrink-0 px-6 py-3 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg shadow-md hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:saturate-50"
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </form>

          <div className="w-full flex justify-center items-center min-h-[300px] sm:min-h-[512px]">
            {isLoading && <Loader />}
            {error && <ErrorAlert message={error} />}
            {imageUrl && !isLoading && <ImageCard src={imageUrl} alt={prompt} />}
            {!isLoading && !error && !imageUrl && (
              <div className="text-center text-gray-500">
                <p>Your generated image will appear here.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
