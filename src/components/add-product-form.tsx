import React from 'react'

const AddProductForm: React.FC = () => {
  return (
    <form className="space-y-4 h-full py-2">
      <div>
        <label className="block text-sm font-semibold">Product Name</label>
        <input type="text" className="mt-1 w-full p-2 border-none rounded-md bg-gray-100 focus:outline-none" placeholder="Enter product name" />
      </div>

      <div>
        <label className="block text-sm font-semibold">Description</label>
        <textarea className="mt-1 w-full p-2 border-none rounded-md bg-gray-100 focus:outline-none" placeholder="Enter product description" rows={4}></textarea>
      </div>

      <div>
        <label className="block text-sm font-semibold">Type</label>
        <select className="mt-1 w-full p-2 border-none rounded-md bg-gray-100 focus:outline-none">
          <option value="">Select Type</option>
          <option value="digital">Digital</option>
          <option value="physical">Physical</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold">Price</label>
          <input type="number" className="mt-1 w-full p-2 border-none rounded-md bg-gray-100 focus:outline-none" placeholder="Enter price" />
        </div>
        <div>
          <label className="block text-sm font-semibold">Stock Quantity</label>
          <input type="number" className="mt-1 w-full p-2 border-none rounded-md bg-gray-100 focus:outline-none" placeholder="Enter stock quantity" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Upload Product Images</label>
        <div className="border border-dashed rounded-md p-6 text-center bg-gray-100">
          <p className="text-sm text-gray-500">Drag and drop images here, or</p>
          <button type="button" className="mt-2 px-4 py-2 bg-gray-200 rounded">Browse</button>
        </div>
      </div>

      <button type="submit" className="mt-4 px-6 py-2 bg-[#663399] font-semibold text-white rounded hover:bg-[#663399d6] w-full">
        Save
      </button>
    </form>
  );
};

export default AddProductForm;
