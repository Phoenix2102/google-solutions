import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { preprocessImage } from '../../utils/imageProcessing';

function ReceiptUpload() {
  const [processing, setProcessing] = useState(false);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      const file = acceptedFiles[0];
      if (!file) return;

      setProcessing(true);
      setError(null);
      
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Process image
      const processedImage = await preprocessImage(file, (progress) => {
        setProgress(Math.round(progress * 100));
      });

      // Handle the processed image...
      console.log('Processed image:', processedImage);
      
    } catch (err) {
      setError(err.message);
      console.error('Error processing receipt:', err);
    } finally {
      setProcessing(false);
      setProgress(0);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the receipt here...</p>
        ) : (
          <p>Drag & drop a receipt, or click to select one</p>
        )}
      </div>

      {processing && (
        <div className="mt-4">
          <p>Processing... {progress}%</p>
          <div className="w-full bg-gray-200 rounded">
            <div 
              className="bg-blue-600 h-2 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-500">
          Error: {error}
        </div>
      )}

      {preview && !processing && (
        <div className="mt-4">
          <img 
            src={preview} 
            alt="Receipt preview" 
            className="max-w-full h-auto rounded"
          />
        </div>
      )}
    </div>
  );
}

export default ReceiptUpload;
