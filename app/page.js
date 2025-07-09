"use client";

import { useState } from 'react';

const preguntas = [
  "Tengo dificultad para perdonarme por errores cometidos en el pasado, incluso pequeños o involuntarios.",
  "Suelo sentirme culpable por situaciones o eventos, aunque claramente no sea responsable por ellos.",
  "Frecuentemente creo que soy responsable de la infelicidad o sufrimiento de las personas a mi alrededor.",
  "Tengo problemas para aceptar elogios o reconocer mis propias cualidades debido al frecuente sentimiento de culpa.",
  "Suelo revivir mentalmente errores del pasado, sintiendo repetidamente vergüenza o remordimiento por estos hechos.",
  "He pensado recientemente que no merezco felicidad o que merezco ser castigado(a) severamente por algo que hice o dejé de hacer.", // FLAG
  "Me siento frecuentemente angustiado(a) o triste pensando que podría haber hecho más o mejor en situaciones anteriores.",
  "Mi vida emocional y autoestima están profundamente afectadas por pensamientos frecuentes de culpa y autoacusación.",
  "Tengo dificultades para tomar decisiones por miedo a cometer errores y luego sentirme culpable.",
  "Evito contacto con personas o situaciones por vergüenza o miedo a ser juzgado(a) por errores cometidos en el pasado."
];

export default function TestCulpa() {
  const [respuestas, setRespuestas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceActual, setIndiceActual] = useState(0);

  const registrarRespuesta = (valor) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[indiceActual] = valor;
    setRespuestas(nuevasRespuestas);

    if (indiceActual < preguntas.length - 1) {
      setIndiceActual(indiceActual + 1);
    } else {
      calcularResultado(nuevasRespuestas);
    }
  };

  const calcularResultado = (respuestas) => {
    if (respuestas[5] >= 3) { // FLAG
      setResultado("ROJO");
    } else {
      const suma = respuestas.reduce((a, b) => a + b, 0);
      if (suma <= 20) setResultado("VERDE");
      else if (suma <= 35) setResultado("AMARILLO");
      else setResultado("ROJO");
    }
  };

  const reiniciarTest = () => {
    setRespuestas(Array(10).fill(0));
    setResultado(null);
    setIndiceActual(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!resultado ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Test de Culpa</h2>
          <div className="mb-6 text-sm text-gray-700 dark:text-gray-300 text-center">
            <p className="mb-4">
              Indica con qué frecuencia te ocurre cada situación actualmente:<br />
              <strong>(1) Nunca | (2) Raramente | (3) A veces | (4) Frecuentemente | (5) Siempre</strong>
            </p>
          </div>

          <p className="mb-4">{preguntas[indiceActual]}</p>

          <div className="flex justify-between items-end mb-4">
            {[1, 2, 3, 4, 5].map((num) => {
              const corGradiente = {
                1: "from-gray-300 to-gray-400",
                2: "from-blue-200 to-blue-300",
                3: "from-blue-300 to-blue-400",
                4: "from-blue-500 to-blue-600",
                5: "from-blue-700 to-blue-800",
              };

              return (
                <button
                  key={num}
                  onClick={() => registrarRespuesta(num)}
                  className={`flex items-center justify-center rounded-full text-white font-bold hover:scale-110 transition transform bg-gradient-to-br ${corGradiente[num]}`}
                  style={{
                    width: `${30 + num * 5}px`,
                    height: `${30 + num * 5}px`,
                    fontSize: `${12 + num}px`
                  }}
                >
                  {num}
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-sm">Pregunta {indiceActual + 1} de {preguntas.length}</p>
        </>
      ) : (
        <>
          
          <h2 className="text-xl font-semibold mb-4 text-center">Resultado: {resultado}</h2>
          <img
            src={
              resultado === "VERDE"
                ? "/images/semaforo-verde.png"
                : resultado === "AMARILLO"
                ? "/images/semaforo-amarelo.png"
                : "/images/semaforo-vermelho.png"
            }
            alt={`Semáforo: ${resultado}`}
            className="w-40 h-auto mx-auto mb-4"
          />
          {resultado === "VERDE" && (
            <p className="text-center">Manejas muy bien este tema y tienes una buena estabilidad emocional. Podrás ayudar significativamente a otras personas que necesitan apoyo.</p>
          )}
          {resultado === "AMARILLO" && (
            <p className="text-center">Hay signos evidentes de dificultades emocionales que necesitan atención y que, con determinación y ayuda, podrán superarse.</p>
          )}
          {resultado === "ROJO" && (
            <p className="text-center">Tus dificultades emocionales relacionadas con este tema requieren ayuda profesional inmediata. Busca rápidamente la ayuda de un médico o psicólogo.</p>
          )}
          <button
            className="mt-6 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700 block mx-auto"
            onClick={reiniciarTest}
          >
            Rehacer el test
          </button>
    
        </>
      )}
    </div>
  );
}
