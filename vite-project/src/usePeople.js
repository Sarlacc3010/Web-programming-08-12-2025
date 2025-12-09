// src/usePeople.js
import { useState } from 'react';

export const usePeople = () => {
  // 1. Datos iniciales (Simulando base de datos)
  const [people, setPeople] = useState([
    { id: 1, name: 'Juan', age: 35, checked: false },
    { id: 2, name: 'Carlos', age: 20, checked: false },
    { id: 3, name: 'Maria', age: 28, checked: false },
    { id: 4, name: 'Luisa', age: 45, checked: false },
  ]);

  // 2. Estados para Modales y Búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPerson, setCurrentPerson] = useState(null); // Para saber si editamos
  const [formData, setFormData] = useState({ name: '', age: '' });

  // 3. Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- LÓGICA DE FILTRADO Y PAGINACIÓN ---
  
  // A. Filtramos primero por el buscador
  const filteredPeople = people.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // B. Calculamos índices para paginar
  const totalPages = Math.ceil(filteredPeople.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  
  // C. Obtenemos solo los items de la página actual
  const currentItems = filteredPeople.slice(startIndex, startIndex + itemsPerPage);

  // --- ACCIONES ---

  // Checkbox individual
  const toggleCheck = (id) => {
    setPeople(people.map(p => p.id === id ? { ...p, checked: !p.checked } : p));
  };

  // Borrar seleccionados
  const deleteSelected = () => {
    if(window.confirm("¿Borrar seleccionados?")) {
      setPeople(people.filter(p => !p.checked));
    }
  };

  // Guardar (Crear o Actualizar)
  const savePerson = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age) return;

    if (currentPerson) {
      // MODO ACTUALIZAR
      setPeople(people.map(p => 
        p.id === currentPerson.id ? { ...p, name: formData.name, age: formData.age } : p
      ));
    } else {
      // MODO CREAR
      const newId = people.length > 0 ? Math.max(...people.map(p => p.id)) + 1 : 1;
      setPeople([...people, { id: newId, name: formData.name, age: formData.age, checked: false }]);
    }
    closeModal();
  };

  // Abrir Modal (Agregar)
  const openAdd = () => {
    setCurrentPerson(null);
    setFormData({ name: '', age: '' });
    setIsModalOpen(true);
  };

  // Abrir Modal (Editar)
  const openEdit = (person) => {
    setCurrentPerson(person);
    setFormData({ name: person.name, age: person.age });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return {
    currentItems, // Lista paginada
    startIndex,   // Para calcular el número consecutivo (1, 2, 3...)
    searchTerm, setSearchTerm,
    currentPage, setCurrentPage, totalPages,
    isModalOpen, openAdd, openEdit, closeModal,
    formData, setFormData, savePerson,
    toggleCheck, deleteSelected,
    currentPerson // Para saber si el título es "Editar" o "Crear"
  };
};