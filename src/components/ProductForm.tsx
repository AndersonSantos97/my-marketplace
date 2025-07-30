import React, { useState } from "react";
import type { Product } from "../types/product";
import type { Category } from "../types/categories";

interface Props {
  initialData?: Product | null;
  categories: Category[];
  onSubmit: (data: Omit<Product, "id">) => void;
  onCancel: () => void;
}

export const ProductForm: React.FC<Props> = ({
  initialData,
  categories,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<
    Omit<Product, "id" | "is_digital" | "artist_id"> & {
      is_digital: boolean;
      seller_id: number;
    }
  >({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    is_digital: initialData?.is_digital === false,
    file_url: initialData?.file_url || "",
    stock: initialData?.stock || 0,
    category_id: initialData?.category_id || categories[0]?.id || 1,
    status_id: initialData?.status_id || 1,
    image_url: initialData?.image_url || "",
    seller_id: initialData?.artist_id || 0,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (
      type === "number" ||
      name === "category_id" ||
      name === "price" ||
      name === "stock"
    ) {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      is_digital: formData.is_digital,
      artist_id: formData.seller_id,
    });
  };

  const [imageError, setImageError] = useState(false);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow mb-6 space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nota Importante
        </label>
        <div className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 text-sm text-gray-700">
          Para el uso de imágenes de sus productos, le instruimos 
          a subir sus imágenes a la plataforma <strong>Cloudinary</strong>. Copie y pegue el enlace de la imagen en el
          apartado de "Imagen principal". <br />
          Si no conoce Cloudinary, puede ver este tutorial en el siguiente enlace:
          <br />
          <a 
            href="https://www.youtube.com/watch?v=qNIntGO5Ijc" 
            className="text-blue-600 underline" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Ver tutorial en YouTube
          </a>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Título
        </label>
        <input
          name="title"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          value={formData.title}
          onChange={handleChange}
          placeholder="Título"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          name="description"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio
          </label>
          <input
            name="price"
            type="number"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            value={formData.price}
            onChange={handleChange}
            placeholder="Precio"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock
          </label>
          <input
            name="stock"
            type="number"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Archivo/URL de descarga (opcional)
        </label>
        <input
          name="file_url"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          value={formData.file_url}
          onChange={handleChange}
          placeholder="Archivo o enlace"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Imagen principal
        </label>
        <input
          name="image_url"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="URL de la imagen"
          onError={() => setImageError(true)}
          onLoad={() => setImageError(false)}
        />
        {imageError && (
          <p className="text-red-500 text-sm mt-1">
            No se pudo cargar la imagen. Verifica el URL.
          </p>
        )}
        {formData.image_url && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">Vista previa:</p>
            <img
              src={formData.image_url}
              alt="Vista previa"
              className="w-48 h-48 object-cover border rounded shadow"
            />
          </div>
        )}
      </div>

      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="is_digital"
            checked={formData.is_digital}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">¿Es un producto digital?</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Categoría
        </label>
        <select
          name="category_id"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          value={formData.category_id}
          onChange={handleChange}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="bg-blue-900 text-white px-4 py-2 rounded shadow hover:bg-blue-800 transition"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};