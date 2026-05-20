import { useState } from "react"

import "./Dashboard.css"

import { useApp }
from "../contexts/AppContext"

import Alimentos
from "./Alimentos"

import Recetas
from "./Recetas"

import RegistroDiario
from "./RegistroDiario"

import Planes
from "./Planes"

import Calculadora
from "./Calculadora"

function Dashboard() {

  const {

    agua,
    totalCalorias,
    registros,
    recetas,
    planes

  } = useApp()

  // PAGINA ACTUAL
  const [currentPage,
    setCurrentPage] =
    useState("inicio")

  // RENDER PAGINAS
  const renderPage = () => {

    switch (currentPage) {

      case "alimentos":
        return <Alimentos />

      case "recetas":
        return <Recetas />

      case "registro":
        return <RegistroDiario />

      case "planes":
        return <Planes />

      case "calculadora":
        return <Calculadora />

      default:
        return (

          <>

            {/* HEADER */}
            <div className="topbar">

              <div>

                <h1>
                  Hola, {user?.nombre || "Usuario"}
                </h1>

                <p>
                  Bienvenido a
                  NutriKali
                </p>

              </div>

            </div>

            {/* CARDS */}
            <div className="cards">

              {/* PROGRESO */}
              <div className="card progress">

                <h2>
                  Mi progreso
                </h2>

                <div className="circle">

                  {totalCalorias} kcal

                </div>

                <div className="stats">

                  <p>
                    Agua:
                    {" "}
                    {agua} vasos
                  </p>

                  <p>
                    Comidas:
                    {" "}
                    {registros.length}
                  </p>

                  <p>
                    Meta:
                    {" "}
                    2000 kcal
                  </p>

                </div>

              </div>

              {/* RESUMEN */}
              <div className="card summary">

                <h2>
                  Resumen del día
                </h2>

                <p>
                  Total calorías:
                  {" "}
                  {totalCalorias}
                </p>

                <p>
                  Agua consumida:
                  {" "}
                  {agua} vasos
                </p>

                <p>
                  Registros:
                  {" "}
                  {registros.length}
                </p>

              </div>

              {/* RECETAS */}
              <div className="card recipes">

                <h2>
                  Últimas recetas
                </h2>

                {

                  recetas.length > 0
                  ? (

                    recetas
                      .slice(-2)
                      .map(
                        (
                          receta,
                          index
                        ) => (

                        <div
                          className="recipe-box"
                          key={index}
                        >

                          <h3>
                            {
                              receta.nombre
                            }
                          </h3>

                        </div>

                      ))

                  ) : (

                    <p>
                      No hay recetas aún
                    </p>

                  )

                }

              </div>

              {/* PLANES */}
              <div className="card news">

                <h2>
                  Planes activos
                </h2>

                {

                  planes.length > 0
                  ? (

                    planes
                      .slice(-2)
                      .map(
                        (
                          plan,
                          index
                        ) => (

                        <div
                          className="news-box"
                          key={index}
                        >

                          <p>
                            {
                              plan.objetivo
                            }
                          </p>

                          <span>
                            {
                              plan.calorias
                            } kcal
                          </span>

                        </div>

                      ))

                  ) : (

                    <p>
                      No hay planes aún
                    </p>

                  )

                }

              </div>

            </div>

          </>

        )

    }

  }

  return (

    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="logo-section">

          <h1>
            NutriKali
          </h1>

        </div>

        <nav className="menu">

          <button
            onClick={() =>
              setCurrentPage(
                "inicio"
              )
            }
          >
            Inicio
          </button>

          <button
            onClick={() =>
              setCurrentPage(
                "alimentos"
              )
            }
          >
            Alimentos
          </button>

          <button
            onClick={() =>
              setCurrentPage(
                "recetas"
              )
            }
          >
            Recetas
          </button>

          <button
            onClick={() =>
              setCurrentPage(
                "planes"
              )
            }
          >
            Planes alimenticios
          </button>

          <button
            onClick={() =>
              setCurrentPage(
                "registro"
              )
            }
          >
            Registro diario
          </button>

          <button
            onClick={() =>
              setCurrentPage(
                "calculadora"
              )
            }
          >
            Calculadora nutricional
          </button>

        </nav>

        <button className="logout">

          Cerrar sesión

        </button>

      </aside>

      {/* CONTENIDO */}
      <main className="main-content">

        {renderPage()}

      </main>

    </div>

  )

}

export default Dashboard