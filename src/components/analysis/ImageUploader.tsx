
import { useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ContextualHelp } from "../common/ContextualHelp";

interface ImageUploaderProps {
  onImageUpload?: (file: File) => void;
}

export function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image size should be less than 10MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedImage(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    setIsUploading(true);

    // Simulate upload process
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Image uploaded successfully",
        description: `${selectedImage.name} has been uploaded and sent for analysis.`,
      });

      if (onImageUpload) {
        onImageUpload(selectedImage);
      }

      // Don't reset the image after upload, as we'll show analysis results
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center space-x-2 mb-4">
        <h2 className="text-xl font-medium">Upload Retinal Image</h2>
        <ContextualHelp content="Upload a high-quality fundus, OCT, or other retinal image for AI-assisted analysis. Supported formats: JPEG, PNG. Max size: 10MB." />
      </div>

      {!selectedImage ? (
        <Card
          className={`border-dashed ${
            isDragging ? "border-primary" : "border-gray-300"
          }`}
        >
          <CardContent
            className="flex flex-col items-center justify-center p-8 cursor-pointer"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <div className="h-16 w-16 rounded-full bg-medical-100 flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-medical-500" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="font-medium">Drag & Drop or Click to Upload</h3>
              <p className="text-sm text-muted-foreground">
                Supported formats: JPEG, PNG. Max size: 10MB
              </p>
            </div>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <div className="aspect-video relative overflow-hidden rounded-md">
                  <img
                    src={previewUrl || ""}
                    alt="Preview"
                    className="object-contain w-full h-full"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <ImageIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium">{selectedImage.name}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {(selectedImage.size / (1024 * 1024)).toFixed(2)} MB
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            className="w-full"
            onClick={handleUpload}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Processing...
              </>
            ) : (
              "Start Analysis"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
