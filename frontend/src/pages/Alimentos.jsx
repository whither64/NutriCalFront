import { useEffect, useState } from "react"
import axios from "axios"
import "./Alimentos.css"

function Alimentos() {

  const [alimentos, setAlimentos] =
    useState([])

  const [busqueda, setBusqueda] =
    useState("")

  const [loading, setLoading] =
    useState(true)

  // FORMULARIO
  const [nuevoAlimento, setNuevoAlimento] =
    useState({
      nombre: "",
      calorias: "",
      proteinas: "",
      carbohidratos: "",
      grasas: "",
      fibra: ""
    })

  useEffect(() => {

    obtenerAlimentos()

  }, [])

  // OBTENER ALIMENTOS
  const obtenerAlimentos = async () => {

    try {

      const response = await axios.get(
        "/api/foods?page=1&limit=20"
      )

      setAlimentos(response.data || [])

    } catch (err) {

      console.log(
        "Error alimentos:",
        err.response?.data || err.message
      )

    } finally {

      setLoading(false)

    }

  }

  // CREAR ALIMENTO
  const crearAlimento = async () => {

    try {

      await axios.post(
        "/api/foods",
        {
          nombre:
            nuevoAlimento.nombre,

          calorias:
            Number(
              nuevoAlimento.calorias
            ),

          proteinas:
            Number(
              nuevoAlimento.proteinas
            ),

          carbohidratos:
            Number(
              nuevoAlimento.carbohidratos
            ),

          grasas:
            Number(
              nuevoAlimento.grasas
            ),

          fibra:
            Number(
              nuevoAlimento.fibra
            )
        }
      )

      // LIMPIAR FORM
      setNuevoAlimento({
        nombre: "",
        calorias: "",
        proteinas: "",
        carbohidratos: "",
        grasas: "",
        fibra: ""
      })

      // RECARGAR
      obtenerAlimentos()

    } catch (err) {

      console.log(
        "Error creando alimento:",
        err.response?.data || err.message
      )

    }

  }

  // FILTRAR
  const alimentosFiltrados =
    alimentos.filter((alimento) =>

      alimento.nombre
        ?.toLowerCase()
        .includes(
          busqueda.toLowerCase()
        )

    )

  return (

    <div className="alimentos-container">

      {/* HEADER */}
      <div className="alimentos-header">

        <div>

          <h1>Alimentos</h1>

          <p>
            Administra alimentos y
            valores nutricionales
          </p>

        </div>

      </div>

      {/* FORMULARIO */}
      <div className="form-card">

        <h2>
          Agregar alimento
        </h2>

        <div className="form-grid">

          <input
            type="text"
            placeholder="Nombre"
            value={nuevoAlimento.nombre}
            onChange={(e) =>
              setNuevoAlimento({
                ...nuevoAlimento,
                nombre:
                  e.target.value
              })
            }
          />

          <input
            type="number"
            placeholder="Calorías"
            value={nuevoAlimento.calorias}
            onChange={(e) =>
              setNuevoAlimento({
                ...nuevoAlimento,
                calorias:
                  e.target.value
              })
            }
          />

          <input
            type="number"
            placeholder="Proteínas"
            value={nuevoAlimento.proteinas}
            onChange={(e) =>
              setNuevoAlimento({
                ...nuevoAlimento,
                proteinas:
                  e.target.value
              })
            }
          />

          <input
            type="number"
            placeholder="Carbohidratos"
            value={
              nuevoAlimento.carbohidratos
            }
            onChange={(e) =>
              setNuevoAlimento({
                ...nuevoAlimento,
                carbohidratos:
                  e.target.value
              })
            }
          />

          <input
            type="number"
            placeholder="Grasas"
            value={nuevoAlimento.grasas}
            onChange={(e) =>
              setNuevoAlimento({
                ...nuevoAlimento,
                grasas:
                  e.target.value
              })
            }
          />

          <input
            type="number"
            placeholder="Fibra"
            value={nuevoAlimento.fibra}
            onChange={(e) =>
              setNuevoAlimento({
                ...nuevoAlimento,
                fibra:
                  e.target.value
              })
            }
          />

        </div>

        <button
          className="add-btn"
          onClick={crearAlimento}
        >
          Guardar alimento
        </button>

      </div>

      {/* BUSCADOR */}
      <div className="search-box">

        <input
          type="text"
          placeholder="Buscar alimento..."
          value={busqueda}
          onChange={(e) =>
            setBusqueda(e.target.value)
          }
        />

      </div>

      {/* LOADING */}
      {loading ? (

        <p className="loading">
          Cargando alimentos...
        </p>

      ) : (

        <div className="alimentos-grid">

          {alimentosFiltrados.map(
            (alimento) => (

            <div
              className="food-card"
              key={
                alimento.id_food ||
                alimento.id
              }
            >

              <div className="food-top">

                <h2>
                  {alimento.nombre}
                </h2>

              </div>

              <div className="food-info">

                <p>
                  <strong>
                    Calorías:
                  </strong>{" "}
                  {alimento.calorias}
                </p>

                <p>
                  <strong>
                    Proteínas:
                  </strong>{" "}
                  {alimento.proteinas} g
                </p>

                <p>
                  <strong>
                    Carbohidratos:
                  </strong>{" "}
                  {
                    alimento.carbohidratos
                  } g
                </p>

                <p>
                  <strong>
                    Grasas:
                  </strong>{" "}
                  {alimento.grasas} g
                </p>

                <p>
                  <strong>
                    Fibra:
                  </strong>{" "}
                  {alimento.fibra || 0} g
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  )

}

export default Alimentos