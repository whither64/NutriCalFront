import { useState } from "react"
import "./Recetas.css"
import { useApp } from "../contexts/AppContext"

function Recetas() {

  const [busqueda, setBusqueda] =
    useState("")

  // MODAL
  const [recetaSeleccionada,
    setRecetaSeleccionada] =
    useState(null)

  // FORMULARIO
  const [nuevaReceta, setNuevaReceta] =
    useState({
      nombre: "",
      descripcion: "",
      pasos: "",
      tiempo: "",
      imagen: ""
    })

  // RECETAS
  const {

  recetas,
  setRecetas

    } = useApp()

  // SUBIR IMAGEN
  const handleImagen = (e) => {

    const file = e.target.files[0]

    if (!file) return

    const imageUrl =
      URL.createObjectURL(file)

    setNuevaReceta({
      ...nuevaReceta,
      imagen: imageUrl
    })

  }

  // AGREGAR RECETA
  const agregarReceta = () => {

    if (
      !nuevaReceta.nombre ||
      !nuevaReceta.descripcion ||
      !nuevaReceta.pasos ||
      !nuevaReceta.tiempo ||
      !nuevaReceta.imagen
    ) {

      alert(
        "Completa todos los campos"
      )

      return

    }

    const receta = {

      id: Date.now(),

      nombre:
        nuevaReceta.nombre,

      descripcion:
        nuevaReceta.descripcion,

      pasos:
        nuevaReceta.pasos,

      tiempo:
        nuevaReceta.tiempo,

      imagen:
        nuevaReceta.imagen,

      calorias:
        Math.floor(
          Math.random() * 400
        ) + 100
    }

    setRecetas([
      receta,
      ...recetas
    ])

    // LIMPIAR FORM
    setNuevaReceta({
      nombre: "",
      descripcion: "",
      pasos: "",
      tiempo: "",
      imagen: ""
    })

  }

  // BUSCADOR
  const recetasFiltradas =
    recetas.filter((receta) =>

      receta.nombre
        .toLowerCase()
        .includes(
          busqueda.toLowerCase()
        )

    )

  return (

    <div className="recetas-container">

      {/* HEADER */}
      <div className="recetas-header">

        <div>

          <h1>
            Recetas saludables
          </h1>

          <p>
            Comparte recetas
            saludables y nutritivas
          </p>

        </div>

      </div>

      {/* FORMULARIO */}
      <div className="form-card">

        <h2>
          Agregar receta
        </h2>

        <div className="form-grid">

          <input
            type="text"
            placeholder="Nombre receta"
            value={nuevaReceta.nombre}
            onChange={(e) =>
              setNuevaReceta({
                ...nuevaReceta,
                nombre:
                  e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Tiempo preparación"
            value={nuevaReceta.tiempo}
            onChange={(e) =>
              setNuevaReceta({
                ...nuevaReceta,
                tiempo:
                  e.target.value
              })
            }
          />

          {/* SUBIR IMAGEN */}
          <label className="upload-box">

            Subir imagen

            <input
              type="file"
              accept="image/*"
              onChange={handleImagen}
            />

          </label>

        </div>

        <textarea
          placeholder="Descripción"
          value={
            nuevaReceta.descripcion
          }
          onChange={(e) =>
            setNuevaReceta({
              ...nuevaReceta,
              descripcion:
                e.target.value
            })
          }
        />

        <textarea
          placeholder="Pasos de preparación"
          value={nuevaReceta.pasos}
          onChange={(e) =>
            setNuevaReceta({
              ...nuevaReceta,
              pasos: e.target.value
            })
          }
        />

        {/* PREVIEW */}
        {nuevaReceta.imagen && (

          <img
            src={nuevaReceta.imagen}
            alt="preview"
            className="preview-img"
          />

        )}

        <button
          className="add-btn"
          onClick={agregarReceta}
        >
          Guardar receta
        </button>

      </div>

      {/* BUSCADOR */}
      <div className="search-box">

        <input
          type="text"
          placeholder="Buscar receta..."
          value={busqueda}
          onChange={(e) =>
            setBusqueda(e.target.value)
          }
        />

      </div>

      {/* GRID */}
      <div className="recetas-grid">

        {recetasFiltradas.map(
          (receta) => (

          <div
            className="receta-card"
            key={receta.id}
          >

            <img
              src={receta.imagen}
              alt={receta.nombre}
            />

            <div className="receta-content">

              <h2>
                {receta.nombre}
              </h2>

              <p className="descripcion">
                {receta.descripcion}
              </p>

              <div className="info">

                <span>
                  {receta.calorias} kcal
                </span>

                <span>
                  {receta.tiempo}
                </span>

              </div>

              <button
                onClick={() =>
                  setRecetaSeleccionada(
                    receta
                  )
                }
              >
                Ver receta
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* MODAL */}
      {recetaSeleccionada && (

        <div className="modal-overlay">

          <div className="modal">

            <img
              src={
                recetaSeleccionada.imagen
              }
              alt={
                recetaSeleccionada.nombre
              }
            />

            <h2>
              {recetaSeleccionada.nombre}
            </h2>

            <p className="modal-desc">
              {
                recetaSeleccionada.descripcion
              }
            </p>

            <div className="modal-info">

              <span>
                {
                  recetaSeleccionada.calorias
                } kcal
              </span>

              <span>
                {
                  recetaSeleccionada.tiempo
                }
              </span>

            </div>

            <div className="pasos">

              <h3>
                Preparación
              </h3>

              <p>
                {
                  recetaSeleccionada.pasos
                }
              </p>

            </div>

            <button
              className="close-btn"
              onClick={() =>
                setRecetaSeleccionada(
                  null
                )
              }
            >
              Cerrar
            </button>

          </div>

        </div>

      )}

    </div>

  )

}

export default Recetas