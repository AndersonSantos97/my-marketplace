import React, { useState } from "react";
import type { Product } from "../types/product";
import type { Category } from "../types/categories";

interface Props {
  initialData?: Product | null;
  categories: Category[];
  onSubmit: (data: Omit<Product, "id">) => void;
  onCancel: () => void;
}

export const ProductForm: React.FC<Props> = ({ initialData, categories, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<
    Omit<Product, "id" | "is_digital" | "artist_id"> & { is_digital: boolean; seller_id: number }
  >({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    is_digital: initialData?.is_digital === false,
    file_url: initialData?.file_url || "",
    stock: initialData?.stock || 0,
    category_id: initialData?.category_id || (categories[0]?.id || 1),
    status_id: initialData?.status_id || 1,
    image_url: initialData?.image_url || "",
    seller_id: initialData?.artist_id || 0, // Lo usamos internamente como seller_id
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (type === "number" || name === "category_id" || name === "price" || name === "stock") {
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
      artist_id: formData.seller_id, // Se transforma a artist_id aquí
    });
  };

  const [imageError, setImageError] = useState(false);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6 space-y-4">
      <input
        name="title"
        placeholder="Título"
        className="input w-full"
        value={formData.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Descripción"
        className="input w-full"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        name="price"
        type="number"
        className="input w-full"
        placeholder="Precio"
        value={formData.price}
        onChange={handleChange}
      />

      <input
        name="stock"
        type="number"
        className="input w-full"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
      />

      <input
        name="file_url"
        placeholder="Archivo/Imagen URL"
        className="input w-full"
        value={formData.file_url}
        onChange={handleChange}
      />

      <input
        name="image_url"
        placeholder="Imagen URL"
        className="input w-full"
        value={formData.image_url}
        onChange={handleChange}
        onError={() => setImageError(true)}
        onLoad={() => setImageError(false)}
      />
      {imageError && (
        <p className="text-red-500 text-sm mt-1">No se pudo cargar la imagen. Verifica el URL.</p>
      )}
      {formData.image_url && (
        <div className="mt-2">
          <p className="text-sm text-gray-600">Vista previa:</p>
          <img
            src={formData.image_url}
            alt="Vista previa del producto"
            className="w-48 h-48 object-cover border rounded shadow"
          />
        </div>
      )}

      <label className="block my-2">
        <input
          type="checkbox"
          name="is_digital"
          checked={formData.is_digital}
          onChange={handleChange}
        />
        <span className="ml-2">¿Es digital?</span>
      </label>

      <select
        name="category_id"
        className="input w-full"
        value={formData.category_id}
        onChange={handleChange}
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Guardar
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded">
          Cancelar
        </button>
      </div>
    </form>
  );
};