'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';
import imageCompression from 'browser-image-compression';
import { generateNextTitSku } from '../../../utils/generateTitSku';
import {
  Package,
  Upload,
  X,
  Plus,
  Minus,
  Save,
  ArrowLeft,
  Image as ImageIcon
} from 'lucide-react';
import '../../../styles/admin-products.css';

export default function CreateProductPage() {
  const router = useRouter();
  const { user, profile, isAdmin, isSuperAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [categories, setCategories] = useState([]);
  const [sections, setSections] = useState([]);
  const [imageFiles, setImageFiles] = useState([]); // Keep for backward compatibility, but will be empty after upload
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageUrls, setImageUrls] = useState([]); // URLs added directly or uploaded
  const [urlInput, setUrlInput] = useState(''); // Temporary URL input
  const [errors, setErrors] = useState({});
  const [submitProgress, setSubmitProgress] = useState('');
  const [uploadProgress, setUploadProgress] = useState({}); // Track upload progress: { fileIndex: { status: 'uploading'|'success'|'error', progress: 0-100, message: '' } }
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_ids: [], // Array of category IDs
    primary_category_id: '', // Primary category (first selected)
    section_ids: [], // Array of section IDs
    location: '',
    region: '',
    delivery: false,
    delivery_options: [],
    supplier_whatsapp: '',
    supplier_type: '', // 'supplier' or 'manufacturer' - required
    price: '',
    compare_price: '',
    stock_quantity: 0,
    sku: '',
    specifications: {},
    is_featured: false,
    is_active: true,
    verification_status: 'approved' // Admin can directly approve
  });

  const [deliveryOption, setDeliveryOption] = useState('');

  const [specFields, setSpecFields] = useState([{ key: '', value: '' }]);

  // Check permissions
  useEffect(() => {
    if (!isAdmin && !isSuperAdmin) {
      router.push('/admin');
    }
  }, [isAdmin, isSuperAdmin, router]);

  // Fetch categories and sections
  useEffect(() => {
    fetchCategories();
    fetchSections();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase
        .from('home_sections')
        .select('id, display_name, name, section_type')
        .eq('is_active', true)
        .order('sort_order');

      if (error) throw error;
      setSections(data || []);
    } catch (error) {
      console.error('Error fetching sections:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCategoryChange = (categoryId) => {
    setFormData(prev => {
      const categoryIds = [...prev.category_ids];
      const index = categoryIds.indexOf(categoryId);
      
      if (index > -1) {
        // Remove category
        categoryIds.splice(index, 1);
        // If removed category was primary, set first remaining as primary
        const newPrimary = categoryIds.length > 0 ? categoryIds[0] : '';
        return {
          ...prev,
          category_ids: categoryIds,
          primary_category_id: prev.primary_category_id === categoryId ? newPrimary : prev.primary_category_id
        };
      } else {
        // Add category
        const newCategoryIds = [...categoryIds, categoryId];
        // If no primary category set, make this the primary
        const newPrimary = prev.primary_category_id || categoryId;
        return {
          ...prev,
          category_ids: newCategoryIds,
          primary_category_id: newPrimary
        };
      }
    });
  };

  const setPrimaryCategory = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      primary_category_id: categoryId
    }));
  };

  const handleSectionChange = (sectionId) => {
    setFormData(prev => {
      const sectionIds = [...prev.section_ids];
      const index = sectionIds.indexOf(sectionId);
      
      if (index > -1) {
        // Remove section
        sectionIds.splice(index, 1);
      } else {
        // Add section
        sectionIds.push(sectionId);
      }
      
      return {
        ...prev,
        section_ids: sectionIds
      };
    });
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];
    const errors = [];

    // Validate files first
    files.forEach(file => {
      // Validate file type (matching storage bucket allowed_mime_types)
      const validTypes = [
        'image/jpeg', 
        'image/jpg', 
        'image/png', 
        'image/gif', 
        'image/webp'
      ];
      if (!validTypes.includes(file.type)) {
        errors.push(`"${file.name}" is not a valid image type. Please use JPEG, PNG, WebP, or GIF.`);
        return;
      }

      // Validate file size (max 10MB - matching storage bucket file_size_limit)
      const maxSize = 10 * 1024 * 1024; // 10MB (10485760 bytes)
      if (file.size > maxSize) {
        errors.push(`"${file.name}" is too large. Maximum size is 10MB.`);
        return;
      }

      validFiles.push(file);
    });

    if (errors.length > 0) {
      alert(`Some images were rejected:\n\n${errors.join('\n')}`);
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.images;
        return newErrors;
      });
    }

    if (validFiles.length === 0) {
      return;
    }

    // Clear image error
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.images;
      return newErrors;
    });

    // Upload each file immediately
    const startIndex = imageUrls.length;
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      const fileIndex = startIndex + i;
      
      // Create preview immediately
      const previewUrl = URL.createObjectURL(file);
      setImagePreviews(prev => [...prev, previewUrl]);
      
      // Initialize upload progress
      setUploadProgress(prev => ({
        ...prev,
        [fileIndex]: {
          status: 'uploading',
          progress: 0,
          message: 'Preparing...'
        }
      }));

      // Upload the file
      try {
        setUploadProgress(prev => ({
          ...prev,
          [fileIndex]: {
            status: 'uploading',
            progress: 10,
            message: 'Compressing...'
          }
        }));

        // Compress image
        const processedFile = await compressImage(file);
        
        setUploadProgress(prev => ({
          ...prev,
          [fileIndex]: {
            status: 'uploading',
            progress: 30,
            message: 'Uploading...'
          }
        }));

        // Upload to storage
        const fileExt = processedFile.name.split('.').pop() || 'jpg';
        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
        const filePath = `products/${fileName}`;
        const fileSizeMB = processedFile.size / (1024 * 1024);

        setUploadProgress(prev => ({
          ...prev,
          [fileIndex]: {
            status: 'uploading',
            progress: 50,
            message: `Uploading ${file.name} (${fileSizeMB.toFixed(2)}MB)...`
          }
        }));

        // Upload with timeout
        const timeoutMs = Math.max(300000, 300000 + (fileSizeMB * 30000));
        const uploadPromise = supabase.storage
          .from('product-images')
          .upload(filePath, processedFile, {
            cacheControl: '3600',
            upsert: false
          });

        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Upload timeout')), timeoutMs);
        });

        const result = await Promise.race([uploadPromise, timeoutPromise]);

        if (result.error) {
          throw result.error;
        }

        if (!result.data || !result.data.path) {
          throw new Error('Upload succeeded but no path returned');
        }

        setUploadProgress(prev => ({
          ...prev,
          [fileIndex]: {
            status: 'uploading',
            progress: 80,
            message: 'Getting URL...'
          }
        }));

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(result.data.path);

        if (!urlData || !urlData.publicUrl) {
          throw new Error('Could not get public URL');
        }

        // Update preview with uploaded URL
        setImagePreviews(prev => {
          const newPreviews = [...prev];
          newPreviews[fileIndex] = urlData.publicUrl;
          return newPreviews;
        });

        // Add to uploaded URLs
        setImageUrls(prev => [...prev, urlData.publicUrl]);

        // Mark as success
        setUploadProgress(prev => ({
          ...prev,
          [fileIndex]: {
            status: 'success',
            progress: 100,
            message: 'Uploaded successfully'
          }
        }));

        // Clear progress after 2 seconds
        setTimeout(() => {
          setUploadProgress(prev => {
            const newProgress = { ...prev };
            delete newProgress[fileIndex];
            return newProgress;
          });
        }, 2000);

        console.log(`✅ Image uploaded immediately: ${file.name} -> ${urlData.publicUrl}`);
      } catch (error) {
        console.error(`❌ Error uploading ${file.name}:`, error);
        
        // Remove preview on error
        setImagePreviews(prev => prev.filter((_, idx) => idx !== fileIndex));
        
        // Mark as error
        setUploadProgress(prev => ({
          ...prev,
          [fileIndex]: {
            status: 'error',
            progress: 0,
            message: error.message || 'Upload failed'
          }
        }));

        // Show error alert
        alert(`Failed to upload "${file.name}": ${error.message || 'Unknown error'}`);
        
        // Clear error progress after 5 seconds
        setTimeout(() => {
          setUploadProgress(prev => {
            const newProgress = { ...prev };
            delete newProgress[fileIndex];
            return newProgress;
          });
        }, 5000);
      }
    }

    // Clear file input
    e.target.value = '';
  };

  const removeImage = (index) => {
    // Since we now upload immediately, all images are URLs
    // Revoke blob URL if it's still a blob (during upload)
    setImagePreviews(prev => {
      const newPreviews = [...prev];
      if (newPreviews[index] && newPreviews[index].startsWith('blob:')) {
        URL.revokeObjectURL(newPreviews[index]);
      }
      return newPreviews.filter((_, i) => i !== index);
    });
    
    setImageUrls(prev => prev.filter((_, i) => i !== index));
    
    // Clear any upload progress for this index
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      // Update indices for remaining items
      const updated = {};
      Object.keys(newProgress).forEach(key => {
        const keyIndex = parseInt(key);
        if (keyIndex < index) {
          updated[key] = newProgress[key];
        } else if (keyIndex > index) {
          updated[keyIndex - 1] = newProgress[key];
        }
      });
      return updated;
    });
  };

  const validateImageUrl = async (url) => {
    try {
      // Basic URL validation
      const urlObj = new URL(url);
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        return { valid: false, error: 'URL must use HTTP or HTTPS protocol' };
      }

      // Check if it's an image URL by extension or content type
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
      const hasImageExtension = imageExtensions.some(ext => 
        urlObj.pathname.toLowerCase().endsWith(ext)
      );

      // Try to fetch and validate it's an image
      try {
        const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
        // If we can't check (CORS), assume it's valid if it has image extension
        if (!hasImageExtension) {
          console.warn('Cannot verify image type due to CORS, but URL format looks valid');
        }
      } catch (fetchError) {
        // CORS error is expected for external URLs, but we can still use the URL
        if (!hasImageExtension) {
          console.warn('Cannot verify image type, but URL format looks valid');
        }
      }

      return { valid: true };
    } catch (error) {
      return { valid: false, error: 'Invalid URL format' };
    }
  };

  const handleAddImageUrl = async () => {
    const trimmedUrl = urlInput.trim();
    if (!trimmedUrl) {
      setErrors(prev => ({ ...prev, imageUrl: 'Please enter a valid image URL' }));
      return;
    }

    // Check if URL already exists
    if (imageUrls.includes(trimmedUrl)) {
      setErrors(prev => ({ ...prev, imageUrl: 'This URL is already added' }));
      return;
    }

    // Validate URL
    setSubmitProgress('Validating image URL...');
    const validation = await validateImageUrl(trimmedUrl);
    
    if (!validation.valid) {
      setErrors(prev => ({ ...prev, imageUrl: validation.error || 'Invalid image URL' }));
      setSubmitProgress('');
      return;
    }

    // Add URL
    setImageUrls(prev => [...prev, trimmedUrl]);
    setImagePreviews(prev => [...prev, trimmedUrl]);
    setUrlInput('');
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.imageUrl;
      delete newErrors.images;
      return newErrors;
    });
    setSubmitProgress('');
  };

  const handleSpecChange = (index, field, value) => {
    const newSpecFields = [...specFields];
    newSpecFields[index][field] = value;
    setSpecFields(newSpecFields);
  };

  const addSpecField = () => {
    setSpecFields([...specFields, { key: '', value: '' }]);
  };

  const removeSpecField = (index) => {
    setSpecFields(specFields.filter((_, i) => i !== index));
  };

  const addDeliveryOption = () => {
    if (deliveryOption.trim()) {
      setFormData(prev => ({
        ...prev,
        delivery_options: [...prev.delivery_options, deliveryOption.trim()]
      }));
      setDeliveryOption('');
    }
  };

  const removeDeliveryOption = (index) => {
    setFormData(prev => ({
      ...prev,
      delivery_options: prev.delivery_options.filter((_, i) => i !== index)
    }));
  };

  // Compress image before upload
  const compressImage = async (file) => {
    try {
      const originalSizeMB = file.size / (1024 * 1024);
      
      // Always compress files larger than 500KB for better upload speed
      if (originalSizeMB <= 0.5) {
        console.log(`📦 Skipping compression for ${file.name} (${originalSizeMB.toFixed(2)}MB - already small)`);
        return file;
      }

      console.log(`🗜️ Compressing ${file.name} (${originalSizeMB.toFixed(2)}MB)...`);
      
      // More aggressive compression settings for faster uploads
      const options = {
        maxSizeMB: 1.5, // Target max size: 1.5MB (more aggressive)
        maxWidthOrHeight: 1600, // Smaller max dimension for faster upload
        useWebWorker: true, // Use web worker for better performance
        fileType: file.type, // Preserve original type
        initialQuality: 0.75, // 75% quality (more aggressive compression)
        alwaysKeepResolution: false, // Allow resolution reduction
      };

      const compressedFile = await imageCompression(file, options);
      const compressedSizeMB = compressedFile.size / (1024 * 1024);
      const reduction = ((1 - compressedFile.size / file.size) * 100).toFixed(1);
      
      // If compression didn't help much, try even more aggressive
      if (compressedSizeMB > 2 && originalSizeMB > 2) {
        console.log(`🔄 First compression result too large (${compressedSizeMB.toFixed(2)}MB), trying more aggressive compression...`);
        const aggressiveOptions = {
          maxSizeMB: 1, // Even smaller target
          maxWidthOrHeight: 1200, // Smaller dimensions
          useWebWorker: true,
          fileType: file.type,
          initialQuality: 0.65, // Lower quality
          alwaysKeepResolution: false,
        };
        
        const moreCompressed = await imageCompression(file, aggressiveOptions);
        const moreCompressedSizeMB = moreCompressed.size / (1024 * 1024);
        const moreReduction = ((1 - moreCompressed.size / file.size) * 100).toFixed(1);
        console.log(`✅ Aggressively compressed ${file.name}: ${originalSizeMB.toFixed(2)}MB → ${moreCompressedSizeMB.toFixed(2)}MB (${moreReduction}% reduction)`);
        return moreCompressed;
      }
      
      console.log(`✅ Compressed ${file.name}: ${originalSizeMB.toFixed(2)}MB → ${compressedSizeMB.toFixed(2)}MB (${reduction}% reduction)`);
      
      return compressedFile;
    } catch (error) {
      console.warn(`⚠️ Compression failed for ${file.name}, using original:`, error);
      return file; // Fallback to original if compression fails
    }
  };

  // Upload single image with retry logic
  const uploadSingleImage = async (file, fileIndex, totalFiles) => {
    const fileNumber = fileIndex + 1;
    
    try {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        throw new Error(`File "${file.name}" is not a valid image type. Please use JPEG, PNG, WebP, or GIF.`);
      }

      // Compress image before upload
      setSubmitProgress(`Compressing image ${fileNumber} of ${totalFiles}: ${file.name}...`);
      const processedFile = await compressImage(file);

      // Validate file size after compression
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (processedFile.size > maxSize) {
        throw new Error(`File "${file.name}" is too large (${(processedFile.size / 1024 / 1024).toFixed(2)}MB). Maximum size is 10MB.`);
      }

      const fileExt = processedFile.name.split('.').pop() || 'jpg';
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const fileSizeMB = processedFile.size / (1024 * 1024);
      setSubmitProgress(`Uploading image ${fileNumber} of ${totalFiles}: ${file.name} (${fileSizeMB.toFixed(2)}MB)...`);
      console.log(`📤 Uploading ${file.name} (${fileSizeMB.toFixed(2)}MB) to ${filePath}...`);

      // Upload with retry logic
      const maxRetries = 2;
      let uploadData = null;
      let uploadError = null;
      let lastAttemptError = null;

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        if (attempt > 0) {
          const retryDelay = attempt * 2000; // 2s, 4s delays
          console.log(`🔄 Retry attempt ${attempt}/${maxRetries} for ${file.name} after ${retryDelay}ms delay...`);
          setSubmitProgress(`Retrying upload ${fileNumber} of ${totalFiles} (attempt ${attempt + 1}/${maxRetries + 1}): ${file.name}...`);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }

        try {
          // Dynamic timeout based on file size: base 5 minutes + 30s per MB
          // For a 1.5MB file (after compression), this gives ~5.75 minutes
          // More generous timeout to handle slow connections
          const timeoutMs = Math.max(300000, 300000 + (fileSizeMB * 30000)); // Minimum 5 minutes, scales with size
          
          if (attempt === 0) {
            console.log(`⏱️ Upload timeout set to ${(timeoutMs / 1000 / 60).toFixed(1)} minutes for ${fileSizeMB.toFixed(2)}MB file`);
            console.log(`📊 Upload details: Original: ${(file.size / 1024 / 1024).toFixed(2)}MB, Compressed: ${fileSizeMB.toFixed(2)}MB`);
          }

          // Create upload promise with timeout
          const uploadPromise = supabase.storage
            .from('product-images')
            .upload(filePath, processedFile, {
              cacheControl: '3600',
              upsert: false
            });

          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Upload timeout: Image upload took too long. Please try again with a smaller file or check your internet connection.')), timeoutMs);
          });

          const result = await Promise.race([
            uploadPromise,
            timeoutPromise
          ]);

          uploadData = result.data;
          uploadError = result.error;
          lastAttemptError = null;

          // If successful, break out of retry loop
          if (!uploadError && uploadData) {
            if (attempt > 0) {
              console.log(`✅ Upload succeeded on retry attempt ${attempt + 1} for ${file.name}`);
            }
            break;
          }

          // If error is not retryable, break immediately
          if (uploadError) {
            const isRetryable = 
              uploadError.message?.includes('timeout') ||
              uploadError.message?.includes('network') ||
              uploadError.message?.includes('ECONNRESET') ||
              uploadError.message?.includes('ECONNREFUSED') ||
              (!uploadError.status || uploadError.status >= 500);

            if (!isRetryable) {
              console.log(`❌ Non-retryable error for ${file.name}, stopping retries`);
              break;
            }

            lastAttemptError = uploadError;
            if (attempt < maxRetries) {
              console.log(`⚠️ Upload attempt ${attempt + 1} failed, will retry:`, uploadError.message);
            }
          }
        } catch (error) {
          lastAttemptError = error;
          uploadError = error;
          if (attempt < maxRetries) {
            console.log(`⚠️ Upload attempt ${attempt + 1} threw error, will retry:`, error.message);
          }
        }
      }

      // Handle final result
      if (uploadError || !uploadData) {
        const finalError = uploadError || lastAttemptError;
        throw finalError || new Error('Upload failed after retries');
      }

      if (!uploadData.path) {
        throw new Error('Upload succeeded but no path returned');
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(uploadData.path);

      if (!urlData || !urlData.publicUrl) {
        throw new Error('Could not get public URL');
      }

      console.log(`✅ Image ${fileNumber}/${totalFiles} uploaded: ${file.name} -> ${urlData.publicUrl}`);
      return urlData.publicUrl;
    } catch (error) {
      console.error(`❌ Error processing ${file.name}:`, error);
      
      // Provide more specific error messages
      let errorMessage = error?.message || 'Unknown error';
      if (errorMessage.includes('new row violates row-level security')) {
        errorMessage = 'Permission denied. Please ensure you have admin privileges.';
      } else if (errorMessage.includes('timeout') || errorMessage.includes('network')) {
        errorMessage = 'Network error. The upload timed out after multiple attempts. Please check your internet connection and try again.';
      } else if (errorMessage.includes('size') || errorMessage.includes('limit')) {
        errorMessage = 'File size exceeds limit. Maximum size is 10MB.';
      }
      
      throw new Error(`Failed to upload "${file.name}": ${errorMessage}`);
    }
  };

  const uploadImages = async () => {
    // All images are already uploaded immediately when selected
    // Just return the URLs
    return [...imageUrls];
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate required fields
    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Product name is required';
    }

    if (formData.category_ids.length === 0) {
      newErrors.categories = 'Please select at least one category';
    }

    if (!formData.supplier_type || (formData.supplier_type !== 'supplier' && formData.supplier_type !== 'manufacturer')) {
      newErrors.supplier_type = 'Please select either Supplier or Manufacturer';
    }

    if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (formData.compare_price && (isNaN(parseFloat(formData.compare_price)) || parseFloat(formData.compare_price) <= 0)) {
      newErrors.compare_price = 'Compare price must be a valid number';
    }

    if (formData.compare_price && parseFloat(formData.compare_price) <= parseFloat(formData.price)) {
      newErrors.compare_price = 'Compare price must be greater than regular price';
    }

    if (imageUrls.length === 0) {
      newErrors.images = 'Please upload at least one product image';
    }

    if (formData.sku && formData.sku.trim() !== '') {
      // Check if SKU already exists (optional validation)
      // This could be done on the backend
    }

    setErrors(newErrors);
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🚀 Form submission started');
    console.log('Form data:', formData);
    console.log('Uploaded images:', imageUrls.length);
    
    // Check if any images are still uploading
    const uploadingImages = Object.values(uploadProgress).some(p => p.status === 'uploading');
    if (uploadingImages) {
      alert('Please wait for all images to finish uploading before submitting.');
      return;
    }
    
    // Validate form
    const validation = validateForm();
    console.log('Validation result:', validation);
    
    if (!validation.isValid) {
      console.error('❌ Validation failed:', validation.errors);
      const errorMessages = Object.entries(validation.errors)
        .map(([field, message]) => `${field}: ${message}`)
        .join('\n');
      alert(`Please fix the following errors:\n\n${errorMessages}`);
      
      // Scroll to first error
      const firstErrorField = Object.keys(validation.errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`) || 
                        document.querySelector(`#${firstErrorField}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
      }
      return;
    }
    
    console.log('✅ Validation passed, proceeding with submission...');
    
    try {
      setLoading(true);
      setSubmitProgress('Creating product...');

      // Images are already uploaded, just get the URLs
      console.log('📷 Using uploaded images...');
      const finalImageUrls = imageUrls;
      console.log('✅ Images ready:', finalImageUrls.length);
      
      if (finalImageUrls.length === 0) {
        throw new Error('Please upload at least one product image.');
      }

      // Check if user is authenticated
      if (!user || !user.id) {
        console.error('❌ User not authenticated');
        throw new Error('You must be logged in to create a product. Please log in and try again.');
      }

      // Prepare specifications
      console.log('📋 Preparing specifications...');
      setSubmitProgress('Preparing product data...');
      const specifications = {};
      specFields.forEach(field => {
        if (field.key && field.value) {
          specifications[field.key] = field.value;
        }
      });

      // Generate SKU automatically for admin uploads (always generate)
      console.log('📦 Generating automatic TIT SKU...');
      setSubmitProgress('Generating SKU...');
      const finalSku = await generateNextTitSku();
      console.log('✅ Generated SKU:', finalSku);

      // Prepare product data (use primary category for category_id for backward compatibility)
      console.log('📦 Preparing product data...');
      const productData = {
        name: formData.name,
        description: formData.description,
        category_id: formData.primary_category_id, // Primary category for backward compatibility
        location: formData.location,
        region: formData.region,
        delivery: formData.delivery,
        delivery_options: formData.delivery_options,
        supplier_whatsapp: formData.supplier_whatsapp,
        supplier_type: formData.supplier_type,
        images: finalImageUrls,
        specifications,
        price: parseFloat(formData.price),
        compare_price: formData.compare_price ? parseFloat(formData.compare_price) : null,
        stock_quantity: parseInt(formData.stock_quantity) || 0,
        sku: finalSku,
        is_featured: formData.is_featured,
        is_active: formData.is_active,
        verification_status: formData.verification_status,
        verified_by: user.id,
        admin_name: profile?.full_name || user.email || 'Admin' // Store admin name when admin creates product
      };

      // Insert product with timeout protection
      setSubmitProgress('Creating product in database...');
      console.log('Creating product with data:', {
        ...productData,
        images: imageUrls.length,
        category_ids: formData.category_ids.length,
        section_ids: formData.section_ids.length
      });

      // Add timeout to prevent hanging
      const insertTimeout = 30000; // 30 seconds
      console.log('⏱️ Starting product insert with', insertTimeout / 1000, 'second timeout...');
      
      const insertPromise = supabase
        .from('products')
        .insert([productData])
        .select()
        .single();

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          console.error('⏱️ Product insert timed out after', insertTimeout / 1000, 'seconds');
          reject(new Error('Database operation timed out. Please check your connection and try again.'));
        }, insertTimeout);
      });

      let product, error;
      try {
        const result = await Promise.race([
          insertPromise.then(res => ({ type: 'success', ...res })),
          timeoutPromise.then(() => ({ type: 'timeout' })).catch(err => ({ type: 'timeout', error: err }))
        ]);
        
        // Handle timeout
        if (result.type === 'timeout') {
          throw new Error('Database operation timed out. Please check your connection and try again.');
        }
        
        // Handle Supabase response
        if (result.error) {
          error = result.error;
        } else if (result.data) {
          product = result.data;
          error = result.error; // May be null/undefined
        } else {
          throw new Error('Unexpected response from database');
        }
      } catch (raceError) {
        // This catches timeout errors and other race errors
        console.error('❌ Promise.race error:', raceError);
        if (raceError.message && raceError.message.includes('timed out')) {
          throw raceError;
        }
        throw new Error(`Database operation failed: ${raceError.message || 'Unknown error'}`);
      }

      if (error) {
        console.error('❌ Product creation error:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        throw new Error(`Failed to create product: ${error.message || 'Unknown database error'}`);
      }

      if (!product || !product.id) {
        console.error('❌ Product insert returned no data or ID');
        console.error('Response:', { product, error });
        throw new Error('Product was created but no ID was returned. Please check the database.');
      }
      
      console.log('✅ Product inserted successfully with ID:', product.id);

      console.log('Product created successfully:', product.id);

      // Insert product-category relationships
      if (formData.category_ids.length > 0) {
        setSubmitProgress('Linking categories...');
        const categoryRelations = formData.category_ids.map((catId, index) => ({
          product_id: product.id,
          category_id: catId,
          is_primary: catId === formData.primary_category_id,
          sort_order: index
        }));

        const categoryInsertPromise = supabase
          .from('product_categories')
          .insert(categoryRelations);

        const categoryTimeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Category linking timed out')), 15000);
        });

        const { error: categoryError } = await Promise.race([
          categoryInsertPromise,
          categoryTimeoutPromise
        ]);

        if (categoryError) {
          console.error('Error inserting categories:', categoryError);
          throw new Error(`Product created but failed to link categories: ${categoryError.message}`);
        }
      }

      console.log('Categories linked successfully');

      // Insert product-section relationships
      if (formData.section_ids.length > 0) {
        setSubmitProgress('Linking homepage sections...');
        const sectionRelations = formData.section_ids.map((sectionId, index) => ({
          product_id: product.id,
          section_id: sectionId,
          sort_order: index,
          is_pinned: false
        }));

        const sectionInsertPromise = supabase
          .from('product_section_placements')
          .insert(sectionRelations);

        const sectionTimeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Section linking timed out')), 15000);
        });

        try {
          const { error: sectionError } = await Promise.race([
            sectionInsertPromise,
            sectionTimeoutPromise
          ]);

          if (sectionError) {
            console.error('Error inserting sections:', sectionError);
            // Non-critical error - product is created, just log it
            console.warn('Product created but sections linking failed:', sectionError.message);
          } else {
            console.log('Sections linked successfully');
          }
        } catch (sectionTimeoutError) {
          // Non-critical error - product is created, just log it
          console.warn('Section linking timed out, but product was created:', sectionTimeoutError.message);
        }
      }

      setSubmitProgress('Product created successfully!');
      console.log('✅ Product creation complete:', {
        productId: product.id,
        name: product.name,
        categories: formData.category_ids.length,
        sections: formData.section_ids.length,
        images: imageUrls.length
      });

      // Simple success message
      alert('Product created successfully');
      router.push('/admin/products');
    } catch (error) {
      console.error('❌ Error creating product:', error);
      setSubmitProgress('');
      const errorMessage = error.message || 'An unknown error occurred';
      alert(`Failed to create product:\n\n${errorMessage}\n\nPlease check the console for more details.`);
      
      // Log full error details for debugging
      console.error('Full error details:', {
        error,
        formData: {
          ...formData,
          category_ids: formData.category_ids.length,
          section_ids: formData.section_ids.length,
          delivery_options: formData.delivery_options.length
        },
        imageFilesCount: imageUrls.length,
        specFieldsCount: specFields.length
      });
    } finally {
      setLoading(false);
      setUploadingImages(false);
      setSubmitProgress('');
    }
  };

  return (
    <div className="create-product-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <button
            className="back-button"
            onClick={() => router.back()}
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h1>Create New Product</h1>
          <p>Add a new product to the platform</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          {/* Basic Information */}
          <div className="form-section">
            <h3>Basic Information</h3>
            
            <div className="form-group">
              <label htmlFor="name">Product Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter product name"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="field-error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Enter product description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category-search">Categories *</label>
              <div className="category-selection-wrapper">
                {/* Selected Categories Summary */}
                {formData.category_ids.length > 0 && (
                  <div className="selected-categories-summary">
                    <div className="summary-header">
                      <span className="summary-count">
                        {formData.category_ids.length} {formData.category_ids.length === 1 ? 'Category' : 'Categories'} Selected
                      </span>
                      {formData.primary_category_id && (
                        <span className="primary-badge">
                          <span className="star-icon">★</span>
                          Primary: {categories.find(c => c.id === formData.primary_category_id)?.name}
                        </span>
                      )}
                    </div>
                    <div className="selected-categories-tags">
                      {formData.category_ids.map(catId => {
                        const cat = categories.find(c => c.id === catId);
                        const isPrimary = catId === formData.primary_category_id;
                        return cat ? (
                          <div key={catId} className={`category-tag ${isPrimary ? 'primary' : ''}`}>
                            <span>{cat.name}</span>
                            {isPrimary && <span className="tag-star">★</span>}
                            <button
                              type="button"
                              className="tag-remove"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryChange(catId);
                              }}
                              title="Remove category"
                            >
                              ×
                            </button>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
                
                {/* Category Selection Area */}
                <div className="category-selection">
                  <div className="category-grid">
                    {categories.map(cat => {
                      const isSelected = formData.category_ids.includes(cat.id);
                      const isPrimary = formData.primary_category_id === cat.id;
                      return (
                        <div
                          key={cat.id}
                          className={`category-card ${isSelected ? 'selected' : ''} ${isPrimary ? 'primary' : ''}`}
                          onClick={() => handleCategoryChange(cat.id)}
                        >
                          <div className="category-card-content">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleCategoryChange(cat.id)}
                              className="category-checkbox"
                            />
                            <span className="category-name">{cat.name}</span>
                            {isSelected && (
                              <button
                                type="button"
                                className={`primary-category-btn ${isPrimary ? 'active' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPrimaryCategory(cat.id);
                                }}
                                title={isPrimary ? 'Primary Category' : 'Set as Primary'}
                              >
                                {isPrimary ? '★' : '☆'}
                              </button>
                            )}
                          </div>
                          {isPrimary && (
                            <div className="primary-indicator">Primary Category</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {formData.category_ids.length === 0 && (
                    <div className="category-error-message">
                      <span className="error-icon">⚠</span>
                      {errors.categories || 'Please select at least one category'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="section-search">Homepage Sections (Optional)</label>
              <div className="category-selection-wrapper">
                {/* Selected Sections Summary */}
                {formData.section_ids.length > 0 && (
                  <div className="selected-categories-summary">
                    <div className="summary-header">
                      <span className="summary-count">
                        {formData.section_ids.length} {formData.section_ids.length === 1 ? 'Section' : 'Sections'} Selected
                      </span>
                    </div>
                    <div className="selected-categories-tags">
                      {formData.section_ids.map(sectionId => {
                        const section = sections.find(s => s.id === sectionId);
                        return section ? (
                          <div key={sectionId} className="category-tag">
                            <span>{section.display_name}</span>
                            <button
                              type="button"
                              className="tag-remove"
                              onClick={(e) => {
                                e.preventDefault();
                                handleSectionChange(sectionId);
                              }}
                              title="Remove section"
                            >
                              ×
                            </button>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
                
                {/* Section Selection Area */}
                <div className="category-selection">
                  <div className="category-grid">
                    {sections.map(section => {
                      const isSelected = formData.section_ids.includes(section.id);
                      return (
                        <div
                          key={section.id}
                          className={`category-card ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleSectionChange(section.id)}
                        >
                          <div className="category-card-content">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSectionChange(section.id)}
                              className="category-checkbox"
                            />
                            <span className="category-name">{section.display_name}</span>
                            <span className="section-type-badge" style={{ fontSize: '11px', padding: '2px 6px', marginLeft: 'auto' }}>
                              {section.section_type}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {sections.length === 0 && (
                    <div className="category-error-message" style={{ color: '#64748b' }}>
                      <span className="error-icon">ℹ</span>
                      No active sections available. Create sections in the Sections management page.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Accra, Kumasi"
                />
              </div>

              <div className="form-group">
                <label htmlFor="region">Region *</label>
                <input
                  type="text"
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Greater Accra, Ashanti"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="sku">SKU</label>
              <input
                type="text"
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                placeholder="Auto-generated (TIT1, TIT2, etc.)"
                disabled
                style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed' }}
              />
              <small style={{ color: '#64748b', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                SKU will be automatically generated as TIT1, TIT2, TIT3, etc.
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="supplier_whatsapp">Supplier WhatsApp Link</label>
              <input
                type="url"
                id="supplier_whatsapp"
                name="supplier_whatsapp"
                value={formData.supplier_whatsapp}
                onChange={handleInputChange}
                placeholder="https://wa.me/233XXXXXXXXX"
              />
              <small style={{ color: '#64748b', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                Format: https://wa.me/233XXXXXXXXX (include country code)
              </small>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="form-section">
            <h3>Pricing & Inventory</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price *</label>
                <div className="input-with-prefix">
                  <span className="prefix">$</span>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className={errors.price ? 'error' : ''}
                  />
                </div>
                {errors.price && <span className="field-error-text">{errors.price}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="compare_price">Compare Price</label>
                <div className="input-with-prefix">
                  <span className="prefix">$</span>
                  <input
                    type="number"
                    id="compare_price"
                    name="compare_price"
                    value={formData.compare_price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className={errors.compare_price ? 'error' : ''}
                  />
                </div>
                {errors.compare_price && <span className="field-error-text">{errors.compare_price}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="stock_quantity">Stock Quantity</label>
              <input
                type="number"
                id="stock_quantity"
                name="stock_quantity"
                value={formData.stock_quantity}
                onChange={handleInputChange}
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="verification_status">Verification Status</label>
              <select
                id="verification_status"
                name="verification_status"
                value={formData.verification_status}
                onChange={handleInputChange}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="flagged">Flagged</option>
              </select>
            </div>

            <div className="form-group">
              <label>Product Status</label>
              <div className="status-checkboxes">
                <label className={`status-checkbox ${formData.is_featured ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleInputChange}
                />
                  <div className="checkbox-custom">
                    <svg className="checkbox-icon" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M16.7071 5.29289C17.0976 5.68342 17.0976 6.31658 16.7071 6.70711L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071L3.29289 10.7071C2.90237 10.3166 2.90237 9.68342 3.29289 9.29289C3.68342 8.90237 4.31658 8.90237 4.70711 9.29289L8 12.5858L15.2929 5.29289C15.6834 4.90237 16.3166 4.90237 16.7071 5.29289Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="checkbox-content">
                    <span className="checkbox-label-text">Featured Product</span>
                    <span className="checkbox-description">Show this product prominently on the homepage</span>
                  </div>
              </label>

                <label className={`status-checkbox ${formData.is_active ? 'checked' : ''}`}>
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleInputChange}
                  />
                  <div className="checkbox-custom">
                    <svg className="checkbox-icon" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M16.7071 5.29289C17.0976 5.68342 17.0976 6.31658 16.7071 6.70711L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071L3.29289 10.7071C2.90237 10.3166 2.90237 9.68342 3.29289 9.29289C3.68342 8.90237 4.31658 8.90237 4.70711 9.29289L8 12.5858L15.2929 5.29289C15.6834 4.90237 16.3166 4.90237 16.7071 5.29289Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="checkbox-content">
                    <span className="checkbox-label-text">Active</span>
                    <span className="checkbox-description">Product will be visible to customers</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="form-section">
            <h3>Delivery Information</h3>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="delivery"
                  checked={formData.delivery}
                  onChange={handleInputChange}
                />
                <span>Delivery Available</span>
              </label>
            </div>

            {formData.delivery && (
              <div className="form-group">
                <label>Delivery Options</label>
                <div className="spec-fields">
                  <div className="spec-field-row">
                    <input
                      type="text"
                      placeholder="e.g., Standard Delivery (3-5 days)"
                      value={deliveryOption}
                      onChange={(e) => setDeliveryOption(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addDeliveryOption();
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="btn-secondary-sm"
                      onClick={addDeliveryOption}
                    >
                      <Plus size={16} />
                      Add Option
                    </button>
                  </div>
                  {formData.delivery_options.map((option, index) => (
                    <div key={index} className="spec-field-row">
                      <input
                        type="text"
                        value={option}
                        readOnly
                        style={{ background: '#f8fafc' }}
                      />
                      <button
                        type="button"
                        className="btn-icon danger"
                        onClick={() => removeDeliveryOption(index)}
                      >
                        <Minus size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Images */}
        <div className="form-section">
          <h3>Product Images *</h3>
          
          {errors.images && (
            <div className="category-error-message" style={{ marginBottom: '12px' }}>
              <span className="error-icon">⚠</span>
              {errors.images}
            </div>
          )}
          
          <div className="image-upload-area">
            {/* File Upload Section */}
            <label htmlFor="images" className="upload-label">
              <ImageIcon size={48} />
              <p>Click to upload images</p>
              <span>PNG, JPG, GIF, WebP up to 10MB each</span>
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>

            {/* URL Input Section */}
            <div style={{ 
              marginTop: '16px', 
              padding: '16px', 
              border: '1px dashed #cbd5e1', 
              borderRadius: '8px',
              backgroundColor: '#f8fafc'
            }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500',
                color: '#334155'
              }}>
                Or add image by URL
              </label>
              <div style={{ 
                display: 'flex', 
                gap: '8px',
                flexWrap: 'wrap'
              }}>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    if (errors.imageUrl) {
                      setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.imageUrl;
                        return newErrors;
                      });
                    }
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddImageUrl();
                    }
                  }}
                  style={{
                    flex: '1 1 200px',
                    minWidth: '150px',
                    padding: '8px 12px',
                    border: errors.imageUrl ? '1px solid #ef4444' : '1px solid #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="btn-secondary"
                  style={{ 
                    padding: '8px 16px',
                    whiteSpace: 'nowrap',
                    flex: '0 0 auto',
                    minWidth: 'fit-content'
                  }}
                >
                  <Plus size={16} style={{ marginRight: '4px' }} />
                  <span style={{ 
                    display: 'inline-block'
                  }}>
                    Add URL
                  </span>
                </button>
              </div>
              {errors.imageUrl && (
                <p style={{ 
                  marginTop: '8px', 
                  fontSize: '12px', 
                  color: '#ef4444' 
                }}>
                  {errors.imageUrl}
                </p>
              )}
              <p style={{ 
                marginTop: '8px', 
                fontSize: '12px', 
                color: '#64748b' 
              }}>
                Enter a direct image URL (HTTP/HTTPS)
              </p>
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="image-previews" style={{ marginTop: '16px' }}>
                {imagePreviews.map((preview, index) => {
                  const progress = uploadProgress[index];
                  const isUploading = progress && progress.status === 'uploading';
                  const isError = progress && progress.status === 'error';
                  const isSuccess = progress && progress.status === 'success';
                  
                  return (
                    <div key={index} className="image-preview" style={{ position: 'relative' }}>
                      <img src={preview} alt={`Preview ${index + 1}`} />
                      
                      {/* Upload Progress Overlay */}
                      {isUploading && (
                        <div className="upload-progress-overlay" style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: 'rgba(0, 0, 0, 0.7)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '12px',
                          borderRadius: '8px'
                        }}>
                          <div style={{ marginBottom: '8px' }}>{progress.message}</div>
                          <div style={{
                            width: '80%',
                            height: '4px',
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                            borderRadius: '2px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${progress.progress}%`,
                              height: '100%',
                              backgroundColor: '#3b82f6',
                              transition: 'width 0.3s ease'
                            }}></div>
                          </div>
                          <div style={{ marginTop: '4px', fontSize: '10px' }}>{progress.progress}%</div>
                        </div>
                      )}
                      
                      {/* Success Indicator */}
                      {isSuccess && (
                        <div className="upload-success-overlay" style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          backgroundColor: '#10b981',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: 'bold'
                        }}>
                          ✓ Uploaded
                        </div>
                      )}
                      
                      {/* Error Indicator */}
                      {isError && (
                        <div className="upload-error-overlay" style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: 'rgba(239, 68, 68, 0.9)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '12px',
                          borderRadius: '8px',
                          padding: '8px',
                          textAlign: 'center'
                        }}>
                          <div style={{ marginBottom: '4px' }}>✗ Upload Failed</div>
                          <div style={{ fontSize: '10px' }}>{progress.message}</div>
                        </div>
                      )}
                      
                      <div className="image-preview-info">
                        <span className="image-number">{index + 1}</span>
                        {!isUploading && !isError && (
                          <span className="image-size" style={{ fontSize: '10px', color: '#64748b' }}>
                            {isSuccess ? 'Uploaded' : 'Ready'}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        className="remove-image"
                        onClick={() => removeImage(index)}
                        title="Remove image"
                        disabled={isUploading}
                        style={{ opacity: isUploading ? 0.5 : 1, cursor: isUploading ? 'not-allowed' : 'pointer' }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            {imageUrls.length > 0 && (
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#64748b' }}>
                {imageUrls.length} image{imageUrls.length !== 1 ? 's' : ''} uploaded
                {Object.values(uploadProgress).some(p => p.status === 'uploading') && (
                  <span style={{ color: '#3b82f6', marginLeft: '8px' }}>
                    • Uploading...
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Specifications */}
        <div className="form-section">
          <div className="section-header">
            <h3>Specifications</h3>
            <button
              type="button"
              className="btn-secondary-sm"
              onClick={addSpecField}
            >
              <Plus size={16} />
              Add Field
            </button>
          </div>

          <div className="spec-fields">
            {specFields.map((field, index) => (
              <div key={index} className="spec-field-row">
                <input
                  type="text"
                  placeholder="Key (e.g., Color)"
                  value={field.key}
                  onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Value (e.g., Red)"
                  value={field.value}
                  onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                />
                {specFields.length > 1 && (
                  <button
                    type="button"
                    className="btn-icon danger"
                    onClick={() => removeSpecField(index)}
                  >
                    <Minus size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Supplier/Manufacturer Selection */}
        <div className="form-section">
          <h3>Product Source *</h3>
          <div className="form-group">
            <label className="required-label">Select Product Source</label>
            <div className="supplier-type-options">
              <label className={`supplier-type-option ${formData.supplier_type === 'supplier' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="supplier_type"
                  value="supplier"
                  checked={formData.supplier_type === 'supplier'}
                  onChange={handleInputChange}
                  required
                />
                <div className="option-content">
                  <div className="option-icon supplier-icon">
                    <Package size={24} />
                  </div>
                  <div className="option-details">
                    <span className="option-title">Supplier</span>
                    <span className="option-description">Product from a supplier/distributor</span>
                  </div>
                </div>
              </label>

              <label className={`supplier-type-option ${formData.supplier_type === 'manufacturer' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="supplier_type"
                  value="manufacturer"
                  checked={formData.supplier_type === 'manufacturer'}
                  onChange={handleInputChange}
                  required
                />
                <div className="option-content">
                  <div className="option-icon manufacturer-icon">
                    <Package size={24} />
                  </div>
                  <div className="option-details">
                    <span className="option-title">Manufacturer</span>
                    <span className="option-description">Product directly from manufacturer</span>
                  </div>
                </div>
              </label>
            </div>
            {errors.supplier_type && (
              <p className="field-error">{errors.supplier_type}</p>
            )}
            {!formData.supplier_type && !errors.supplier_type && (
              <p className="field-error">Please select either Supplier or Manufacturer</p>
            )}
          </div>
        </div>

        {/* Progress Indicator */}
        {submitProgress && (
          <div className="submit-progress" style={{
            padding: '12px 16px',
            background: uploadingImages ? '#fef3c7' : '#f0fdf4',
            border: `1px solid ${uploadingImages ? '#f59e0b' : '#10b981'}`,
            borderRadius: '8px',
            marginBottom: '16px',
            color: uploadingImages ? '#92400e' : '#065f46',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {uploadingImages && (
              <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid #f3f3f3',
                borderTop: '2px solid #f59e0b',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
            )}
            <span>{submitProgress}</span>
          </div>
        )}

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => router.back()}
            disabled={loading || uploadingImages}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={loading || uploadingImages}
            onClick={(e) => {
              console.log('🔘 Create Product button clicked');
              console.log('Button disabled?', loading || uploadingImages);
              console.log('Loading state:', loading);
              console.log('Uploading images state:', uploadingImages);
              // Let the form's onSubmit handle it
            }}
          >
            {loading || uploadingImages ? (
              <>
                <div className="spinner-sm"></div>
                {uploadingImages ? 'Uploading Images...' : submitProgress || 'Creating...'}
              </>
            ) : (
              <>
                <Save size={18} />
                Create Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
