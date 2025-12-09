import React from 'react';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, formData, setFormData, onSave }) => {
  // Si no está abierto, no renderizamos NADA.
  if (!isOpen) return null;

  return (
    // 1. EL FONDO (OVERLAY)
    // fixed inset-0: Cubre toda la pantalla sin importar el scroll
    // z-50: Se pone encima de cualquier otra cosa
    // bg-black/60: Fondo negro semitransparente
    // backdrop-blur-sm: Efecto borroso en el fondo (muy pro)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      
      {/* 2. LA VENTANA (POP-UP) */}
      {/* animate-bounce (opcional): pequeña animación al entrar para que se note */}
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md border-2 border-black relative">
        
        {/* Encabezado */}
        <div className="flex justify-between items-center p-4 border-b-2 border-black bg-gray-50 rounded-t-lg">
          <h2 className="text-xl font-bold uppercase tracking-wide">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-1 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Formulario */}
        <form onSubmit={onSave} className="p-6 flex flex-col gap-5">
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">NAME</label>
            <input 
              type="text"
              required
              className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-medium"
              placeholder="Ej. Juan Pérez"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">AGE</label>
            <input 
              type="number"
              required
              className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-medium"
              placeholder="Ej. 30"
              value={formData.age}
              onChange={e => setFormData({...formData, age: e.target.value})}
            />
          </div>
          
          {/* Botón de Guardar con estilo fuerte */}
          <button 
            type="submit" 
            className="mt-2 w-full bg-black text-white py-3 px-4 font-bold rounded-lg hover:bg-gray-800 transform active:scale-95 transition-all shadow-lg"
          >
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
};