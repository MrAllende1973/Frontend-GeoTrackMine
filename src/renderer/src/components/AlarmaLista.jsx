/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTriangleExclamation,
  faCircle,
  faCircleInfo,
  faSignOut
} from '@fortawesome/free-solid-svg-icons'
import logo from '../assets/svg/tiny-Codelco_logo.svg'
import * as servicesAlarmas from '../services/services_alarma.js'
import cat793iv from '../assets/Image/cat793iv.jpg'
import cat797f from '../assets/Image/cat797f.jpg'
import cat798ac from '../assets/Image/cat798ac.jpg'
import kom930e from '../assets/Image/kom930e.jpg'

const flotas = [
  {
    flota: 'CAT 793F - ICV',
    src: cat793iv
  },
  {
    flota: 'CAT 797F',
    src: cat797f
  },
  {
    flota: 'CAT 797F_MAKEUP',
    src: cat797f
  },
  {
    flota: 'CAT 798AC',
    src: cat798ac
  },
  {
    flota: 'KOM 930E',
    src: kom930e
  }
]

const ModalLista = ({ setModalUseState, data, setTotal, update }) => {
  return (
    <div className="modalPopup">
      <img srcSet={logo} className="material-symbols-outlined"></img>
      <header className="tituloAlarma">Detalles de la Alarma</header>
      <div className="content">
        <img
          className="imagenVehiculo"
          src={flotas.filter((obj) => obj.flota === data.flota).at(0).src}
        />
        <div className="infoAlarma">
          <header className="infoVehiculo">
            {data.grupo} {data.flota} {data.caex}
          </header>
          <h4>Detalles de la Alerta {data.id}</h4>
          <ul className="listaInfo">
            <li className="item">Fecha</li>
            <li className="description">{data.fecha}</li>
            <li className="item">Estado</li>
            <li className="description">{data.estado}</li>
            <li className="item">Localizacion</li>
            <li className="description">{data.localizacion}</li>
            <li className="item">Este</li>
            <li className="description">{data.este}</li>
            <li className="item">Norte</li>
            <li className="description">{data.norte}</li>
            <li className="item">Cota</li>
            <li className="description">{data.cota}</li>
            <li className="item">Razón</li>
            <li className="description">{data.razon}</li>
            <li className="item">Comentario</li>
            <li className="description">{data.comment ? data.comment : 'No hay comentario'}</li>
          </ul>
        </div>
        <div className="botonesModal">
          <button
            type="button"
            className={data.estado !== 'Resuelta' ? 'resueltaEstado' : 'changeEstado'}
            onClick={
              data.estado !== 'Resuelta'
                ? async () => {
                    await servicesAlarmas.putResolve(data.id)
                    setTotal(await servicesAlarmas.fetchData())
                    setModalUseState(false)
                    update(1)
                  }
                : async () => {
                    await servicesAlarmas.putReopen(data.id)
                    setTotal(await servicesAlarmas.fetchData())
                    setModalUseState(false)
                    update(1)
                  }
            }
          >
            {data.estado !== 'Resuelta' ? 'Resolver' : 'Reabrir'}
          </button>
          <button type="button" className="cerrarModal" onClick={() => setModalUseState(false)}>
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export const AlarmaLista = () => {
  const LIMIT = 20
  const [isLoading, setLoading] = React.useState(true)
  const [index, setIndex] = React.useState(0)
  const [dataAlarma, setDataAlarma] = React.useState([])
  const [modalActivate, setActivateModal] = React.useState(false)
  const [dataToShow, setDataToShow] = React.useState({})
  const [totalData, setTotalData] = React.useState({})

  const changeIndex = (idx) => {
    const start = 20 * (idx - 1)
    const end = 20 * idx - 1
    setDataAlarma(totalData.slice(start, end))
    return
  }

  const jsonToData = async () => {
    setIndex(parseInt(totalData.length / LIMIT) + 1)
    if (totalData.length < LIMIT) {
      setDataAlarma()
    } else {
      setDataAlarma(totalData.slice(0, 19))
    }
  }

  const returnLogin = () => {
    window.location.href = location.href.replace('#/alarma-lista', '')
  }

  useEffect(() => {
    const fetch = async () => {
      setTotalData(await servicesAlarmas.fetchData())
      jsonToData()
      setLoading(false)
    }
    fetch()
  }, [totalData.length > 0])

  if (isLoading) console.log('loading!')
  return (
    <>
      <div className="bgList grayScale"></div>
      <button onClick={returnLogin} className="logout">
        <FontAwesomeIcon icon={faSignOut} color="orange" />
      </button>
      {modalActivate && (
        <ModalLista
          setModalUseState={setActivateModal}
          data={dataToShow}
          setTotal={setTotalData}
          update={changeIndex}
        />
      )}
      <div className={modalActivate ? 'containerList blur' : 'containerList'}>
        <div className="block">
          <div className="kpi">
            <div className="card">
              <p>Total de Alarmas</p>
              <strong>{totalData.length}</strong>
            </div>
            <div className="card">
              <p>Alarmas en Reserva</p>
              <strong>
                {Array.isArray(totalData)
                  ? totalData.filter((alarma) => alarma.estado === 'Reserva').length
                  : 0}
              </strong>
            </div>
            <div className="card">
              <p>Alarmas en Demora</p>
              <strong>
                {Array.isArray(totalData)
                  ? totalData.filter((alarma) => alarma.estado === 'Demora').length
                  : 0}
              </strong>
            </div>
            <div className="card">
              <p>Alarmas Resueltas</p>
              <strong>
                {Array.isArray(totalData)
                  ? totalData.filter((alarma) => alarma.estado === 'Resuelta').length
                  : 0}
              </strong>
            </div>
            <div className="card">
              <p>Alarmas Reabiertas</p>
              <strong>
                {Array.isArray(totalData)
                  ? totalData.filter((alarma) => alarma.estado === 'Reabierta').length
                  : 0}
              </strong>
            </div>
          </div>
          <table className="tableAlarma">
            <thead className="headers">
              <tr className="rowHeader">
                <th className="header">Camión</th>
                <th className="header">Grupo</th>
                <th className="header">Localizacion</th>
                <th className="header">Estado</th>
                <th className="header">Razon</th>
                <th className="header">Periodo</th>
                <th className="header">Acción</th>
              </tr>
            </thead>
            <tbody className="rows">
              {(() => {
                const arr = []
                for (let data of dataAlarma) {
                  arr.push(
                    <tr className="rowAlarma" key={data.id}>
                      <td>{data.caex}</td>
                      <td>{data.grupo}</td>
                      <td>{data.localizacion}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={data.estado === 'Demora' ? faTriangleExclamation : faCircle}
                          color={
                            data.estado === 'Demora'
                              ? 'red'
                              : data.estado === 'Reserva'
                                ? 'orange'
                                : data.estado === 'Reabierta'
                                  ? 'blue'
                                  : 'green'
                          }
                        />
                      </td>
                      <td>{data.razon}</td>
                      <td>{data.fecha}</td>
                      <td>
                        <button className="buttonAction">
                          <FontAwesomeIcon
                            className="iconAction"
                            icon={faCircleInfo}
                            onClick={() => {
                              setDataToShow(data)
                              setActivateModal(true)
                            }}
                          />
                        </button>
                      </td>
                    </tr>
                  )
                }
                return arr
              })()}
            </tbody>
            <tfoot className="foot">
              <tr>
                <td colSpan="7">
                  {(() => {
                    const array = []
                    for (let idx = 1; idx <= index; idx++) {
                      array.push(
                        <button
                          onClick={() => changeIndex(idx)}
                          className="indexes"
                          key={'idx_' + idx}
                        >
                          {idx}
                        </button>
                      )
                    }
                    return array
                  })()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  )
}
