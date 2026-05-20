import { useState } from "react"
import "./Planes.css"
import { useApp } from "../contexts/AppContext"

function Planes() {

  const [plan, setPlan] =
    useState({

      calorias: "",
      objetivo: "",
      inicio: "",
      fin: ""

    })

  const {

    planes,
    setPlanes

  } = useApp()

  // AGREGAR PLAN
  const agregarPlan = () => {

    if (
      !plan.calorias ||
      !plan.objetivo ||
      !plan.inicio ||
      !plan.fin
    ) {

      alert(
        "Completa todos los campos"
      )

      return

    }

    setPlanes([
      ...planes,
      plan
    ])

    setPlan({

      calorias: "",
      objetivo: "",
      inicio: "",
      fin: ""

    })

  }

  return (

    <div className="planes-container">

      {/* HEADER */}
      <div className="planes-header">

        <h1>
          Planes alimenticios
        </h1>

        <p>
          Organiza tus metas
          nutricionales
        </p>

      </div>

      {/* FORM */}
      <div className="plan-form-card">

        <h2>
          Crear nuevo plan
        </h2>

        <div className="plan-form">

          <input
            type="number"
            placeholder="Calorías diarias"
            value={plan.calorias}
            onChange={(e) =>
              setPlan({
                ...plan,
                calorias:
                  e.target.value
              })
            }
          />

          <select
            value={plan.objetivo}
            onChange={(e) =>
              setPlan({
                ...plan,
                objetivo:
                  e.target.value
              })
            }
          >

            <option value="">
              Objetivo
            </option>

            <option>
              Perder peso
            </option>

            <option>
              Mantener peso
            </option>

            <option>
              Ganar masa muscular
            </option>

          </select>

          <input
            type="date"
            value={plan.inicio}
            onChange={(e) =>
              setPlan({
                ...plan,
                inicio:
                  e.target.value
              })
            }
          />

          <input
            type="date"
            value={plan.fin}
            onChange={(e) =>
              setPlan({
                ...plan,
                fin:
                  e.target.value
              })
            }
          />

        </div>

        <button
          className="save-btn"
          onClick={agregarPlan}
        >
          Guardar plan
        </button>

      </div>

      {/* PLANES */}
      <div className="planes-grid">

        {planes.map(
          (item, index) => (

          <div
            className="plan-card"
            key={index}
          >

            <h2>
              {item.calorias} kcal
            </h2>

            <p>
              {item.objetivo}
            </p>

            <div className="dates">

              <div>

                <span>
                  Inicio
                </span>

                <h4>
                  {item.inicio}
                </h4>

              </div>

              <div>

                <span>
                  Fin
                </span>

                <h4>
                  {item.fin}
                </h4>

              </div>

            </div>

            {/* PROGRESO */}
            <div className="progress-section">

              <div className="progress-top">

                <span>
                  Progreso
                </span>

                <span>
                  70%
                </span>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                ></div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}

export default Planes