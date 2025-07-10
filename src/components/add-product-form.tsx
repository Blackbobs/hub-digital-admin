'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateProduct } from '@/services/products.service';
import { ProductType } from '@/interface/product';

interface ProductFormData {
  title: string;
  description: string;
  type: ProductType;
  price: number;
  stock?: number;
  file?: FileList;
  images?: FileList;
}

interface AddProductFormProps {
  onSuccess?: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onSuccess }) => {
  const { mutateAsync: createProduct, isPending } = useCreateProduct();


  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors }, 
    setValue,
    reset
  } = useForm<ProductFormData>();

  const productType = watch('type');
  const fileInput = watch('file');
  const imagesInput = watch('images');

  const onSubmit = async (data: ProductFormData) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description || '');
  formData.append('type', data.type);
  formData.append('price', data.price.toString());

  if (data.type === ProductType.physical) {
    formData.append('stock', (data.stock || 0).toString());

    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file) => {
        formData.append('images', file);
      });
    }
  } else if (data.type === ProductType.digital && data.file && data.file.length > 0) {
    formData.append('file', data.file[0]);
  }
 
  console.log("SUBMIT TRIGGERED", formData);
 try {
  
  const res = await createProduct(formData);
    console.log("RESPONSE RECEIVED", res); 
  reset();
  if (onSuccess) onSuccess();
} catch (err: any) {
  console.log("💥 Async form error:", err.message);
  
}
};


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (productType === ProductType.digital) {
        setValue('file', e.target.files);
      } else {
        setValue('images', e.target.files);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 h-full py-2">
      <div>
        <label className="block text-sm font-semibold">Product Name</label>
        <input 
          type="text" 
          className={`mt-1 w-full p-2 border-none rounded-md bg-gray-100 focus:outline-none ${
            errors.title ? 'border-red-500' : ''
          }`}
          placeholder="Enter product name"
          {...register('title', { required: 'Product name is required' })}
        />
        {errors.title && (
          <span className="text-red-500 text-xs">{errors.title.message}</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold">Description</label>
        <textarea 
          className={`mt-1 w-full p-2 border-none rounded-md bg-gray-100 focus:outline-none ${
            errors.description ? 'border-red-500' : ''
          }`}
          placeholder="Enter product description"
          rows={4}
          {...register('description')}
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-semibold">Type</label>
        <select 
          className={`mt-1 w-full p-2 border-none rounded-md bg-gray-100 focus:outline-none ${
            errors.type ? 'border-red-500' : ''
          }`}
          {...register('type', { required: 'Product type is required' })}
        >
          <option value="">Select Type</option>
          <option value={ProductType.digital}>Digital</option>
          <option value={ProductType.physical}>Physical</option>
        </select>
        {errors.type && (
          <span className="text-red-500 text-xs">{errors.type.message}</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold">Price</label>
          <input 
            type="number" 
            className={`mt-1 w-full p-2 border-none rounded-md bg-gray-100 focus:outline-none ${
              errors.price ? 'border-red-500' : ''
            }`}
            placeholder="Enter price"
            step="0.01"
            min="0.01"
            {...register('price', { 
              required: 'Price is required',
              min: { value: 0.01, message: 'Price must be greater than 0' }
            })}
          />
          {errors.price && (
            <span className="text-red-500 text-xs">{errors.price.message}</span>
          )}
        </div>
        {productType === ProductType.physical && (
          <div>
            <label className="block text-sm font-semibold">Stock Quantity</label>
            <input 
              type="number" 
              className={`mt-1 w-full p-2 border-none rounded-md bg-gray-100 focus:outline-none ${
                errors.stock ? 'border-red-500' : ''
              }`}
              placeholder="Enter stock quantity"
              min="0"
              {...register('stock', { 
                min: { value: 0, message: 'Stock cannot be negative' }
              })}
            />
            {errors.stock && (
              <span className="text-red-500 text-xs">{errors.stock.message}</span>
            )}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">
          {productType === ProductType.digital ? 'Upload Product File' : 'Upload Product Images'}
        </label>
        <div className="border border-dashed rounded-md p-6 text-center bg-gray-100">
          <input
            type="file"
            className="hidden"
            id="product-upload"
            onChange={handleFileChange}
            multiple={productType === ProductType.physical}
            accept={productType === ProductType.digital ? '*' : 'image/*'}
          />
          <label htmlFor="product-upload" className="cursor-pointer">
            {productType === ProductType.digital ? (
              fileInput && fileInput.length > 0 ? (
                <p className="text-sm text-gray-700">
                  {fileInput[0].name} selected
                </p>
              ) : (
                <>
                  <p className="text-sm text-gray-500">
                    Drag and drop file here, or
                  </p>
                  <button 
                    type="button" 
                    className="mt-2 px-4 py-2 bg-gray-200 rounded"
                  >
                    Browse
                  </button>
                </>
              )
            ) : imagesInput && imagesInput.length > 0 ? (
              <div>
                <p className="text-sm text-gray-700">
                  {imagesInput.length} image(s) selected
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {Array.from(imagesInput).map((file, index) => (
                    <span key={index} className="text-xs bg-gray-200 px-2 py-1 rounded">
                      {file.name}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500">
                  Drag and drop images here, or
                </p>
                <button 
                  type="button" 
                  className="mt-2 px-4 py-2 bg-gray-200 rounded"
                >
                  Browse
                </button>
              </>
            )}
          </label>
        </div>
        {productType === ProductType.digital && errors.file && (
          <span className="text-red-500 text-xs">{errors.file.message}</span>
        )}
        {productType === ProductType.physical && errors.images && (
          <span className="text-red-500 text-xs">{errors.images.message}</span>
        )}
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className={`mt-4 px-6 py-2 bg-[#663399] font-semibold text-white rounded hover:bg-[#663399d6] w-full ${
          isPending ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isPending ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

export default AddProductForm;