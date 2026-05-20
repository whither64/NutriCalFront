import { useState } from "react"
import "./Calculadora.css"

function Calculadora() {

  const [peso, setPeso] = useState("")
  const [altura, setAltura] = useState("")
  const [edad, setEdad] = useState("")
  const [genero, setGenero] = useState("hombre")
  const [actividad, setActividad] = useState(1.2)

  const [resultado, setResultado] = useState(null)

  const calcular = () => {

    if (!peso || !altura || !edad) {
      return
    }

    const alturaMetros = altura / 100

    // IMC
    const imc =
      peso / (alturaMetros * alturaMetros)

    // TMB
    let tmb = 0

    if (genero === "hombre") {

      tmb =
        10 * peso +
        6.25 * altura -
        5 * edad +
        5

    } else {

      tmb =
        10 * peso +
        6.25 * altura -
        5 * edad -
        161

    }

    // CALORÍAS
    const calorias =
      Math.round(tmb * actividad)

    // AGUA
    const agua =
      (peso * 35 / 1000).toFixed(1)

    // PESO IDEAL
    const pesoIdeal =
      (22 * (alturaMetros * alturaMetros))
      .toFixed(1)

    let objetivo = ""
    let estado = ""

    // ESTADO FÍSICO
    if (imc < 18.5) {

      objetivo = "Subir peso"
      estado = "Bajo peso"

    } else if (imc >= 18.5 && imc <= 24.9) {

      objetivo = "Mantener peso"
      estado = "Peso normal"

    } else if (imc >= 25 && imc <= 29.9) {

      objetivo = "Bajar peso"
      estado = "Sobrepeso"

    } else {

      objetivo = "Bajar peso"
      estado = "Obesidad"

    }

    setResultado({
      imc: imc.toFixed(1),
      calorias,
      objetivo,
      estado,
      agua,
      pesoIdeal
    })

  }

  return (

    <div className="calculadora-container">

      <div className="calculadora-card">

        <h1>
          Calculadora Nutricional
        </h1>

        <p className="subtitle">
          Calcula tus calorías diarias,
          IMC y objetivo nutricional
        </p>

        {/* INPUTS */}
        <div className="inputs-grid">

          <div className="input-group">

            <label>Peso (kg)</label>

            <input
              type="number"
              placeholder="Ej. 65"
              value={peso}
              onChange={(e) =>
                setPeso(e.target.value)
              }
            />

          </div>

          <div className="input-group">

            <label>Altura (cm)</label>

            <input
              type="number"
              placeholder="Ej. 170"
              value={altura}
              onChange={(e) =>
                setAltura(e.target.value)
              }
            />

          </div>

          <div className="input-group">

            <label>Edad</label>

            <input
              type="number"
              placeholder="Ej. 20"
              value={edad}
              onChange={(e) =>
                setEdad(e.target.value)
              }
            />

          </div>

          <div className="input-group">

            <label>Género</label>

            <select
              value={genero}
              onChange={(e) =>
                setGenero(e.target.value)
              }
            >

              <option value="hombre">
                Hombre
              </option>

              <option value="mujer">
                Mujer
              </option>

            </select>

          </div>

          <div className="input-group full-width">

            <label>
              Actividad física
            </label>

            <select
              value={actividad}
              onChange={(e) =>
                setActividad(
                  Number(e.target.value)
                )
              }
            >

              <option value="1.2">
                Sedentario
              </option>

              <option value="1.375">
                Ligera
              </option>

              <option value="1.55">
                Moderada
              </option>

              <option value="1.725">
                Intensa
              </option>

            </select>

          </div>

        </div>

        {/* BOTON */}
        <button
          className="calculate-btn"
          onClick={calcular}
        >
          Calcular
        </button>

        {/* RESULTADOS */}
        {resultado && (

          <div className="resultado">

            <div className="resultado-card">

              <h2>IMC</h2>

              <p>{resultado.imc}</p>

            </div>

            <div className="resultado-card">

              <h2>Calorías</h2>

              <p>
                {resultado.calorias} kcal
              </p>

            </div>

            <div className="resultado-card">

              <h2>Objetivo</h2>

              <p>{resultado.objetivo}</p>

            </div>

            <div className="resultado-card">

              <h2>Estado físico</h2>

              <p>{resultado.estado}</p>

            </div>

            <div className="resultado-card">

              <h2>Agua diaria</h2>

              <p>
                {resultado.agua} L
              </p>

            </div>

            <div className="resultado-card">

              <h2>Peso ideal</h2>

              <p>
                {resultado.pesoIdeal} kg
              </p>

            </div>

          </div>

        )}

      </div>

    </div>

  )

}

export default Calculadora