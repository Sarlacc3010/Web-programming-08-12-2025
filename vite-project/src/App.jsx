import React from 'react';
import { Search, Trash2, Plus, Edit } from 'lucide-react';
import { usePeople } from './usePeople';
import { Modal } from './Modal';
import { Pagination } from './Pagination';

function App() {
  const {
    currentItems, startIndex,
    searchTerm, setSearchTerm,
    currentPage, totalPages, setCurrentPage,
    isModalOpen, openAdd, openEdit, closeModal,
    formData, setFormData, savePerson,
    toggleCheck, deleteSelected, currentPerson
  } = usePeople();

  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans text-gray-800">
      
      {/* CONTENEDOR PRINCIPAL (Estilo Sketch) */}
      <div className="max-w-3xl mx-auto border-2 border-black bg-white p-6 rounded-lg relative min-h-[500px] shadow-lg">

        {/* 1. HEADER: Buscador y Título */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold tracking-tighter">List</h1>
          
          {/* Input de Búsqueda estilo dibujo */}
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="Search Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-2 border-black rounded-full py-2 pl-4 pr-10 focus:outline-none focus:bg-blue-50"
            />
            <Search className="absolute right-3 top-2.5 text-gray-500" size={20} />
          </div>
        </div>

        {/* 2. TABLA */}
        <div className="overflow-hidden border-2 border-black rounded-lg mb-16">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 border-b-2 border-black">
              <tr>
                <th className="p-3 w-12 text-center border-r-2 border-black">Check</th>
                <th className="p-3 w-16 text-center border-r-2 border-black">No.</th>
                <th className="p-3 border-r-2 border-black">Name</th>
                <th className="p-3 w-20 text-center">Age</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((person, index) => (
                <tr key={person.id} className="border-b border-black last:border-b-0 hover:bg-gray-50">
                  {/* Checkbox */}
                  <td className="p-3 text-center border-r-2 border-black">
                    <input 
                      type="checkbox" 
                      checked={person.checked} 
                      onChange={() => toggleCheck(person.id)}
                      className="w-5 h-5 accent-black cursor-pointer"
                    />
                  </td>
                  
                  {/* Número Secuencial (1, 2, 3...) */}
                  <td className="p-3 text-center border-r-2 border-black font-mono font-bold">
                    {startIndex + index + 1}
                  </td>
                  
                  {/* Name */}
                  <td className="p-3 border-r-2 border-black font-medium">{person.name}</td>
                  
                  {/* Age */}
                  <td className="p-3 text-center">{person.age}</td>

                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr><td colSpan="5" className="p-4 text-center text-gray-500">No data found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 3. FOOTER (Posición Absoluta para que quede fijo abajo) */}
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
          
          <div className="flex gap-2">
            {/* Botón ADD */}
            <button 
              onClick={openAdd}
              className="flex items-center gap-2 bg-white border-2 border-black px-4 py-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all"
            >
              <Plus size={18} /> Add
            </button>

            {/* Botón DELETE */}
            <button 
              onClick={deleteSelected}
              className="flex items-center gap-2 bg-white border-2 border-black text-red-600 px-4 py-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>

          {/* Componente Paginación */}
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage}
          />
        </div>

      </div>

      {/* 4. MODAL POPUP */}
      <Modal 
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentPerson ? "Edit Person" : "Add Person"}
        formData={formData}
        setFormData={setFormData}
        onSave={savePerson}
      />

    </div>
  );
}

export default App;