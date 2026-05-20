import { useState } from "react"
import { useApp } from "../contexts/AppContext"
import "./RegistroDiario.css"

function RegistroDiario() {

  const {

    agua,
    setAgua,

    registros,
    setRegistros,

    totalCalorias

  } = useApp()

  const metaCalorias = 2000

  const porcentaje =
    (totalCalorias /
      metaCalorias) * 100

  const [comida, setComida] =
    useState({

      nombre: "",
      calorias: "",
      hora: ""

    })

  // AGREGAR COMIDA
  const agregarComida = () => {

    if (
      !comida.nombre ||
      !comida.calorias ||
      !comida.hora
    ) {

      alert(
        "Completa todos los campos"
      )

      return

    }

    setRegistros([

      ...registros,

      {
        nombre:
          comida.nombre,

        calorias:
          Number(
            comida.calorias
          ),

        hora:
          comida.hora
      }

    ])

    setComida({

      nombre: "",
      calorias: "",
      hora: ""

    })

  }

  return (

    <div className="registro-container">

      {/* HEADER */}
      <div className="registro-header">

        <h1>
          Registro diario
        </h1>

        <p>
          Controla tu alimentación
          diaria
        </p>

      </div>

      {/* CARDS */}
      <div className="registro-cards">

        {/* CALORIAS */}
        <div className="registro-card">

          <h3>
            Calorías consumidas
          </h3>

          <h2>
            {totalCalorias} kcal
          </h2>

        </div>

        {/* META */}
        <div className="registro-card">

          <h3>
            Meta diaria
          </h3>

          <h2>
            {metaCalorias} kcal
          </h2>

        </div>

        {/* AGUA */}
        <div className="registro-card">

          <h3>
            Agua consumida
          </h3>

          <h2>
            {agua} vasos
          </h2>

          <div className="water-buttons">

            <button
              onClick={() =>
                setAgua(
                  agua > 0
                    ? agua - 1
                    : 0
                )
              }
            >
              -
            </button>

            <button
              onClick={() =>
                setAgua(agua + 1)
              }
            >
              +
            </button>

          </div>

        </div>

      </div>

      {/* PROGRESO */}
      <div className="progress-card">

        <div className="progress-top">

          <h3>
            Progreso diario
          </h3>

          <span>
            {Math.floor(
              porcentaje
            )}%
          </span>

        </div>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width:
                `${porcentaje}%`
            }}
          ></div>

        </div>

      </div>

      {/* FORM */}
      <div className="form-card">

        <h2>
          Agregar comida
        </h2>

        <div className="registro-form">

          <input
            type="text"
            placeholder="Comida"
            value={comida.nombre}
            onChange={(e) =>
              setComida({
                ...comida,
                nombre:
                  e.target.value
              })
            }
          />

          <input
            type="number"
            placeholder="Calorías"
            value={comida.calorias}
            onChange={(e) =>
              setComida({
                ...comida,
                calorias:
                  e.target.value
              })
            }
          />

          <input
            type="time"
            value={comida.hora}
            onChange={(e) =>
              setComida({
                ...comida,
                hora:
                  e.target.value
              })
            }
          />

        </div>

        <button
          className="add-btn"
          onClick={agregarComida}
        >
          Guardar comida
        </button>

      </div>

      {/* HISTORIAL */}
      <div className="historial">

        <h2>
          Historial del día
        </h2>

        {registros.map(
          (item, index) => (

          <div
            className="historial-item"
            key={index}
          >

            <div>

              <h3>
                {item.nombre}
              </h3>

              <p>
                {item.hora}
              </p>

            </div>

            <span>
              {item.calorias} kcal
            </span>

          </div>

        ))}

      </div>

    </div>

  )

}

export default RegistroDiario