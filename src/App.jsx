import './App.css';
import { Table, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter  } from 'reactstrap';
import { useState } from 'react';

function App() {
  const [data, setData] = useState([
    { id: 1, nombre: "Bajo la misma estrella", autor: "John Green" },
    { id: 2, nombre: "Una paz sólo nuestra", autor: "John Knowles" },
    { id: 3, nombre: "Inocencia interrumpida", autor: "Susanna Kaysen" },
    { id: 4, nombre: "Matar a un Ruiseñor", autor: "Harper Lee" },
    { id: 5, nombre: "Orgullo y prejuicio", autor: "Jane Austen" },
  ]);
  // estado para el modal de agregar y editar
  const [modalOpen, setModalOpen] = useState(false);

  // indice del registro en edición
  const [editingIndex, setEditingIndex] = useState(null); 

  //estado ´para el nombre
  const [nombre, setNombre] = useState(''); 
  
  // estado de autor
  const [autor, setAutor] = useState(''); 

   // Función para abrir/cerrar el modal
  const toggleModal = () => setModalOpen(!modalOpen);

  // edición 
  const handleEdit = (index) => { 
    setEditingIndex(index); // Establece el índice de edición
    const { nombre, autor } = data[index];
    setNombre(nombre); //  nombre del libro en el estado
    setAutor(autor); // Establece el autor 
    toggleModal(); // Abre el modal
  };

   //agregar o editar un registro
  const agegarOEditar = () => {
    if (editingIndex !== null) { // Si se está editando un registro existente
      const newData = [...data];
      newData[editingIndex] = { ...newData[editingIndex], nombre, autor }; // Actualiza el registro 
      setData(newData); // Actualizar el estdo
    } else { //Si se agrega uno nuevo
      const nuevoId = data.length + 1; // se genera el id automáticamente
      const nuevaEntrada = { id: nuevoId, nombre, autor }; // Crear un nuevo objeto 
      setData([...data, nuevaEntrada]); // Agrega el nuevo valor
    }
    // Reinicia el índice de edición
    setEditingIndex(null); 
    setNombre(''); 
    setAutor('');
    toggleModal(); // Cierra modal
  };

  //  eliminar
  const eliminar = (index) => { 
    if (window.confirm('¿Estás seguro de que quieres eliminar este registro?')) {
      // Filtra los registros excluyendo el que se va a eliminar
      setData(data.filter((_, i) => i !== index)); 
    }
  };

  return (
    <div className="container">
      <button 
      className='btn btn-success' 
      onClick={() => {setEditingIndex(null); toggleModal();}}>Agregar Registro</button><br /><br />
      <Table>

        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Autor</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {data.map((elemento, index) => (
            <tr key={elemento.id}>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.autor}</td>
              <td>
                <button className='btn btn-warning accion' onClick={() => handleEdit(index)}>Editar</button>
                <button className='btn btn-danger' onClick={() => eliminar(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>

      </Table>

      <Modal isOpen={modalOpen} toggle={toggleModal}>

        <ModalHeader toggle={toggleModal}>
          <h3>{editingIndex !== null ? 'Editar Registro' : 'Agregar Registro'}</h3>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Id:</label>
            <input type="text" className='form-control' readOnly value={data.length + 1} />
          </FormGroup>

          <FormGroup>
            <label>Nombre:</label>
            <input type="text" className='form-control' value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </FormGroup>

          <FormGroup>
            <label>Autor:</label>
            <input type="text" className='form-control' value={autor} onChange={(e) => setAutor(e.target.value)} />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <button className='btn btn-warning' onClick={agegarOEditar}>Aceptar</button>
          <button className='btn btn-danger' onClick={toggleModal}>Cancelar</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;


