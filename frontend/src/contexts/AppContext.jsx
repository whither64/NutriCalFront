import {
  createContext,
  useContext,
  useState
} from "react"

const AppContext =
  createContext()

export const AppProvider =
({ children }) => {

  // AGUA
  const [agua, setAgua] =
    useState(5)

  // REGISTROS
  const [registros,
    setRegistros] =
    useState([

      {
        nombre: "Desayuno",
        calorias: 450,
        hora: "08:00"
      },

      {
        nombre: "Comida",
        calorias: 700,
        hora: "14:00"
      }

    ])

  // RECETAS
  const [recetas,
    setRecetas] =
    useState([])

  // PLANES
  const [planes,
    setPlanes] =
    useState([])

  // TOTAL CALORIAS
  const totalCalorias =
    registros.reduce(
      (acc, item) =>
        acc + item.calorias,
      0
    )

  return (

    <AppContext.Provider
      value={{

        agua,
        setAgua,

        registros,
        setRegistros,

        recetas,
        setRecetas,

        planes,
        setPlanes,

        totalCalorias

      }}
    >

      {children}

    </AppContext.Provider>

  )

}

export const useApp = () => {

  return useContext(AppContext)

}